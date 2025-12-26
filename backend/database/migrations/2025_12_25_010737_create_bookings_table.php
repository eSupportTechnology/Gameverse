<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
      Schema::create('bookings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('game_type');
        $table->date('booking_date');
        $table->string('time_slot');
        $table->timestamps();
      });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
