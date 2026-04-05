<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\NfcUser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = request()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $bookings = Booking::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nfc_card_number' => 'nullable|string|max:255',
            'customer_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'nullable|email',
            'station' => 'required|string|max:255',
            'booking_date' => 'required|date',
            'start_time' => 'required|string|max:10',
            'duration' => 'required|string|max:20',
            'amount' => 'required|numeric|min:0',
            'vr_play' => 'nullable|in:yes,no',
            'number_of_players' => 'nullable|integer|min:1',
            'order_id' => 'nullable|string',
            'is_paid' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $bookingData = $validator->validated();
            $bookingData['user_id'] = $request->user()->id;

            $cardNo = null;

            // ✅ Check NFC user by email
            if ($request->has('email') && $request->email) {
                $cardNo = NfcUser::where('email', $request->email)
                    ->value('card_no');

                if ($cardNo) {
                    $bookingData['nfc_card_number'] = $cardNo;
                }
            }

            $bookingData['is_paid'] = $bookingData['is_paid'] ?? 0;

            // ✅ Create booking
            $booking = Booking::create($bookingData);

            // ✅ AFTER BOOKING → Update NFC Points
            if ($cardNo) {
                $this->updateNfcPointsAndGifts($cardNo, $bookingData['station']);
            }

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function updateNfcPointsAndGifts($cardNumber, $station)
    {
        $nfcUser = NfcUser::where('card_no', $cardNumber)->first();
        if (!$nfcUser) return;

        $points = $nfcUser->points ?? [];
        $gift = $nfcUser->gift ?? [];

        if (!is_array($points)) $points = [];
        if (!is_array($gift)) $gift = [];

        if (!$station) return;

        // ✅ FIX (important)
        $station = trim($station);

        $points[$station] = ($points[$station] ?? 0) + 1;

        $rewardRules = [
            'PlayStation' => [
                'stations' => ['PS5 Station 1', 'PS5 Station 2', 'PS5 Station 3', 'PS5 Station 4', 'PS5 Station 5'],
                'rewards' => [
                    '1 hour free PlayStation (VR not included)',
                    '1 hour free Racing Simulator (VR not included)'
                ]
            ],
            'Racing Simulator' => [
                'stations' => ['Racing Simulator 1', 'Racing Simulator 2', 'Racing Simulator 3', 'Racing Simulator 4'],
                'rewards' => [
                    '1 hour free Racing Simulator (VR not included)',
                    '1 hour free PlayStation (VR not included)'
                ]
            ],
            'Supreme Billiard' => [
                'stations' => ['Supreme Billiard 1', 'Supreme Billiard 2'],
                'rewards' => [
                    '1 hour free Billiards (Supreme zones) (Free coffee/drinks not included)',
                    '1 hour free PlayStation (VR not included)',
                    '1 hour free Racing Simulator (VR not included)'
                ]
            ],
            'Premium Billiard' => [
                'stations' => ['Premium Billiard 1', 'Premium Billiard 2', 'Premium Billiard 3'],
                'rewards' => [
                    '1 hour free Billiards (Premium zones)',
                    '1 hour free PlayStation (VR not included)',
                    '30 min free Racing Simulator (VR not included)'
                ]
            ]
        ];

        foreach ($rewardRules as $type => $rule) {
            $totalPoints = 0;

            foreach ($rule['stations'] as $s) {
                $totalPoints += $points[$s] ?? 0;
            }

            if ($totalPoints >= 10) {

                $key = "$type Reward";

                if (!isset($gift[$key])) {
                    $gift[$key] = [
                        'count' => 0,
                        'rewards' => $rule['rewards']
                    ];
                }

                $gift[$key]['count'] += 1;

                foreach ($rule['stations'] as $s) {
                    $points[$s] = 0;
                }
            }
        }

        // ✅ SAVE (NO json_encode)
        $nfcUser->points = $points;
        $nfcUser->gift = $gift;
        $nfcUser->save();

        Log::info("NFC UPDATED", [
            'card' => $cardNumber,
            'points' => $points,
            'gift' => $gift
        ]);
    }
    public function getBookingCounts(Request $request)
    {
        try {
            $station = $request->query('station');
            $booking_date = $request->query('booking_date');

            if (!$station || !$booking_date) {
                return response()->json([
                    'success' => false,
                    'message' => 'Station and booking_date are required'
                ], 400);
            }

            $bookings = Booking::where('station', $station)
                ->where('booking_date', $booking_date)
                ->get([
                    'start_time',
                    'duration',
                    'extended_time',
                    'customer_name'
                ]);

            return response()->json([
                'success' => true,
                'data' => $bookings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function generatePayHereHash(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string|in:LKR,USD',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $merchant_id = env('PAYHERE_MERCHANT_ID');
        $merchant_secret = env('PAYHERE_SECRET');

        $hash = strtoupper(md5(
            $merchant_id .
                $data['order_id'] .
                number_format($data['amount'], 2, '.', '') .
                $data['currency'] .
                strtoupper(md5($merchant_secret))
        ));

        return response()->json([
            'success' => true,
            'hash' => $hash,
            'merchant_id' => $merchant_id
        ]);
    }
    public function payhereNotify(Request $request)
    {
        $merchant_secret = env('PAYHERE_SECRET');

        $local_md5sig = strtoupper(md5(
            $request->merchant_id .
                $request->order_id .
                $request->payhere_amount .
                $request->payhere_currency .
                $request->status_code .
                strtoupper(md5($merchant_secret))
        ));

        if ($local_md5sig === $request->md5sig && $request->status_code == 2) {
            $updated = Booking::where('order_id', $request->order_id)
                ->update(['is_paid' => 1]);

            Log::info("PayHere payment successful for order: " . $request->order_id . ". Updated {$updated} booking(s).");

            return response('OK', 200);
        }

        Log::warning("PayHere payment failed or invalid MD5 for order: " . $request->order_id);
        return response('INVALID', 400);
    }
}
