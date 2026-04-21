<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint \) {
            \->id();
            \->string('name');
            \->text('description');
            \->integer('price');
            \->integer('stock');
            \->string('image');
            \->json('categories');
            \->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
