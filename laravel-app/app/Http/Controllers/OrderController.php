<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        \ = Order::where('user_id', Auth::id())->get();
        return view('orders.index', compact('orders'));
    }

    public function show(\)
    {
        \ = Order::findOrFail(\);
        \->authorize('view', \);
        return view('orders.show', compact('order'));
    }

    public function store(Request \)
    {
        \ = \->validate([
            'delivery_address' => 'required|string',
            'contact_phone' => 'required|string',
            'delivery_option' => 'required|in:Standard,Express,Same-day',
            'payment_method' => 'required|in:GCash,Cash on Delivery',
            'delivery_lat' => 'nullable|numeric',
            'delivery_lng' => 'nullable|numeric',
            'maps_url' => 'nullable|string',
        ]);

        \ = Order::create([
            'user_id' => Auth::id(),
            'total' => session('cart_total', 0),
            'status' => 'In Arrangement',
            ...\,
        ]);

        \ = session('cart', []);
        foreach (\ as \) {
            OrderItem::create([
                'order_id' => \->id,
                'product_id' => \['product_id'],
                'quantity' => \['quantity'],
                'note' => \['note'] ?? null,
                'wrap' => \['wrap'] ?? null,
            ]);
        }

        session()->forget('cart');
        return redirect()->route('orders.show', \)->with('success', 'Order placed!');
    }

    public function updateStatus(Request \, \)
    {
        \ = Order::findOrFail(\);
        \->authorize('update', \);

        \ = ['In Arrangement', 'Out for Delivery', 'Delivered', 'Canceled', 'Returned'];
        \ = array_search(\->status, \);
        
        if (\ !== false && \ < count(\) - 1) {
            \->update(['status' => \[\ + 1]]);
        }

        return back()->with('success', 'Order status updated!');
    }
}
