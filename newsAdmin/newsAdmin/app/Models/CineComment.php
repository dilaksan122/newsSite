<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CineComment extends Model
{
    use HasFactory;
    protected $fillable = ['news_id', 'comment'];
    protected $table = 'cinecomments';


    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
