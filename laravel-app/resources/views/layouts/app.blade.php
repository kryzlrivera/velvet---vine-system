<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Velvet Vine - @yield('title')</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; }
        header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; }
        nav { display: flex; gap: 20px; justify-content: space-between; align-items: center; }
        nav a { color: white; text-decoration: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px; margin: 10px 0; }
        button, a.btn { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        button:hover, a.btn:hover { background: #764ba2; }
        .alert { padding: 15px; margin: 10px 0; border-radius: 4px; }
        .alert-success { background: #d4edda; color: #155724; }
        .alert-error { background: #f8d7da; color: #721c24; }
        @yield('styles')
    </style>
    @yield('head')
</head>
<body>
    <header>
        <nav>
            <a href=\"{{ route('home') }}\"><strong>🌸 Velvet Vine</strong></a>
            <div style=\"display: flex; gap: 20px; align-items: center;\">
                <a href=\"{{ route('products.index') }}\">Products</a>
                <a href=\"{{ route('cart.index') }}\">Cart</a>
                @if(Auth::user())
                    <a href=\"{{ route('orders.index') }}\">Orders</a>
                    @if(Auth::user()->role === 'admin')
                        <a href=\"{{ route('admin.dashboard') }}\">Admin</a>
                    @endif
                    <a href=\"{{ route('profile.show') }}\">{{ Auth::user()->name }}</a>
                    <form action=\"{{ route('signout') }}\" method=\"POST\" style=\"display: inline;\">
                        @csrf
                        <button type=\"submit\" style=\"background: transparent; color: white; border: none; cursor: pointer; padding: 0;\">Sign Out</button>
                    </form>
                @else
                    <a href=\"{{ route('signin') }}\">Sign In</a>
                    <a href=\"{{ route('signup') }}\">Sign Up</a>
                @endif
            </div>
        </nav>
    </header>

    <div class=\"container\">
        @if (\ = Session::get('success'))
            <div class=\"alert alert-success\">{{ \ }}</div>
        @endif

        @if (\->any())
            <div class=\"alert alert-error\">
                <ul>
                    @foreach (\->all() as \A positional parameter cannot be found that accepts argument 'app\Http\Controllers\Cart'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'.)
                        <li>{{ \A positional parameter cannot be found that accepts argument 'app\Http\Controllers\Cart'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'. A parameter cannot be found that matches parameter name 'Chord'. }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </div>

    <footer style=\"background: #333; color: white; text-align: center; padding: 20px; margin-top: 40px;\">
        <p>&copy; 2024 Velvet Vine Flower Shop. All rights reserved.</p>
    </footer>
</body>
</html>
