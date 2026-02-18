<?php

namespace App\Http\Controllers;

use App\Models\Booking;
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

            // Attach logged-in user ID
            $bookingData['user_id'] = $request->user()->id;

            $bookingData['is_paid'] = $bookingData['is_paid'] ?? 0;

            $booking = Booking::create($bookingData);

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
