<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        \ = Auth::user();
        return view('profile.show', compact('user'));
    }

    public function edit()
    {
        \ = Auth::user();
        return view('profile.edit', compact('user'));
    }

    public function update(Request \)
    {
        \ = \->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        Auth::user()->update(\);
        return redirect()->route('profile.show')->with('success', 'Profile updated!');
    }
}
