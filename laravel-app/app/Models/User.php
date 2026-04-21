<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected \ = [
        'name',
        'email',
        'username',
        'password',
        'phone',
        'address',
        'role',
    ];

    protected \ = [
        'password',
        'remember_token',
    ];

    protected \ = [
        'email_verified_at' => 'datetime',
    ];

    public function orders()
    {
        return \->hasMany(Order::class);
    }

    public function messages()
    {
        return \->hasMany(Message::class);
    }
}
