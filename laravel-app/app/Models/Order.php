<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected \ = [
        'user_id',
        'total',
        'status',
        'delivery_address',
        'delivery_lat',
        'delivery_lng',
        'contact_phone',
        'delivery_option',
        'payment_method',
        'maps_url',
    ];

    protected \ = [
        'delivery_lat' => 'float',
        'delivery_lng' => 'float',
    ];

    public function user()
    {
        return \->belongsTo(User::class);
    }

    public function items()
    {
        return \->hasMany(OrderItem::class);
    }
}
