<?php

// app/Models/HealthComment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthComment extends Model
{
    use HasFactory;

    protected $fillable = ['health_id', 'comments'];

    public function health()
    {
        return $this->belongsTo(Health::class);
    }
}
