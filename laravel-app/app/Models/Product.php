<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected \ = ['name', 'description', 'price', 'stock', 'image', 'categories'];

    protected \ = [
        'categories' => 'json',
    ];

    public function orderItems()
    {
        return \->hasMany(OrderItem::class);
    }
}
