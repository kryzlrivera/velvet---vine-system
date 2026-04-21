<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint \) {
            \->id();
            \->foreignId('user_id')->constrained()->onDelete('cascade');
            \->integer('total');
            \->enum('status', ['In Arrangement', 'Out for Delivery', 'Delivered', 'Canceled', 'Returned'])->default('In Arrangement');
            \->string('delivery_address');
            \->float('delivery_lat')->nullable();
            \->float('delivery_lng')->nullable();
            \->string('contact_phone');
            \->enum('delivery_option', ['Standard', 'Express', 'Same-day'])->default('Standard');
            \->enum('payment_method', ['GCash', 'Cash on Delivery'])->default('Cash on Delivery');
            \->string('maps_url')->nullable();
            \->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
