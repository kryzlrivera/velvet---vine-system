<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected \ = ['user_id', 'from_role', 'text'];

    public function user()
    {
        return \->belongsTo(User::class);
    }
}
