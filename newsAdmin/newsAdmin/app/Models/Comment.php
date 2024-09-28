<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['review_id', 'comments'];

    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
