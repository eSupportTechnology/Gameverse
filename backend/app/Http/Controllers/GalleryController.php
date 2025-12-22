<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleryController extends Controller
{
    public function index()
    {
        try {
            $adminBaseUrl = rtrim(config('app.admin_base_url'), '/');

            $galleries = DB::table('galleries')
                ->select('id', 'image')
                ->orderBy('id', 'desc')
                ->get()
                ->map(function ($gallery) use ($adminBaseUrl) {
                    if ($gallery->image) {
                        $gallery->image = $adminBaseUrl . '/storage/' . $gallery->image;
                    }
                    return $gallery;
                });

            return response()->json($galleries);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch gallery images',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
