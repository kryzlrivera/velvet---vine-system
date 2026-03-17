# Velvet & Vine - Next.js Flower Shop

A full stack demo for Velvet & Vine, built with Next.js (App Router), TypeScript, and Tailwind CSS. The UI is pink and white, with a boutique floral layout.

## Features implemented

- Product catalog with category filtering (Occasion, Flower Type, Price)
- Real-time inventory decrement on checkout and low stock alerts
- Product customization: note + wrap styles
- Guest/registered-like order placement (local state)
- Order tracking statuses: In Arrangement → Out for Delivery → Delivered
- Order history dashboard
- Profile form for customer info (delivery address + contact)
- Messaging portal with admin auto-response
- Admin panel: user management dashboard, delivery management, reports
- Scalability/availability/security structure stubbed for expansion

## Folder structure

- `src/app/page.tsx` - Shop catalog + cart + checkout + chat
- `src/app/orders/page.tsx` - Order history/status management
- `src/app/profile/page.tsx` - Profile management
- `src/app/admin/page.tsx` - Admin overview & reports
- `src/context/ShopContext.tsx` - Core marketplace state: products, cart, orders, profile, messages
- `src/lib/data.ts` - Product definitions
- `src/lib/types.ts` - TypeScript definitions
- `src/components/SiteHeader.tsx` - Global navigation in pink-white theme

## Running locally

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Build

```bash
npm run build
```

## Notes

- Demo uses `localStorage`; production should use a backend (Prisma + PostgreSQL, API routes, authentication).
- Image placeholders use Unsplash queries; replace with static assets for production.
- Payment and PCI-DSS, SSL/TLS, auth, scaling and failover paths are architectural targets for full production implementation.

