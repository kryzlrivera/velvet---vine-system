@extends('layouts.app')

@section('title', 'Order #' . \->id)

@section('content')
    <h1>Order #{{ \->id }}</h1>
    
    <div style=\"display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin: 30px 0;\">
        <div>
            <div class=\"card\">
                <h3>Order Details</h3>
                <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;\">
                    <div>
                        <label style=\"font-weight: bold; color: #667eea;\">Order Date</label>
                        <p>{{ \->created_at->format('M d, Y H:i') }}</p>
                    </div>
                    <div>
                        <label style=\"font-weight: bold; color: #667eea;\">Status</label>
                        <p>
                            <span style=\"background: #667eea; color: white; padding: 5px 10px; border-radius: 4px;\">{{ \->status }}</span>
                        </p>
                    </div>
                    <div>
                        <label style=\"font-weight: bold; color: #667eea;\">Delivery Option</label>
                        <p>{{ \->delivery_option }}</p>
                    </div>
                    <div>
                        <label style=\"font-weight: bold; color: #667eea;\">Payment Method</label>
                        <p>{{ \->payment_method }}</p>
                    </div>
                </div>
            </div>

            <div class=\"card\">
                <h3>Delivery Information</h3>
                <div style=\"margin: 20px 0;\">
                    <label style=\"font-weight: bold; color: #667eea;\">Address</label>
                    <p>{{ \->delivery_address }}</p>
                </div>
                <div style=\"margin: 20px 0;\">
                    <label style=\"font-weight: bold; color: #667eea;\">Contact Phone</label>
                    <p>{{ \->contact_phone }}</p>
                </div>
                @if(\->maps_url)
                <a href=\"{{ \->maps_url }}\" target=\"_blank\" class=\"btn\">View on Maps</a>
                @endif
            </div>

            <div class=\"card\">
                <h3>Items in Order</h3>
                <table style=\"width: 100%; margin-top: 15px;\">
                    <thead>
                        <tr style=\"border-bottom: 2px solid #ddd;\">
                            <th style=\"padding: 10px; text-align: left;\">Product</th>
                            <th style=\"padding: 10px; text-align: left;\">Qty</th>
                            <th style=\"padding: 10px; text-align: left;\">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach(\->items as \)
                        <tr style=\"border-bottom: 1px solid #eee;\">
                            <td style=\"padding: 10px;\">{{ \->product->name }}</td>
                            <td style=\"padding: 10px;\">{{ \->quantity }}</td>
                            <td style=\"padding: 10px;\">₱{{ \->product->price }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <div class=\"card\" style=\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;\">
                <h3>Order Summary</h3>
                <div style=\"margin: 20px 0; font-size: 1.1em;\">
                    <div style=\"display: flex; justify-content: space-between; margin: 10px 0;\">
                        <span>Subtotal:</span>
                        <span>₱{{ \->total }}/strong>
                    </div>
                    <div style=\"border-top: 1px solid rgba(255,255,255,0.3); padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em;\">
                        <span>Total:</span>
                        <span>₱{{ \->total }}</span>
                    </div>
                </div>
            </div>

            <div class=\"card\">
                <h3>Need Help?</h3>
                <p>If you have any questions about your order, please contact us.</p>
                <a href=\"{{ route('home') }}\" class=\"btn\" style=\"display: block; text-align: center; margin-top: 10px;\">← Back to Home</a>
            </div>
        </div>
    </div>
@endsection
