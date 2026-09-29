# Serenity Grand Hotel - Backend

Node.js + Express + Sequelize + MySQL backend for the Serenity Grand Hotel React project.

## 1. Database

Import `serenity_grand_hotel.sql` into phpMyAdmin/MySQL first. The backend does not run `sequelize.sync({ alter: true })`; it expects the designed SQL schema.

## 2. Environment

Copy `.env.example` to `.env` and set the MySQL credentials and a strong `JWT_SECRET`.

## 3. Install

```bash
cd backend
npm install
```

## 4. Seed

```bash
npm run seed
```

Default development admin:
- Email: `admin@serenitygrand.com`
- Password: `admin123`

Change these values before real deployment.

## 5. Run

```bash
npm run dev
```

API: `http://localhost:5000`
Health: `GET http://localhost:5000/api/health`

## Authentication

Use `Authorization: Bearer <token>` for protected routes. Admin routes require a JWT whose user role is `admin`.

## Main API groups

- `/api/auth`
- `/api/rooms`
- `/api/amenities`
- `/api/bookings`
- `/api/customers`
- `/api/facilities`
- `/api/services`
- `/api/activities`
- `/api/gallery-categories`
- `/api/gallery`
- `/api/restaurants`
- `/api/menu-categories`
- `/api/menu-items`
- `/api/dining`
- `/api/messages`
- `/api/reviews`
- `/api/dashboard`
- `/api/settings`
- `/api/social-links`
- `/api/upload`

## Important

The existing React pages still contain some hard-coded/demo data. This backend is ready to replace those data sources with API calls, but the frontend pages must be connected to these endpoints one by one.
