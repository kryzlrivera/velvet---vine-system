@extends('layouts.app')

@section('title', 'Home')

@section('styles')
    <style>
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .hero h1 { font-size: 3em; margin: 10px 0; }
        .hero p { font-size: 1.2em; }
        .cta-buttons { display: flex; gap: 20px; justify-content: center; margin: 30px 0; }
    </style>
@endsection

@section('content')
    <div class=\"hero\">
        <h1>Welcome to Velvet Vine</h1>
        <p>Discover the Beauty of Fresh Flowers</p>
        <div class=\"cta-buttons\">
            <a href=\"{{ route('products.index') }}\" class=\"btn\">Browse Products</a>
            @if(!Auth::user())
                <a href=\"{{ route('signup') }}\" class=\"btn\">Get Started</a>
            @endif
        </div>
    </div>

    <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;\">
        <div class=\"card\" style=\"text-align: center;\">
            <h3>🌹 Premium Quality</h3>
            <p>Handpicked flowers arranged to perfection</p>
        </div>
        <div class=\"card\" style=\"text-align: center;\">
            <h3>🚚 Quick Delivery</h3>
            <p>Same-day delivery available in your area</p>
        </div>
        <div class=\"card\" style=\"text-align: center;\">
            <h3>💝 Special Messages</h3>
            <p>Add personalized notes to your orders</p>
        </div>
    </div>
@endsection
