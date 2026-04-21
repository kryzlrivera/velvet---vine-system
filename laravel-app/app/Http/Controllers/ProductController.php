<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        \ = Product::all();
        return view('products.index', compact('products'));
    }

    public function show(\)
    {
        \ = Product::findOrFail(\);
        return view('products.show', compact('product'));
    }

    public function store(Request \)
    {
        \ = \->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'required|string',
            'categories' => 'required|array',
        ]);

        Product::create(\);
        return redirect()->route('products.index')->with('success', 'Product created!');
    }

    public function update(Request \, \)
    {
        \ = Product::findOrFail(\);
        
        \ = \->validate([
            'name' => 'string',
            'description' => 'string',
            'price' => 'integer',
            'stock' => 'integer',
            'image' => 'string',
            'categories' => 'array',
        ]);

        \->update(\);
        return redirect()->route('products.index')->with('success', 'Product updated!');
    }

    public function destroy(\)
    {
        Product::findOrFail(\)->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted!');
    }
}
