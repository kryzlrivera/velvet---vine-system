<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected \ = ['order_id', 'product_id', 'quantity', 'note', 'wrap'];

    public function order()
    {
        return \->belongsTo(Order::class);
    }

    public function product()
    {
        return \->belongsTo(Product::class);
    }
}
