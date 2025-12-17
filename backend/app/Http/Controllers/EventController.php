<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index()
    {
        try {
            $events = DB::table('events')
                ->select('id', 'name', 'date', 'thumbnail')
                ->orderBy('date', 'asc')
                ->get();

            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch events',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}