<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileController extends Controller
{
    // Get logged-in user
    public function me()
    {
        return response()->json(Auth::user());
    }

    // Update profile info
    public function update(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'firstName' => 'required|string',
            'lastName'  => 'required|string',
            'phone'     => 'nullable|string',
            'dob'       => 'nullable|date',
        ]);

        $user->update([
            'firstName' => $request->firstName,
            'lastName'  => $request->lastName,
            'phone'     => $request->phone,
            'dob'       => $request->dob,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
        ]);
    }

    // Change password
    public function changePassword(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:6|confirmed',
        ]);

        // Check current password
        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 400);
        }

        // Update password
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }
}
