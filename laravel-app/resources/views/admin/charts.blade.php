@extends('layouts.app')

@section('title', 'Analytics')

@section('head')
    <script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script>
@endsection

@section('content')
    <h1>Sales Analytics</h1>
    
    <div class=\"card\" style=\"margin-top: 30px;\">
        <h3>Orders Over Time</h3>
        <canvas id=\"ordersChart\"></canvas>
    </div>

    <script>
        const ctx = document.getElementById('ordersChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: {{ json_encode(\['labels'] ?? []) }},
                datasets: [{
                    label: 'Order Value (₱)',
                    data: {{ json_encode(\['data'] ?? []) }},
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true }
                }
            }
        });
    </script>
@endsection
