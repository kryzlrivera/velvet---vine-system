@extends('layouts.app')

@section('title', \->name)

@section('content')
    <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;\">
        <div>
            <img src=\"{{ \->image }}\" alt=\"{{ \->name }}\" style=\"width: 100%; height: auto; border-radius: 8px;\">
        </div>
        <div>
            <h1>{{ \->name }}</h1>
            <p style=\"font-size: 1.5em; font-weight: bold; color: #667eea; margin: 20px 0;\">₱{{ \->price }}</p>
            
            <div class=\"card\">
                <p><strong>Description:</strong></p>
                <p>{{ \->description }}</p>
                
                <p style=\"margin-top: 15px;\"><strong>Stock Available:</strong> 
                    <span style=\"background: {{ \->stock > 0 ? '#d4edda' : '#f8d7da' }}; padding: 3px 8px; border-radius: 3px;\">
                        {{ \->stock > 0 ? \->stock .' in stock' : 'Out of Stock' }}
                    </span>
                </p>

                @if(\->stock > 0)
                <form action=\"{{ route('cart.add', \->id) }}\" method=\"POST\" style=\"margin-top: 20px;\">
                    @csrf
                    <div style=\"margin-bottom: 15px;\">
                        <label for=\"quantity\">Quantity:</label>
                        <input type=\"number\" id=\"quantity\" name=\"quantity\" value=\"1\" min=\"1\" max=\"{{ \->stock }}\" style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                    </div>
                    <div style=\"margin-bottom: 15px;\">
                        <label for=\"note\">Special Note (Optional):</label>
                        <textarea id=\"note\" name=\"note\" placeholder=\"e.g., Happy Birthday!\" style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; height: 80px;\"></textarea>
                    </div>
                    <div style=\"margin-bottom: 15px;\">
                        <label for=\"wrap\">Wrapping Option (Optional):</label>
                        <input type=\"text\" id=\"wrap\" name=\"wrap\" placeholder=\"e.g., Silk Ribbon\" style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                    </div>
                    <button type=\"submit\" class=\"btn\" style=\"width: 100%; font-size: 1.1em; padding: 12px;\">Add to Cart</button>
                </form>
                @else
                    <p style=\"color: #dc3545; font-weight: bold; margin-top: 20px;\">This product is currently out of stock.</p>
                @endif
            </div>

            <a href=\"{{ route('products.index') }}\" class=\"btn\" style=\"margin-top: 10px; display: block; text-align: center;\">← Back to Products</a>
        </div>
    </div>
@endsection
