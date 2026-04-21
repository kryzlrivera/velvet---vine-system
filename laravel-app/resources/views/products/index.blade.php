@extends('layouts.app')

@section('title', 'Products')

@section('content')
    <h1>Our Flowers</h1>
    
    <div style=\"display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;\">
        @forelse(\ as \)
            <div class=\"card\">
                <img src=\"{{ \->image }}\" alt=\"{{ \->name }}\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;\">
                <h3>{{ \->name }}</h3>
                <p>{{ Str::limit(\->description, 100) }}</p>
                <p style=\"font-size: 1.3em; font-weight: bold; color: #667eea;\">₱{{ \->price }}</p>
                <p style=\"color: #666; font-size: 0.9em;\">Stock: {{ \->stock }}</p>
                <form action=\"{{ route('cart.add', \->id) }}\" method=\"POST\" style=\"margin-top: 10px;\">
                    @csrf
                    <input type=\"number\" name=\"quantity\" value=\"1\" min=\"1\" style=\"border: 1px solid #ddd; padding: 5px; width: 100%; margin: 5px 0;\">
                    <button type=\"submit\" class=\"btn\" style=\"width: 100%;\">Add to Cart</button>
                </form>
                <a href=\"{{ route('products.show', \->id) }}\" class=\"btn\" style=\"width: 100%; text-align: center; display: block; margin-top: 5px;\">View Details</a>
            </div>
        @empty
            <p>No products available</p>
        @endforelse
    </div>
@endsection
