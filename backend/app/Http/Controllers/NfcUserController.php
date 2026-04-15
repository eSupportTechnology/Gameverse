<?php

namespace App\Http\Controllers;

use App\Models\NfcUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NfcUserController extends Controller
{

    public function getByEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $nfcUser = NfcUser::where('email', $request->email)->first();

        if (!$nfcUser) {
            return response()->json(['success' => false, 'message' => 'User not found']);
        }

        // Use admin base URL from config
        $adminBaseUrl = rtrim(config('app.admin_base_url'), '/');

        return response()->json([
            'success' => true,
            'data' => [
                'nicNumber' => $nfcUser->nic_number,
                'profileImage' => $nfcUser->avatar
                    ? $adminBaseUrl . '/storage/' . ltrim($nfcUser->avatar, '/')
                    : null,
                'gift' => $nfcUser->gift ?? [],
                'used_rewards' => $nfcUser->used_rewards ?? [],
                'points' => $nfcUser->points ?? [],
            ],
        ]);
    }
}
