# AdminDashboard

## Project Overview
AdminDashboard is an Angular (v21.2.8) application generated with Angular CLI.

This dashboard includes authentication and CRUD pages for the following sections:
- Hero
- Services
- Portfolio Cases
- Experiences
- Testimonials
- Contact
- Settings

The frontend communicates with the backend API configured in:
- `src/environments/environment.ts`

By default, it uses:
- `https://localhost:7042/api`

---

## How to Run

### 1) Start Development Server

Default (port 4200):

```bash
ng serve
```

Open:
- http://localhost:4200/

### 2) If you get:
`listen EACCES: permission denied ... :4200`

Run Angular on another port and force IPv4:

```bash
ng serve --port 4300 --host 127.0.0.1
```

Open:
- http://127.0.0.1:4300/

---

## Important Notes (Backend / CORS)
1) Backend must be running and reachable from the frontend.
2) Ensure CORS is enabled on the backend for the frontend origin.
   - Frontend runs on: `http://localhost:4200` (or your chosen port)

---

## Authentication Flow
- Login page calls:
  - `POST {apiUrl}/auth/login`
- Token is stored in `localStorage` by `AuthService`.
- All protected pages use:
  - `AuthGuard`
- HTTP requests attach the token through:
  - `AuthInterceptor`

---

## Frontend Structure

### Core
- `src/app/core/auth/auth.service.ts`
- `src/app/core/auth/auth.guard.ts`
- `src/app/core/interceptors/auth.interceptor.ts`
- `src/app/core/services/api.service.ts`
- `src/app/core/services/toast.service.ts`

### App Routing
- `src/app/app-routing.module.ts`

### Dashboard Pages (CRUD)
- `src/app/features/login/login.component.ts`
- `src/app/features/dashboard/dashboard.component.ts`
- `src/app/features/dashboard/hero/hero.component.ts`
- `src/app/features/dashboard/services/services.component.ts`
- `src/app/features/dashboard/portfolio/portfolio.component.ts`
- `src/app/features/dashboard/experiences/experiences.component.ts`
- `src/app/features/dashboard/testimonials/testimonials.component.ts`
- `src/app/features/dashboard/contact/contact.component.ts`
- `src/app/features/dashboard/settings/settings.component.ts`

---

## Development / Build / Tests

### Build

```bash
ng build
```

### Unit Tests

```bash
ng test
```

### End-to-End Tests

```bash
ng e2e
```

---

## Code Generation (Angular CLI)

Generate a component:

```bash
ng generate component component-name
```

List available schematics:

```bash
ng generate --help
```

---

## CLI Analytics
If Angular asks about analytics, you can respond `No`.

---

## Required Commands Summary
- Dev server: `ng serve`
- Dev server (force IPv4 + port 4300): `ng serve --port 4300 --host 127.0.0.1`
- Build: `ng build`
- Tests: `ng test`

