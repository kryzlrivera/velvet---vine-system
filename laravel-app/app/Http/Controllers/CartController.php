<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        \ = session('cart', []);
        \ = Product::findMany(array_column(\, 'product_id'));
        return view('cart.index', compact('cart', 'products'));
    }

    public function add(Request \, \)
    {
        \ = \->input('quantity', 1);
        \ = \->input('note', '');
        \ = \->input('wrap', '');

        \ = session('cart', []);
        \ = false;

        foreach (\ as &\) {
            if (\['product_id'] == \) {
                \['quantity'] += \;
                \ = true;
                break;
            }
        }

        if (!found) {
            \[] = [
                'product_id' => \,
                'quantity' => \,
                'note' => \,
                'wrap' => \,
            ];
        }

        session(['cart' => \]);
        return redirect()->back()->with('success', 'Added to cart!');
    }

    public function update(Request \, \)
    {
        \ = \->input('quantity', 1);
        \ = session('cart', []);

        foreach (\ as &\) {
            if (\['product_id'] == \) {
                \['quantity'] = \;
                break;
            }
        }

        session(['cart' => \]);
        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function remove(\)
    {
        \ = session('cart', []);
        \ = array_filter(\, fn(\) => \['product_id'] != \);
        session(['cart' => array_values(\)]);
        return redirect()->back()->with('success', 'Removed from cart!');
    }
}
