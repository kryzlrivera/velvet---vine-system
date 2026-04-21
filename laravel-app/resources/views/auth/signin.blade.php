@extends('layouts.app')

@section('title', 'Sign In')

@section('content')
    <div class=\"card\" style=\"max-width: 400px; margin: 50px auto;\">
        <h2>Sign In</h2>
        <form action=\"{{ route('signin') }}\" method=\"POST\">
            @csrf
            <div style=\"margin-bottom: 15px;\">
                <label for=\"username\">Username:</label>
                <input type=\"text\" id=\"username\" name=\"username\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('username') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>
            <div style=\"margin-bottom: 15px;\">
                <label for=\"password\">Password:</label>
                <input type=\"password\" id=\"password\" name=\"password\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('password') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>
            <button type=\"submit\" class=\"btn\" style=\"width: 100%;\">Sign In</button>
        </form>
        <p style=\"text-align: center; margin-top: 15px;\">Don't have an account? <a href=\"{{ route('signup') }}\">Sign Up</a></p>
    </div>
@endsection
