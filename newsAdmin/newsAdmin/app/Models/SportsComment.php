<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SportsComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'sports_id', 'comments',
    ];

    public function sports()
    {
        return $this->belongsTo(Sports::class);
    }
}
