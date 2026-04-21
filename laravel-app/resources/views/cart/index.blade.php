@extends('layouts.app')

@section('title', 'Shopping Cart')

@section('content')
    <h1>Shopping Cart</h1>
    
    @if(empty(\))
        <p>Your cart is empty. <a href=\"{{ route('products.index') }}\">Continue shopping</a></p>
    @else
        <table style=\"width: 100%; border-collapse: collapse; margin: 20px 0;\">
            <thead>
                <tr style=\"border-bottom: 2px solid #ddd;\">
                    <th style=\"padding: 10px; text-align: left;\">Product</th>
                    <th style=\"padding: 10px; text-align: left;\">Price</th>
                    <th style=\"padding: 10px; text-align: left;\">Quantity</th>
                    <th style=\"padding: 10px; text-align: left;\">Subtotal</th>
                    <th style=\"padding: 10px;\">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach(\ as \)
                    @if(\ = \->firstWhere('id', \['product_id']))
                    <tr style=\"border-bottom: 1px solid #eee;\">
                        <td style=\"padding: 10px;\">{{ \->name }}</td>
                        <td style=\"padding: 10px;\">₱{{ \->price }}</td>
                        <td style=\"padding: 10px;\">{{ \['quantity'] }}</td>
                        <td style=\"padding: 10px;\">₱{{ \->price * \['quantity'] }}</td>
                        <td style=\"padding: 10px; text-align: center;\">
                            <form action=\"{{ route('cart.remove', \->id) }}\" method=\"POST\" style=\"display: inline;\">
                                @csrf
                                @method('DELETE')
                                <button type=\"submit\" style=\"background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;\">Remove</button>
                            </form>
                        </td>
                    </tr>
                    @endif
                @endforeach
            </tbody>
        </table>
        <div style=\"text-align: right; margin: 20px 0;\">
            <h3>Total: ₱{{ array_sum(array_map(fn(\) => \->firstWhere('id', \['product_id'])?->price * \['quantity'] ?? 0, \)) }}</h3>
        </div>
        <div style=\"display: flex; gap: 10px; justify-content: flex-end;\">
            <a href=\"{{ route('products.index') }}\" class=\"btn\">Continue Shopping</a>
            <a href=\"{{ route('orders.store') }}\" class=\"btn\" onclick=\"event.preventDefault(); document.getElementById('checkout-form').submit();\">Proceed to Checkout</a>
        </div>
    @endif
@endsection
