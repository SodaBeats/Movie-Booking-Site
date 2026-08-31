<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::table('bookings', function (Blueprint $table) {
          $table->foreignId('showtime_id')->after('movie_id')->constrained()->cascadeOnDelete();
          $table->dropColumn(['booking_date', 'showtime']);
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
