<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'content', 'author', 'image', 'popularity', 'trending','category','slug'
    ];

    public function CommentTech()
    {
        return $this->hasMany(CommentTech::class);
    }
}
