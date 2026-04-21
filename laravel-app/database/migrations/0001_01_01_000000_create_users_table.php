<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint \) {
            \->id();
            \->string('name');
            \->string('email')->unique();
            \->string('username')->unique();
            \->timestamp('email_verified_at')->nullable();
            \->string('password');
            \->string('phone')->nullable();
            \->string('address')->nullable();
            \->enum('role', ['customer', 'admin', 'rider'])->default('customer');
            \->rememberToken();
            \->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
