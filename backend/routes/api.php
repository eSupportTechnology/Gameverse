<?php

use App\Http\Controllers\Api\StationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\NfcUserController;
use App\Http\Controllers\ProfileController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Password Reset
Route::post('/send-verification-code', [PasswordResetController::class, 'sendCode']);
Route::post('/verify-code', [PasswordResetController::class, 'verifyCode']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

// Contact Form
Route::post('/contact', [ContactController::class, 'store']);

// Events
Route::get('/events', [EventController::class, 'index']);

//Gallery
Route::get('/galleries', [GalleryController::class, 'index']);

// profile
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [ProfileController::class, 'me']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/change-password', [ProfileController::class, 'changePassword']);
});

Route::get('/stations', [StationController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
});
Route::get('/bookings-count', [BookingController::class, 'getBookingCounts']);
Route::get('/nfc-user-by-email', [NfcUserController::class, 'getByEmail']);
