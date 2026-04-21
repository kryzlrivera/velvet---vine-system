@extends('layouts.app')

@section('title', 'User Profile')

@section('content')
    <h1>My Profile</h1>
    
    <div class=\"card\" style=\"max-width: 600px; margin: 30px 0;\">
        <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;\">
            <div>
                <label style=\"font-weight: bold; color: #667eea;\">Full Name</label>
                <p>{{ Auth::user()->name }}</p>
            </div>
            <div>
                <label style=\"font-weight: bold; color: #667eea;\">Email</label>
                <p>{{ Auth::user()->email }}</p>
            </div>
            <div>
                <label style=\"font-weight: bold; color: #667eea;\">Phone</label>
                <p>{{ Auth::user()->phone ?? 'Not provided' }}</p>
            </div>
            <div>
                <label style=\"font-weight: bold; color: #667eea;\">Role</label>
                <p>
                    <span style=\"background: #667eea; color: white; padding: 3px 8px; border-radius: 3px;\">{{ ucfirst(Auth::user()->role) }}</span>
                </p>
            </div>
        </div>
        <div style=\"margin-bottom: 20px;\">
            <label style=\"font-weight: bold; color: #667eea;\">Address</label>
            <p>{{ Auth::user()->address ?? 'Not provided' }}</p>
        </div>
        <a href=\"{{ route('profile.edit') }}\" class=\"btn\">Edit Profile</a>
    </div>
@endsection
