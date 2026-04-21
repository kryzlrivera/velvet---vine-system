@extends('layouts.app')

@section('title', 'Inventory Management')

@section('content')
    <h1>Inventory Management</h1>
    
    <div style=\"text-align: right; margin: 20px 0;\">
        <a href=\"#\" class=\"btn\" onclick=\"document.getElementById('add-product-form').style.display='block'; return false;\">+ Add Product</a>
    </div>

    <div id=\"add-product-form\" style=\"display: none; margin: 20px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;\">
        <h3>Add New Product</h3>
        <form action=\"{{ route('admin.products.store') }}\" method=\"POST\">
            @csrf
            <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;\">
                <div>
                    <label>Product Name:</label>
                    <input type=\"text\" name=\"name\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                </div>
                <div>
                    <label>Price:</label>
                    <input type=\"number\" name=\"price\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                </div>
            </div>
            <div style=\"margin-bottom: 15px;\">
                <label>Description:</label>
                <textarea name=\"description\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; height: 100px;\"></textarea>
            </div>
            <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;\">
                <div>
                    <label>Stock:</label>
                    <input type=\"number\" name=\"stock\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type=\"text\" name=\"image\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                </div>
            </div>
            <div style=\"display: flex; gap: 10px; margin-top: 15px;\">
                <button type=\"submit\" class=\"btn\">Save Product</button>
                <button type=\"button\" class=\"btn\" style=\"background: #ccc; color: #333;\" onclick=\"document.getElementById('add-product-form').style.display='none'; return false;\">Cancel</button>
            </div>
        </form>
    </div>

    <table style=\"width: 100%; border-collapse: collapse;\">
        <thead>
            <tr style=\"border-bottom: 2px solid #ddd; background: #f5f5f5;\">
                <th style=\"padding: 10px; text-align: left;\">Product</th>
                <th style=\"padding: 10px; text-align: left;\">Price</th>
                <th style=\"padding: 10px; text-align: left;\">Stock</th>
                <th style=\"padding: 10px; text-align: left;\">Description</th>
                <th style=\"padding: 10px;\">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse(\ as \)
            <tr style=\"border-bottom: 1px solid #eee;\">
                <td style=\"padding: 10px;\">{{ \->name }}</td>
                <td style=\"padding: 10px;\">₱{{ \->price }}</td>
                <td style=\"padding: 10px;\">
                    <span style=\"background: {{ \->stock > 5 ? '#d4edda' : '#f8d7da' }}; padding: 5px 8px; border-radius: 3px;\">{{ \->stock }}</span>
                </td>
                <td style=\"padding: 10px;\">{{ Str::limit(\->description, 50) }}</td>
                <td style=\"padding: 10px; text-align: center;\">
                    <form action=\"{{ route('admin.products.destroy', \->id) }}\" method=\"POST\" style=\"display: inline;\">
                        @csrf
                        @method('DELETE')
                        <button type=\"submit\" style=\"background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;\" onclick=\"return confirm('Are you sure?');\">Delete</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan=\"5\" style=\"padding: 20px; text-align: center;\">No products found</td>
            </tr>
            @endforelse
        </tbody>
    </table>
@endsection
