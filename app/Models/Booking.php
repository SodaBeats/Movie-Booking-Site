<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
  protected $fillable = [
      'user_id',
      'movie_id',
      'showtime_id',
      'seat_count',
  ];

  public function user()
  {
      return $this->belongsTo(User::class);
  }

  public function movie()
  {
      return $this->belongsTo(Movie::class);
  }
  public function showtime()
  {
      return $this->belongsTo(Showtime::class);
  }
}
