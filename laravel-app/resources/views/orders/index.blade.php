@extends('layouts.app')

@section('title', 'My Orders')

@section('content')
    <h1>My Orders</h1>
    
    @if(\->isEmpty())
        <p>You haven't placed any orders yet. <a href=\"{{ route('products.index') }}\">Start shopping</a></p>
    @else
        <table style=\"width: 100%; border-collapse: collapse; margin: 20px 0;\">
            <thead>
                <tr style=\"border-bottom: 2px solid #ddd; background: #f5f5f5;\">
                    <th style=\"padding: 10px; text-align: left;\">Order ID</th>
                    <th style=\"padding: 10px; text-align: left;\">Date</th>
                    <th style=\"padding: 10px; text-align: left;\">Total</th>
                    <th style=\"padding: 10px; text-align: left;\">Status</th>
                    <th style=\"padding: 10px; text-align: left;\">Delivery</th>
                    <th style=\"padding: 10px;\">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach(\ as \)
                <tr style=\"border-bottom: 1px solid #eee;\">
                    <td style=\"padding: 10px;\">#{{ \->id }}</td>
                    <td style=\"padding: 10px;\">{{ \->created_at->format('M d, Y') }}</td>
                    <td style=\"padding: 10px;\">₱{{ \->total }}</td>
                    <td style=\"padding: 10px;\">
                        <span style=\"background: #667eea; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.9em;\">{{ \->status }}</span>
                    </td>
                    <td style=\"padding: 10px;\">{{ \->delivery_option }}</td>
                    <td style=\"padding: 10px; text-align: center;\">
                        <a href=\"{{ route('orders.show', \->id) }}\" class=\"btn\" style=\"padding: 5px 10px; font-size: 0.9em;\">View</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @endif
@endsection
