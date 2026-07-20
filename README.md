# Ahmed Kandil — Dental Portfolio Platform
<img width="1919" height="860" alt="image" src="https://github.com/user-attachments/assets/bb0ff3cd-71bc-4576-b81c-b33e02604e7f" />

<img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/5906a97d-ec04-4974-bdf2-56eca1ed45c3" />
<img width="1912" height="863" alt="image" src="https://github.com/user-attachments/assets/1b5ad057-448f-4dc6-8594-9115e84e7606" />
<img width="1917" height="869" alt="image" src="https://github.com/user-attachments/assets/aaa710ac-416d-420f-88fc-4cc247745289" />


A complete dental portfolio platform consisting of **three separate projects** that work together:

| Project | Description | Live Link |
|---|---|---|
| **Backend** | REST API with ASP.NET Core 8 | https://ahmed-kandil-backend.runasp.net/swagger/index.html |
| **Dashboard** | Admin Control Panel (Angular) for editing site content | https://ahmed-kandil-dashboard.runasp.net/dashboard/hero |
| **Portfolio** | The public-facing website viewed by visitors (Angular) | https://ahmed-kandil-portfolio.runasp.net/ |

---

## 1. Project Concept

A dental portfolio website (bilingual Arabic/English) featuring:
- A Hero section with profile picture, name, titles, statistics, and animated medical tips.
- Services section.
- Portfolio/Case Studies section with multiple images per case.
- Experiences section in Timeline format.
- Client Testimonials section — visitors can also add new reviews.
- Contact Info + Working Hours + Social Media Links.
- Contact Message form that sends inquiries via email.
- General site settings (default language, theme, maintenance mode).

All of this content is managed from the **Dashboard** (admin panel with login), and is automatically displayed on the **public Portfolio site** via API calls.

---

## 2. Overall Architecture

```
                ┌──────────────────────┐
                │   Portfolio (Public)  │  Angular 19 — SPA
                │  ahmed-kandil-        │
                │  portfolio.runasp.net │
                └───────────┬──────────┘
                            │  GET /api/public/*
                            ▼
┌──────────────────────┐   REST/JSON    ┌──────────────────────┐
│  Dashboard (Admin)    │◄──────────────►│   Backend API         │
│  Angular 21 — SPA     │   JWT Bearer   │  ASP.NET Core 8 Web   │
│  ahmed-kandil-        │                │  API + EF Core        │
│  dashboard.runasp.net │                │  ahmed-kandil-        │
└──────────────────────┘                │  backend.runasp.net   │
                                          └──────────┬───────────┘
                                                     │
                                                     ▼
                                          ┌──────────────────────┐
                                          │  SQL Server Database  │
                                          └──────────────────────┘
```

- **Backend** is the single source of truth, responsible for storage, authentication, and email sending.
- **Dashboard** uses JWT-protected endpoints (`api/admin/*`) to modify content and upload images.
- **Portfolio** uses public unprotected endpoints (`api/public/*`) only to display content.
- Hosted on **runasp.net** platform (ASP.NET/IIS hosting).

---

## 3. Backend — Full Details

### 3.1 Tech Stack

| Technology | Version | Usage |
|---|---|---|
| .NET / ASP.NET Core Web API | 8.0 | Core framework |
| Entity Framework Core | 8.0.28 | ORM for database interaction |
| EF Core SqlServer Provider | 8.0.28 | SQL Server connection |
| EF Core Tools / Design | 8.0.28 | Migrations |
| Swashbuckle.AspNetCore (Swagger) | 6.6.2 | Interactive API documentation (Swagger UI) |
| Microsoft.AspNetCore.Authentication.JwtBearer | 8.0.28 | JWT Authentication |
| BCrypt.Net-Next | 4.2.0 | Password hashing |
| Nullable / ImplicitUsings | Enabled | Modern C# features |

### 3.2 Project Structure (Folder Structure)

```
Backend/
├── Program.cs                     # Application entry point + full Pipeline setup
├── WeatherForecast.cs              # Default template file (not actually used)
├── appsettings.json / .Development.json
├── portfolioadmin.db               # Local database (experimental/backup SQLite)
│
├── Common/
│   └── ApiResponse.cs              # Unified response format for all responses (Success/Data/Message)
│
├── Controllers/
│   ├── AuthController.cs           # Login + Change Password + Current user data
│   ├── ContactController.cs        # (Admin) View/Edit contact info
│   ├── ExperiencesController.cs    # (Admin) CRUD for experiences
│   ├── HeroController.cs           # (Admin) View/Edit Hero content + Profile image upload
│   ├── PortfolioCasesController.cs # (Admin) CRUD for portfolio cases + Multi-image upload
│   ├── PublicController.cs         # (Public) Aggregates all site data + Receives contact messages and reviews
│   ├── ServicesController.cs       # (Admin) CRUD for services
│   ├── SettingsController.cs       # (Admin) View/Edit site settings
│   ├── TestimonialsController.cs   # (Admin) CRUD for testimonials
│   └── Base/
│       └── CrudControllerBase.cs   # Abstract generic base class providing ready-made CRUD operations
│
├── Data/
│   ├── AppDbContext.cs             # DbContext + Relationship and index definitions
│   └── DbSeeder.cs                 # Initial seed data on first run
│
├── DTOs/
│   ├── AuthDtos.cs                 # LoginRequestDto / LoginResponseDto / ChangePasswordDto
│   └── ContentDtos.cs              # All content DTOs (Hero, Services, Cases, etc.)
│
├── Middleware/
│   └── ExceptionHandlingMiddleware.cs   # Catches any Exception and returns it as unified JSON
│
├── Migrations/                     # EF Core Migrations (database evolution history)
│
├── Models/
│   ├── AdminUser.cs
│   ├── ContactInfo.cs  (+ WorkingHour)
│   ├── Experience.cs
│   ├── HeroContent.cs
│   ├── PortfolioCase.cs (+ PortfolioImage)
│   ├── ServiceItem.cs
│   ├── SiteSettings.cs
│   └── Testimonial.cs
│
├── Services/
│   ├── EmailService.cs             # Email sending (SMTP) for contact messages
│   ├── ImageService.cs             # Save/Delete/Update uploaded images on the server
│   └── JwtService.cs               # JWT token generation and validation
│
└── Properties/
    ├── launchSettings.json
    └── PublishProfiles/            # Publish profiles for runasp.net hosting
```

### 3.3 Database (Data Model)

SQL Server database (with a local SQLite `portfolioadmin.db` file for development/testing), containing the following tables:

| Table | Description | Key Fields |
|---|---|---|
| **AdminUser** | Admin account | `Username`, `PasswordHash` (BCrypt), `Role`, `LastLoginAt` |
| **HeroContent** | Hero section content (single row, Id=1) | Name/Title in Arabic and English, description, availability badge, typed phrases (JSON), profile image, medical tips (JSON), 4 numeric statistics |
| **ServiceItem** | Doctor's services | Icon, card number, title/description in both languages, sort order, active status |
| **PortfolioCase** | Case/Previous work | Title/subtitle in both languages, icon, thumbnail image, sort order |
| **PortfolioImage** | Sub-images per case (One-to-Many with PortfolioCase) | Image URL, sort order |
| **Experience** | Experience timeline item | Time period, icon, title/institution/description/badge in both languages, sort order |
| **Testimonial** | Client review | Text and author in both languages, sort order, active status |
| **ContactInfo** | Contact information (single row, Id=1) | Phone, email, address in both languages, social media links |
| **WorkingHour** | Working hours (One-to-Many with ContactInfo) | Day, hours, sort order |
| **SiteSettings** | General settings (single row, Id=1) | Default language, default theme, maintenance mode, footer text |

**Important Notes:**
- All tables requiring ordering have a `SortOrder` field.
- Tables requiring show/hide functionality have an `IsActive` field.
- Bilingual content: each text field typically has `...Ar` and `...En` versions.
- **Composite Indexes** added (Migration dated 2026-07-17) to improve query performance.
- **AvailabilityBadge** and **MedicalTips** added to HeroContent (Migration dated 2026-07-15).

### 3.4 Endpoints (API Interfaces)

#### Authentication — `api/auth`
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login (returns JWT Token) — Protected with Rate Limiting (5 attempts/minute) |
| POST | `/api/auth/change-password` | ✅ JWT | Change password |
| GET | `/api/auth/me` | ✅ JWT | Current user data |

#### Admin Control Panel — Requires JWT
| Controller | Route | Operations |
|---|---|---|
| `HeroController` | `/api/admin/hero` | GET / PUT (supports image upload via `multipart/form-data`) |
| `ServicesController` | `/api/admin/services` | Full CRUD (Generic) |
| `PortfolioCasesController` | `/api/admin/cases` | GET All / GET by Id / POST (image upload) / PUT / DELETE |
| `ExperiencesController` | `/api/admin/experiences` | Full CRUD (Generic) |
| `TestimonialsController` | `/api/admin/testimonials` | Full CRUD (Generic) |
| `ContactController` | `/api/admin/contact` | GET / PUT |
| `SettingsController` | `/api/admin/settings` | GET / PUT |

Simple controllers (`ExperiencesController`, `ServicesController`, `TestimonialsController`) inherit from `CrudControllerBase<TEntity, TDto>` — a generic base class providing ready-made `GetAll / GetById / Create / Update / Delete` operations, eliminating code duplication.

#### Public Site — No Authentication
| Method | Route | Description |
|---|---|---|
| GET | `/api/public/portfolio-data` | Returns **all** site data in a single request (Hero + Services + Cases + Experiences + Testimonials + Contact + Settings) |
| POST | `/api/public/contact-message` | Receives a contact message from visitors and sends it via email through `EmailService` |
| POST | `/api/public/testimonials` | Adds a new review from visitors |

### 3.5 Authentication & Security

- **JWT Bearer Authentication**: Token contains `Issuer`, `Audience`, `Key` defined in `appsettings.json`, with time validity (`ValidateLifetime`) and `ClockSkew` = 30 seconds.
- **BCrypt** for password hashing before storage.
- **Rate Limiting** on login only: 5 requests per IP per minute, to prevent Brute-Force attacks.
- **CORS** configured via `appsettings.json` (`Cors:AllowedOrigins`) to only allow Dashboard and Portfolio domains, with `AllowCredentials`.
- **Global Exception Handling Middleware**: Catches any unexpected exceptions and returns them in a unified JSON format instead of default error pages.
- **Response Compression** enabled to reduce response size.
- **Health Checks** at `/health` for server status monitoring.
- **HTTPS Redirection** enabled in production only (disabled in development to avoid breaking CORS Preflight when working on local HTTP).
- All responses follow a unified format via `ApiResponse<T>` (success/failure, data, message).

### 3.6 Additional Services

- **ImageService**: Manages saving uploaded images (Hero Profile Image, Portfolio Case Images) on the server inside `wwwroot` and deletes old ones on update.
- **EmailService**: Sends automatic email notification when a new contact message arrives from the "Contact Us" form.
- **JwtService**: Token generation and validation.

### 3.7 Database & Startup

- On application startup (`Program.cs`), the following happens automatically:
  1. `db.Database.Migrate()` is executed (applies any pending Migrations).
  2. `DbSeeder.Seed(db)` is executed to add initial data if the database is empty.
- Database connection supports `EnableRetryOnFailure` (3 attempts, up to 5-second delay) to handle temporary connection interruptions.

### 3.8 Documentation (Swagger)

Swagger UI is always available (even in production) at:
`https://ahmed-kandil-backend.runasp.net/swagger/index.html`
It supports direct JWT Token entry for testing protected endpoints (`Authorize` button with Bearer).

---

## 4. Dashboard (Admin Panel) — Full Details

Link: https://ahmed-kandil-dashboard.runasp.net/dashboard/hero

### 4.1 Technologies

| Technology | Version |
|---|---|
| Angular (Core/Common/Forms/Router/Platform-Browser) | ^21.2.0 |
| Angular CLI / Build | ^21.2.8 |
| RxJS | ^7.8.1 |
| Font Awesome Free | ^7.3.1 |
| TypeScript | ~5.9.2 |
| Zone.js | ~0.15.1 |
| Vitest (testing) | ^4.0.8 |
| Prettier (code formatting) | ^3.8.1 |

### 4.2 Project Structure

```
Dashboard/src/app/
├── app.ts / app.html / app.css / app.routes.ts / app.config.ts
│
├── core/
│   ├── auth/
│   │   ├── auth.guard.ts          # Protects /dashboard/* routes (requires Login)
│   │   └── auth.service.ts        # Login, token storage, logout
│   ├── interceptors/
│   │   └── auth.interceptor.ts    # Automatically attaches JWT to every HTTP request header
│   └── services/
│       ├── api.service.ts             # General communication layer for all admin endpoints
│       ├── dashboard-data.service.ts  # Load/Update dashboard data
│       └── toast.service.ts           # Success/Error notifications (Toast Notifications)
│
├── features/
│   ├── login/
│   │   ├── login.component.ts
│   │   └── login-3d-tooth.css         # Custom design/animation (3D tooth) for the login page
│   │
│   ├── home/                          # Simple welcome page (not actually used as main page)
│   │
│   └── dashboard/
│       ├── dashboard.component.ts/html/css   # Main Layout (Sidebar + Router Outlet)
│       ├── hero/                      # Edit hero section content + Profile image upload
│       ├── services/                  # CRUD for services
│       ├── portfolio/                 # CRUD for portfolio cases + Multi-image upload
│       ├── experiences/               # CRUD for experiences
│       ├── testimonials/              # Manage client testimonials
│       ├── contact/                   # Edit contact info and working hours
│       └── settings/                  # General site settings (language/theme/maintenance)
│
└── models/
    └── portfolio.models.ts            # All TypeScript Interfaces matching backend DTOs
```

### 4.3 Routes (Routing)

```
/                          → Redirect to /login
/login                     → Login page
/dashboard  (Protected by AuthGuard)
   ├── /hero          (default)
   ├── /services
   ├── /portfolio
   ├── /experiences
   ├── /testimonials
   ├── /contact
   └── /settings
**                         → Redirect to /login
```

### 4.4 Frontend Authentication

- `AuthService`: Sends login credentials to `POST /api/auth/login`, and stores the JWT Token (in browser local storage).
- `AuthGuard`: Prevents access to `/dashboard` and all sub-pages without a valid token, redirecting to `/login`.
- `AuthInterceptor` (HTTP Interceptor): Automatically adds the `Authorization: Bearer <token>` header to every outgoing HTTP request to the backend.

### 4.5 Functional Features

- **Hero**: Edit name/titles/Description in Arabic and English, enable/disable "Available for consultations" badge, manage Typed Phrases and medical tips, upload profile image, edit 4 numeric statistics with their titles.
- **Services**: Add/Edit/Delete/Reorder services with Font Awesome icons.
- **Portfolio**: Add new case with thumbnail + upload multiple detail images per case, with ordering.
- **Experiences**: Manage experience timeline (date, institution, description, badge).
- **Testimonials**: View/Delete/Activate client reviews (including those added by visitors from the public site).
- **Contact**: Edit phone number, email, address, social media links, and working hours.
- **Settings**: Set default site language, default theme (dark/light/blue/royal/midnight/emerald), and enable maintenance mode.
- **Toast Notifications**: Instant success/failure notifications for every save operation.

---

## 5. Portfolio (Public Site) — Full Details

Link: https://ahmed-kandil-portfolio.runasp.net/

### 5.1 Technologies

| Technology | Version |
|---|---|
| Angular (Core/Common/Forms/Router/Platform-Browser/Dynamic) | ^19.2.0 |
| Angular CLI / Build | ^19.2.27 |
| RxJS | ~7.8.0 |
| TypeScript | ~5.7.2 |
| Zone.js | ~0.15.1 |
| Jasmine + Karma (testing) | ~5.x / ~6.4.0 |

### 5.2 Project Structure

```
Portfolio/src/app/
├── app.component.ts/html/css      # Entire site built in a single main component (One-Page Portfolio)
├── app.config.ts
│
└── core/
    ├── models/
    │   └── portfolio.models.ts    # Interfaces: HeroContent, ServiceItem, PortfolioCase,
    │                               #   ExperienceItem, TestimonialItem, ContactData,
    │                               #   SiteSettings, PublicPortfolioData, ContactMessagePayload
    └── services/
        └── portfolio-data.service.ts   # API communication layer
```

### 5.3 Data Fetching Mechanism

- `PortfolioDataService.getPortfolioData()`:
  - Calls `GET /api/public/portfolio-data` only once to fetch all site data in one go (Hero + Services + Cases + Experiences + Testimonials + Contact + Settings).
  - Uses headers to prevent caching (`Cache-Control: no-cache`) so the site always displays the latest updates from the dashboard.
  - `timeout(30000)` + `retry({ count: 3, delay: 2000 })`: any failed request is automatically retried up to 3 times before showing an error to the user — important because the free hosting (runasp.net) has Cold Start delays if the server was idle.
  - Custom error handling (`handleError`) translates common errors into understandable messages (connection issue / request error / internal server error).
- `submitContactMessage()`: Sends contact form to `POST /api/public/contact-message`.
- `addTestimonial()`: Adds a new client review to `POST /api/public/testimonials`.

### 5.4 Functional Features

- Display Hero section with image, name, titles, description, statistics, and animated medical tips.
- Display services grid.
- Display portfolio cases with an image gallery for each case.
- Display experience timeline.
- Display client testimonials + ability to add a new review directly from the site.
- Display contact information, working hours, and social media links.
- "Contact Us" form that sends messages to the doctor's email.
- Bilingual support (Arabic/English) and theme switching based on `SiteSettings` configuration.

---

## 6. Environments

### Backend
- `appsettings.Development.json` — Local development settings (local Connection String, test JWT Key).
- `appsettings.json` — General/Production settings.
- `PublishProfiles/*.pubxml` — Ready-made publish profiles for runasp.net hosting (WebDeploy).

### Dashboard
- `src/environments/environment.ts` — Points to the backend (locally or directly to production depending on last edit).

### Portfolio
- `environment.ts` (development): `http://localhost:5242/api`
- `environment.prod.ts` (production): `https://ahmed-kandil-backend.runasp.net/api`
- `imagesBaseUrl` separate from `apiUrl` (without `/api`) for displaying uploaded images directly from the server.
- `proxy.conf.json` to resolve CORS issues during local development (`ng serve`).

---

## 7. Local Development Setup

### Backend
```bash
cd Backend
dotnet restore
dotnet ef database update   # Apply Migrations (or automatically on startup)
dotnet run
# Swagger: http://localhost:5242/swagger
```

### Dashboard
```bash
cd Dashboard
npm install
npm start        # ng serve
```

### Portfolio
```bash
cd Portfolio
npm install
npm start        # ng serve
```

> **Note:** You need to modify `environment.ts` in both Dashboard and Portfolio to point to the correct local backend address (e.g., `http://localhost:5242/api`) when developing locally.

---

## 8. Full Tech Stack Summary

**Backend:**
ASP.NET Core 8 · Entity Framework Core 8 · SQL Server (+ SQLite for development) · JWT Authentication · BCrypt.Net · Swashbuckle/Swagger · Rate Limiting · CORS · Response Compression · Health Checks · Generic CRUD Pattern · Global Exception Middleware

**Dashboard (Admin Panel):**
Angular 21 (Standalone Components) · TypeScript 5.9 · RxJS · Angular Router + Guards · HTTP Interceptors · Font Awesome · Vitest · Prettier

**Portfolio (Public Site):**
Angular 19 (Standalone Components) · TypeScript 5.7 · RxJS (timeout/retry) · Jasmine/Karma

**Architecture:** Fully decoupled REST API from frontend (Decoupled) · Bilingual (manual i18n via Ar/En fields) · Multiple themes · Deployed on runasp.net hosting across three independent applications.

---

## 9. Live Links

- 🌐 Public Website: https://ahmed-kandil-portfolio.runasp.net/
- 🔐 Admin Panel: https://ahmed-kandil-dashboard.runasp.net/dashboard/hero
- 📘 API Documentation (Swagger): https://ahmed-kandil-backend.runasp.net/swagger/index.html

