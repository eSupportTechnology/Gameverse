<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Station;

class StationController extends Controller
{
    public function index()
    {
        try {
            $stations = Station::orderBy('id', 'asc')->get();

            return response()->json([
                'status' => 'success',
                'data' => $stations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch stations',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
