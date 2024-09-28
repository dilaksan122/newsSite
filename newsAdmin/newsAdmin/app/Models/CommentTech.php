<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentTech extends Model
{
    use HasFactory;

    protected $fillable = [
        'technology_id','comment',
    ];

    public function technology()
    {
        return $this->belongsTo(Technology::class);
    }
}
