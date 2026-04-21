<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showSignIn()
    {
        return view('auth.signin');
    }

    public function signIn(Request \)
    {
        \ = \->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['username' => \['username'], 'password' => \['password']])) {
            \->session()->regenerate();
            return redirect()->route('home')->with('success', 'Signed in successfully!');
        }

        return back()->withErrors(['username' => 'Invalid credentials.']);
    }

    public function showSignUp()
    {
        return view('auth.signup');
    }

    public function signUp(Request \)
    {
        \ = \->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:customer,admin,rider',
        ]);

        User::create([
            'name' => \['name'],
            'email' => \['email'],
            'username' => \['username'],
            'password' => Hash::make(\['password']),
            'role' => \['role'],
        ]);

        if (Auth::attempt(['username' => \['username'], 'password' => \['password']])) {
            \->session()->regenerate();
            return redirect()->route('home')->with('success', 'Account created! Welcome!');
        }

        return redirect()->route('signin')->with('success', 'Account created! Please log in.');
    }

    public function signOut(Request \)
    {
        Auth::logout();
        \->session()->invalidate();
        \->session()->regenerateToken();
        return redirect()->route('home')->with('success', 'Signed out successfully!');
    }
}
