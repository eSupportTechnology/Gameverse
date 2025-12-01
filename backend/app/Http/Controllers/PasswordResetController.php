<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
     public function sendCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'No user found for that email.'], 404);
        }

        // generate 6-digit numeric code
        $code = random_int(100000, 999999);

        // expiry (15 minutes)
        $now = Carbon::now();
        $expiresAt = $now->copy()->addMinutes(15);

        // upsert into password_resets
        DB::table('password_resets')->updateOrInsert(
            ['email' => $email],
            [
                'code' => $code,
                'reset_token' => null,
                'created_at' => $now,
                'expires_at' => $expiresAt,
            ]
        );

        // send email
        Mail::to($email)->send(new VerificationCodeMail($code));

        return response()->json(['message' => 'Verification code sent.'], 200);
    }

    // Verify code and create reset_token
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $row = DB::table('password_resets')->where('email', $request->email)->first();

        if (!$row) {
            return response()->json(['message' => 'No verification request found.'], 404);
        }

        // check expiry
        if (Carbon::now()->gt(Carbon::parse($row->expires_at))) {
            return response()->json(['message' => 'Code expired.'], 410);
        }

        // check code match
        if ($row->code !== $request->code) {
            return response()->json(['message' => 'Invalid code.'], 422);
        }

        // generate a reset_token 
        $resetToken = Str::random(64);

        DB::table('password_resets')->where('email', $request->email)->update([
            'reset_token' => $resetToken,
            'created_at' => Carbon::now(), // refresh creation time
            'expires_at' => Carbon::now()->addMinutes(30), // token expiry 
            'code' => null // clear code so it can't be reused
        ]);

        return response()->json([
            'message' => 'Code verified.',
            'reset_token' => $resetToken
        ], 200);
    }

    // Reset password using reset_token
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed', 
            'reset_token' => 'required|string',
        ]);

        $row = DB::table('password_resets')->where('email', $request->email)->first();

        if (!$row || !$row->reset_token) {
            return response()->json(['message' => 'Invalid or expired token.'], 404);
        }

        // check token and expiry
        if ($row->reset_token !== $request->reset_token) {
            return response()->json(['message' => 'Invalid reset token.'], 422);
        }

        if (Carbon::now()->gt(Carbon::parse($row->expires_at))) {
            return response()->json(['message' => 'Reset token expired.'], 410);
        }

        // update user password
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // delete the password_reset entry
        DB::table('password_resets')->where('email', $request->email)->delete();

        // Optionally create new auth token for user
        $token = $user->createToken('web-token')->plainTextToken;

        return response()->json([
            'message' => 'Password reset successful.',
            'user' => $user,
            'token' => $token
        ], 200);
    }
}
