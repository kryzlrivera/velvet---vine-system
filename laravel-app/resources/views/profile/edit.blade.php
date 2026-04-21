@extends('layouts.app')

@section('title', 'Edit Profile')

@section('content')
    <h1>Edit Profile</h1>
    
    <div class=\"card\" style=\"max-width: 600px; margin: 30px 0;\">
        <form action=\"{{ route('profile.update') }}\" method=\"POST\">
            @csrf
            @method('PUT')
            
            <div style=\"margin-bottom: 15px;\">
                <label for=\"name\">Full Name:</label>
                <input type=\"text\" id=\"name\" name=\"name\" value=\"{{ Auth::user()->name }}\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('name') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>

            <div style=\"margin-bottom: 15px;\">
                <label for=\"email\">Email:</label>
                <input type=\"email\" id=\"email\" name=\"email\" value=\"{{ Auth::user()->email }}\" required style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('email') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>

            <div style=\"margin-bottom: 15px;\">
                <label for=\"phone\">Phone:</label>
                <input type=\"text\" id=\"phone\" name=\"phone\" value=\"{{ Auth::user()->phone }}\" style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;\">
                @error('phone') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>

            <div style=\"margin-bottom: 15px;\">
                <label for=\"address\">Address:</label>
                <textarea id=\"address\" name=\"address\" style=\"width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; height: 100px;\">{{ Auth::user()->address }}</textarea>
                @error('address') <span style=\"color: red;\">{{ \ }}</span> @enderror
            </div>

            <div style=\"display: flex; gap: 10px; margin-top: 20px;\">
                <button type=\"submit\" class=\"btn\">Save Changes</button>
                <a href=\"{{ route('profile.show') }}\" class=\"btn\" style=\"background: #ccc; color: #333;\">Cancel</a>
            </div>
        </form>
    </div>
@endsection
