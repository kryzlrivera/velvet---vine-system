@extends('layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
    <h1>Admin Dashboard</h1>
    
    <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;\">
        <div class=\"card\" style=\"text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;\">
            <h3>Products</h3>
            <p style=\"font-size: 2.5em; font-weight: bold;\">{{ \ }}</p>
            <a href=\"{{ route('admin.inventory') }}\" style=\"color: white; text-decoration: underline;\">Manage</a>
        </div>
        <div class=\"card\" style=\"text-align: center; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;\">
            <h3>Orders</h3>
            <p style=\"font-size: 2.5em; font-weight: bold;\">{{ \ }}</p>
            <a href=\"{{ route('admin.orders') }}\" style=\"color: white; text-decoration: underline;\">View All</a>
        </div>
        <div class=\"card\" style=\"text-align: center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white;\">
            <h3>Users</h3>
            <p style=\"font-size: 2.5em; font-weight: bold;\">{{ \ }}</p>
        </div>
        <div class=\"card\" style=\"text-align: center; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white;\">
            <h3>Revenue</h3>
            <p style=\"font-size: 2.5em; font-weight: bold;\">₱{{ \ }}</p>
        </div>
    </div>

    <div class=\"card\">
        <h2>Quick Actions</h2>
        <div style=\"display: flex; gap: 10px; flex-wrap: wrap;\">
            <a href=\"{{ route('admin.inventory') }}\" class=\"btn\">Manage Inventory</a>
            <a href=\"{{ route('admin.orders') }}\" class=\"btn\">View Orders</a>
            <a href=\"{{ route('admin.charts') }}\" class=\"btn\">View Analytics</a>
        </div>
    </div>
@endsection
