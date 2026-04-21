@extends('layouts.app')

@section('title', 'Sign Up')

@section('content')
    <div class=\"card\" style=\"max-width: 500px; margin: 50px auto;\">
        <h2>Create Account</h2>
        <form action=\"{{ route('signup') }}\" method=\"POST\">
            @csrf
            <div style=\"margin-bottom: 15px;\">
                <label for=\"name\">Full Name:</label>
                <input type=\"text\" id=\"name\" name=\"name\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('name') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>
            <div style=\"margin-bottom: 15px;\">
                <label for=\"email\">Email:</label>
                <input type=\"email\" id=\"email\" name=\"email\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('email') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>
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
            <div style=\"margin-bottom: 15px;\">
                <label for=\"role\">Role:</label>
                <select id=\"role\" name=\"role\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                    <option value=\"customer\">Customer</option>
                    <option value=\"admin\">Admin</option>
                    <option value=\"rider\">Rider</option>
                </select>
            </div>
            <button type=\"submit\" class=\"btn\" style=\"width: 100%;\">Create Account</button>
        </form>
        <p style=\"text-align: center; margin-top: 15px;\">Already have an account? <a href=\"{{ route('signin') }}\">Sign In</a></p>
    </div>
@endsection
