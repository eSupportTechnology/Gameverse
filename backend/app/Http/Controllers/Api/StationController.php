<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class StationController extends Controller
{
    /**
     * Return all stations with all columns
     */
    public function index()
    {
        // Fetch all columns
        $stations = DB::table('stations')->get();
        return response()->json([
            'status' => 'success',
            'data' => $stations
        ]);
    }
}
