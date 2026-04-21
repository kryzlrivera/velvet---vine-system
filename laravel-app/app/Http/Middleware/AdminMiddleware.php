<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request \, Closure \)
    {
        if (auth()->check() && auth()->user()->role === 'admin') {
            return \(\);
        }

        return redirect()->route('home')->with('error', 'Unauthorized access');
    }
}
