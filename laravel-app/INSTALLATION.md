# Installation Guide - Velvet Vine (Laravel 8)

## Quick Start (For Users with Composer & PHP Installed)

### Windows PowerShell / Command Prompt:

\\\powershell
# 1. Navigate to project directory
cd laravel-app

# 2. Install dependencies
composer install

# 3. Create environment file
copy .env.example .env

# 4. Generate app key
php artisan key:generate

# 5. Create SQLite database file
if (!(Test-Path \"database\database.sqlite\")) {
    New-Item -ItemType File -Path \"database\database.sqlite\"
}

# 6. Run migrations
php artisan migrate

# 7. Seed sample data (optional)
php artisan db:seed

# 8. Start development server
php artisan serve

# 9. Open browser and go to http://localhost:8000
\\\

### macOS/Linux:

\\\ash
# 1. Navigate to project directory
cd laravel-app

# 2. Install dependencies
composer install

# 3. Create environment file
cp .env.example .env

# 4. Generate app key
php artisan key:generate

# 5. Create SQLite database
touch database/database.sqlite

# 6. Run migrations
php artisan migrate

# 7. Seed sample data (optional)
php artisan db:seed

# 8. Start development server
php artisan serve

# 9. Open browser and go to http://localhost:8000
\\\

## Default Test Accounts

After running php artisan db:seed, these accounts are available:

### Admin Account
- Username: dmin
- Password: dmin123
- Role: Admin
- Access: Full admin dashboard

### Customer Account
- Username: customer
- Password: pass123
- Role: Customer
- Access: Shopping and orders

### Rider Account
- Username: ider
- Password: pass123
- Role: Rider
- Access: Delivery management

## Configuration

### Database Configuration (.env file)

The default setup uses **SQLite**. To use MySQL instead:

1. Open .env file
2. Change the following:

\\\
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=velvet_vine
DB_USERNAME=root
DB_PASSWORD=your_password
\\\

3. Create the database in MySQL:
   \\\sql
   CREATE DATABASE velvet_vine;
   \\\

4. Run migrations:
   \\\
   php artisan migrate
   \\\

## Troubleshooting

### Issue: \"Class 'Composer\\Autoload\\ClassLoader' not found\"
**Solution**: Run composer install again

### Issue: \"PDOException: could not find driver\"
**Solution**: 
- Ensure PHP PDO extension is installed
- For SQLite: Make sure database/database.sqlite exists
- For MySQL: Ensure MySQL server is running

### Issue: \"The storage path is not writable\"
**Solution**: 
- Windows: No action needed usually, but ensure the folder has write permissions
- Linux/Mac: Run chmod -R 775 storage bootstrap/cache

### Issue: 502 Bad Gateway when running php artisan serve
**Solution**:
- Try a different port: php artisan serve --port=8001
- Restart the development server

### Issue: CSRF Token Mismatch
**Solution**: Clear cached views
\\\
php artisan view:clear
php artisan cache:clear
\\\

## Useful Artisan Commands

\\\ash
# View all routes
php artisan route:list

# Access database shell (Tinker)
php artisan tinker

# Clear all caches
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# Migrate fresh (WARNING: deletes all data)
php artisan migrate:fresh

# Create a new controller
php artisan make:controller YourController

# Create a new model with migration
php artisan make:model YourModel -m

# Run tests
php artisan test
\\\

## Deployment to Production

### Using Heroku:

\\\ash
# Install Heroku CLI and login
heroku login

# Create a new Heroku app
heroku create your-app-name

# Add environment secrets
heroku config:set APP_KEY=base64:xxxxx
heroku config:set ENV=production

# Push to Heroku
git push heroku main

# Run migrations on Heroku
heroku run php artisan migrate
\\\

## Next Steps

1. **Customize branding**: Edit esources/views/layouts/app.blade.php
2. **Add products**: Use admin panel at /admin/inventory
3. **Configure email**: Update .env with email settings for notifications
4. **Set up payment gateway**: Integrate GCash or other payment providers
5. **Upload product images**: Store in public/ directory

## Performance Optimization

### For Production:
\\\ash
# Cache routes and config
php artisan route:cache
php artisan config:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Use production environment
APP_ENV=production
APP_DEBUG=false
\\\

## Support

For issues or questions:
- Check Laravel documentation: https://laravel.com/docs/8.x
- Review project README.md for architecture details
- Check middleware in pp/Http/Middleware for authorization rules

Happy coding! 🌸
