<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{

    protected $fillable = [
        'user_id',
        'order_id',
        'is_paid',
        'nfc_card_number',
        'customer_name',
        'phone_number',
        'station',
        'booking_date',
        'start_time',
        'duration',
        'extended_time',
        'payment_method',
        'amount',
        'status',
        'end_time',
        'vr_play',
        'number_of_players'
    ];


    protected $casts = [
        'booking_date' => 'date',
        'amount' => 'decimal:2'
    ];

    //     public function station()
    // {
    //     return $this->belongsTo(\App\Models\Station::class);
    // }    public function user()
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
