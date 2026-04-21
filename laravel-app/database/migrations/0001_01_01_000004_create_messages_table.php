<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint \) {
            \->id();
            \->foreignId('user_id')->constrained()->onDelete('cascade');
            \->enum('from_role', ['customer', 'admin']);
            \->text('text');
            \->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
