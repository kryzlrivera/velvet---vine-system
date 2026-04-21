@extends('layouts.app')

@section('title', 'All Orders')

@section('content')
    <h1>All Orders</h1>
    
    <table style=\"width: 100%; border-collapse: collapse; margin-top: 20px;\">
        <thead>
            <tr style=\"border-bottom: 2px solid #ddd; background: #f5f5f5;\">
                <th style=\"padding: 10px; text-align: left;\">Order ID</th>
                <th style=\"padding: 10px; text-align: left;\">Customer</th>
                <th style=\"padding: 10px; text-align: left;\">Total</th>
                <th style=\"padding: 10px; text-align: left;\">Status</th>
                <th style=\"padding: 10px; text-align: left;\">Date</th>
                <th style=\"padding: 10px; text-align: left;\">Phone</th>
            </tr>
        </thead>
        <tbody>
            @forelse(\ as \)
            <tr style=\"border-bottom: 1px solid #eee;\">
                <td style=\"padding: 10px;\">#{{ \->id }}</td>
                <td style=\"padding: 10px;\">{{ \->user->name }}</td>
                <td style=\"padding: 10px;\">₱{{ \->total }}</td>
                <td style=\"padding: 10px;\">
                    <span style=\"background: #667eea; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.9em;\">{{ \->status }}</span>
                </td>
                <td style=\"padding: 10px;\">{{ \->created_at->format('M d, Y') }}</td>
                <td style=\"padding: 10px;\">{{ \->contact_phone }}</td>
            </tr>
            @empty
            <tr>
                <td colspan=\"6\" style=\"padding: 20px; text-align: center;\">No orders found</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div style=\"margin-top: 20px;\">
        {{ \->links() }}
    </div>
@endsection
