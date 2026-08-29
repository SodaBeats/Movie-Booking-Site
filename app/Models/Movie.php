<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
  //
  protected $fillable = [
      'movie_name',
      'director',
      'description',
      'movie_thumbnail',
      'movie_poster',
  ];
}
