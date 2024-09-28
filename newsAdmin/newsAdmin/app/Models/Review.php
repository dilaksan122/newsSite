<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable=[
    "title",
    "content",
    "author",
    "image",
    'popularity',
    'trending',
    'slug',
    'category',
    'now_playing',
    'from_the_blog',
    'review_collections'
    ];
}
