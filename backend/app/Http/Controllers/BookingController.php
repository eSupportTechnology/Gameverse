<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;

class BookingController extends Controller
{
    // Create booking (LOGIN REQUIRED)
    public function store(Request $request)
    {
        $request->validate([
            'game_type' => 'required|string',
            'booking_date' => 'required|date',
            'time_slot' => 'required|string',
        ]);

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'game_type' => $request->game_type,
            'booking_date' => $request->booking_date,
            'time_slot' => $request->time_slot,
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking,
        ], 201);
    }

    // Get logged user's bookings
    public function myBookings()
    {
        return response()->json(
            Booking::where('user_id', Auth::id())->get()
        );
    }
}
