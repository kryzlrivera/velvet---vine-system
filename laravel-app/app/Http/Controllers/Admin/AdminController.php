<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        \ = Product::count();
        \ = Order::count();
        \ = User::count();
        \ = Order::sum('total');

        return view('admin.dashboard', compact('productsCount', 'ordersCount', 'usersCount', 'totalRevenue'));
    }

    public function inventory()
    {
        \ = Product::all();
        return view('admin.inventory', compact('products'));
    }

    public function orders()
    {
        \ = Order::with('user')->paginate(20);
        return view('admin.orders', compact('orders'));
    }

    public function charts()
    {
        \ = Order::all();
        \ = [
            'labels' => \->pluck('created_at')->map(fn(\) => \->format('Y-m-d'))->toArray(),
            'data' => \->pluck('total')->toArray(),
        ];

        return view('admin.charts', compact('chartData'));
    }
}
