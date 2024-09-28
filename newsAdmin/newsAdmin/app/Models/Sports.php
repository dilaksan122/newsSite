<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sports extends Model
{
    use HasFactory;
    protected $fillable=[
        'title',
        'content',
        'author',
        'slug',
        'category',
        'image',
        'popularity',
        'trending',
        'category'
    ];
}
