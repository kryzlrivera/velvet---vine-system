# Velvet Vine - Laravel 8

A flower e-commerce shop built with Laravel 8.

## Features

- Product listing and management
- Shopping cart functionality
- Order management with delivery tracking
- User authentication (Customer, Admin, Rider roles)
- Admin dashboard with inventory management
- Real-time order status updates
- Messaging system

## Setup Instructions

### Prerequisites
- PHP 7.3+ or 8.0+
- Composer
- MySQL or SQLite
- Node.js and npm (optional, for front-end assets)

### Installation

1. **Clone/Setup the project:**
   `
   cd laravel-app
   `

2. **Install dependencies:**
   `
   composer install
   `

3. **Create environment file:**
   `
   cp .env.example .env
   `

4. **Generate application key:**
   `
   php artisan key:generate
   `

5. **Configure database in .env**
   - Default uses SQLite
   - For MySQL, update DB_CONNECTION and credentials

6. **Run migrations:**
   `
   php artisan migrate
   `

7. **Seed sample data (optional):**
   `
   php artisan db:seed
   `

8. **Start development server:**
   `
   php artisan serve
   `

9. **Access the application:**
   - Navigate to http://localhost:8000
   - Admin login: username=admin, role=admin

## Project Structure

`
laravel-app/
├── app/
│   ├── Http/
│   │   └── Controllers/       # Application controllers
│   │       ├── Admin/         # Admin controllers
│   │       ├── ProductController.php
│   │       ├── OrderController.php
│   │       ├── CartController.php
│   │       ├── ProfileController.php
│   │       └── AuthController.php
│   └── Models/                # Eloquent models
│       ├── User.php
│       ├── Product.php
│       ├── Order.php
│       ├── OrderItem.php
│       └── Message.php
├── database/
│   └── migrations/            # Database migrations
├── resources/
│   └── views/                 # Blade templates
│       ├── layouts/
│       ├── auth/
│       ├── products/
│       ├── cart/
│       ├── orders/
│       ├── profile/
│       └── admin/
├── routes/
│   └── web.php                # Web routes
└── config/                    # Configuration files

`

## Available Routes

### Public Routes
- GET / - Home page
- GET /products - Product listing
- GET /products/{id} - Product details

### Authentication
- GET /signin - Sign in page
- POST /signin - Process sign in
- GET /signup - Sign up page
- POST /signup - Process registration
- POST /signout - Logout

### Customer Routes (Authenticated)
- GET /cart - View shopping cart
- POST /cart/add/{id} - Add product to cart
- DELETE /cart/{id} - Remove from cart
- GET /orders - View customer orders
- POST /orders - Create new order
- GET /profile - View profile
- PUT /profile - Update profile

### Admin Routes (Admin Only)
- GET /admin - Admin dashboard
- GET /admin/inventory - Inventory management
- GET /admin/orders - View all orders
- GET /admin/charts - Analytics charts
- Product CRUD operations

## Database Schema

### Users Table
- id, name, email, username, password, phone, address, role (customer/admin/rider), timestamps

### Products Table
- id, name, description, price, stock, image, categories (JSON), timestamps

### Orders Table
- id, user_id, total, status, delivery_address, delivery_lat/lng, contact_phone, delivery_option, payment_method, maps_url, timestamps

### Order Items Table
- id, order_id, product_id, quantity, note, wrap, timestamps

### Messages Table
- id, user_id, from_role, text, timestamps

## Development

### Running Tests
`
php artisan test
`

### Tinker Shell (Interactive PHP)
`
php artisan tinker
`

## Troubleshooting

- **Migrations fail**: Ensure database is configured and running
- **Permission errors**: Check storage and bootstrap/cache directories are writable
- **Missing artisan file**: Run composer install again

## Future Enhancements

- Email notifications
- Payment gateway integration
- Real-time notifications with WebSockets
- Advanced inventory management
- Customer reviews and ratings
- Multi-language support

## License

This project is open source and available under the MIT License.
