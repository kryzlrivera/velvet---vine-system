<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@velvetvine.com',
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'phone' => '09123456789',
            'address' => 'Manila, Philippines',
            'role' => 'admin',
        ]);

        // Create sample customer
        User::create([
            'name' => 'John Customer',
            'email' => 'customer@velvetvine.com',
            'username' => 'customer',
            'password' => Hash::make('pass123'),
            'phone' => '09987654321',
            'address' => 'Makati, Philippines',
            'role' => 'customer',
        ]);

        // Create sample rider
        User::create([
            'name' => 'Maria Rider',
            'email' => 'rider@velvetvine.com',
            'username' => 'rider',
            'password' => Hash::make('pass123'),
            'phone' => '09456789012',
            'address' => 'Quezon City, Philippines',
            'role' => 'rider',
        ]);

        // Create sample products
        Product::create([
            'name' => 'Blush Bloom',
            'description' => 'Soft pink roses with eucalyptus and baby\'s breath.',
            'price' => 1000,
            'stock' => 12,
            'image' => '/blush-bloom.jpg',
            'categories' => json_encode(['Occasion:Anniversary', 'FlowerType:Roses', 'Price:Under1000']),
        ]);

        Product::create([
            'name' => 'Dune Beige',
            'description' => 'Neutral tones with lilies and wildflowers for any celebration.',
            'price' => 2000,
            'stock' => 8,
            'image' => '/bouquet2.jpg',
            'categories' => json_encode(['Occasion:Birthday', 'FlowerType:Lilies', 'Price:1000-2000']),
        ]);

        Product::create([
            'name' => 'Pretty Roses',
            'description' => 'A bouquet of classic red and pink roses for romance.',
            'price' => 900,
            'stock' => 3,
            'image' => '/pretty-roses.jpg',
            'categories' => json_encode(['Occasion:Valentine', 'FlowerType:Roses', 'Price:Under1000']),
        ]);

        Product::create([
            'name' => 'Wild Whisper',
            'description' => 'Bright sunflowers and daisies bring cheerful energy.',
            'price' => 3000,
            'stock' => 15,
            'image' => '/bouquet4.jpg',
            'categories' => json_encode(['Occasion:Friendship', 'FlowerType:Sunflower', 'Price:2000-3000']),
        ]);
    }
}
