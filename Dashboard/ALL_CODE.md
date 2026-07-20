# admin-dashboard - All Code Bundle

> تم تجميع محتوى جميع الملفات النصية داخل مجلد `admin-dashboard/` في ملف واحد.

> ملاحظة: نظراً لعدم توفر بحث تلقائي (ripgrep) داخل بيئة الأدوات، يتم تعبئة الملف على دفعات.

---

## .editorconfig

```text
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

---

## angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "admin-dashboard": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "admin-dashboard:build:production"
            },
            "development": {
              "buildTarget": "admin-dashboard:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
```

---

## package.json

```json
{
  "name": "admin-dashboard",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "packageManager": "npm@11.12.1",
  "dependencies": {
    "@angular/common": "^21.2.0",
    "@angular/compiler": "^21.2.0",
    "@angular/core": "^21.2.0",
    "@angular/forms": "^21.2.0",
    "@angular/platform-browser": "^21.2.0",
    "@angular/router": "^21.2.0",
    "rxjs": "^7.8.1",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.2.8",
    "@angular/cli": "^21.2.8",
    "@angular/compiler-cli": "^21.2.0",
    "jsdom": "^28.0.0",
    "prettier": "^3.8.1",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}
```

---

## README.md

```md
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
```

---

## TODO.md

```md
# TODO - Dashboard Angular تحسين الخروج والتصميم

## الخطوة 1
- [x] فحص ملفات: `AuthInterceptor`, `AuthService`, `DashboardComponent`, `LoginComponent`
- [ ] إعداد خطة التعديل (تم)

## الخطوة 2
- [x] تعديل `AuthInterceptor` لإيقاف تسجيل الخروج التلقائي عند أي 401

## الخطوة 3
- [x] تحسين تصميم `src/styles.css` بإضافة Global styles (reset + vars + scrollbar + rtl)

## الخطوة 4
- [x] إعادة تصميم `DashboardComponent` (HTML + CSS داخل component) لجعل التصميم احترافي + زر خروج كـ button

## الخطوة 5 (اختياري)
- [ ] تحديث `login.component.ts` إذا ظهر تعارض/تحسين إضافي مطلوب

## الخطوة 6
- [ ] تشغيل المشروع والتأكد من عدم حدوث logout عند الضغط على أي زر
```

---

## src/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AdminDashboard</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

---

## src/main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

---

## src/styles.css

```css
/* ============================================================
   RESET & GLOBAL STYLES
   ============================================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #60a5fa;

  --secondary: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;

  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;

  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  --radius: 8px;
  --radius-lg: 12px;
}

html,
body {
  height: 100%;
}

body {
  font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--gray-50);
  color: var(--gray-900);
  direction: rtl;
}

a {
  color: inherit;
}

/* ============================================================
   SCROLLBAR
   ============================================================ */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--gray-100);
}
::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--gray-400);
}

/* ============================================================
   UTIL
   ============================================================ */
.page-container {
  width: 100%;
}
```

---

## src/app/app.ts

```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('admin-dashboard');
}
```

---

## src/app/app.css

```css

```

---

## src/environments/environment.ts

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7042/api'
};

```

---

## src/app/app.config.ts

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
```

---

## src/app/app.routes.ts

```ts
import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeroComponent } from './features/dashboard/hero/hero.component';
import { ServicesComponent } from './features/dashboard/services/services.component';
import { PortfolioComponent } from './features/dashboard/portfolio/portfolio.component';
import { ExperiencesComponent } from './features/dashboard/experiences/experiences.component';
import { TestimonialsComponent } from './features/dashboard/testimonials/testimonials.component';
import { ContactComponent } from './features/dashboard/contact/contact.component';
import { SettingsComponent } from './features/dashboard/settings/settings.component';

import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'hero', pathMatch: 'full' },
      { path: 'hero', component: HeroComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'experiences', component: ExperiencesComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

```

---

## src/app/app.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, admin-dashboard');
  });
});
```

---

## src/app/core/auth/auth.guard.ts

```ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

```

---

## src/app/core/auth/auth.service.ts

```ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'admin_token';
  private userKey = 'admin_user';

  constructor(private router: Router) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {
    const u = localStorage.getItem(this.userKey);
    return u ? JSON.parse(u) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }
}


```

---

## src/app/core/interceptors/auth.interceptor.ts

```ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        // منع تسجيل الخروج التلقائي عند أي 401.
        // سيتم التعامل مع حالات انتهاء/عدم صلاحية التوكن عبر AuthGuard أو من زر logout فقط.
        return throwError(() => error);
      })
    );
  }
}



```

---

## src/app/core/services/api.service.ts

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import * as Models from '../../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Auth
  login(body: Models.LoginRequest): Observable<Models.LoginResponse> {
    return this.http.post<Models.LoginResponse>(`${this.base}/auth/login`, body);
  }

  changePassword(body: any): Observable<any> {
    return this.http.post(`${this.base}/auth/change-password`, body);
  }

  // Hero
  getHero(): Observable<Models.HeroDto> {
    return this.http.get<Models.HeroDto>(`${this.base}/admin/hero`);
  }

  updateHero(data: Models.HeroDto): Observable<Models.HeroDto> {
    return this.http.put<Models.HeroDto>(`${this.base}/admin/hero`, data);
  }

  // Services
  getServices(): Observable<Models.ServiceDto[]> {
    return this.http.get<Models.ServiceDto[]>(`${this.base}/admin/services`);
  }

  createService(data: Models.ServiceDto): Observable<Models.ServiceDto> {
    return this.http.post<Models.ServiceDto>(`${this.base}/admin/services`, data);
  }

  updateService(id: number, data: Models.ServiceDto): Observable<Models.ServiceDto> {
    return this.http.put<Models.ServiceDto>(`${this.base}/admin/services/${id}`, data);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/services/${id}`);
  }

  // Portfolio Cases
  getCases(): Observable<Models.PortfolioCaseDto[]> {
    return this.http.get<Models.PortfolioCaseDto[]>(`${this.base}/admin/cases`);
  }

  createCase(data: Models.PortfolioCaseDto): Observable<Models.PortfolioCaseDto> {
    return this.http.post<Models.PortfolioCaseDto>(`${this.base}/admin/cases`, data);
  }

  updateCase(id: number, data: Models.PortfolioCaseDto): Observable<Models.PortfolioCaseDto> {
    return this.http.put<Models.PortfolioCaseDto>(`${this.base}/admin/cases/${id}`, data);
  }

  deleteCase(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/cases/${id}`);
  }

  // Experiences
  getExperiences(): Observable<Models.ExperienceDto[]> {
    return this.http.get<Models.ExperienceDto[]>(`${this.base}/admin/experiences`);
  }

  createExperience(data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
    return this.http.post<Models.ExperienceDto>(`${this.base}/admin/experiences`, data);
  }

  updateExperience(id: number, data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
    return this.http.put<Models.ExperienceDto>(`${this.base}/admin/experiences/${id}`, data);
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/experiences/${id}`);
  }

  // Testimonials
  getTestimonials(): Observable<Models.TestimonialDto[]> {
    return this.http.get<Models.TestimonialDto[]>(`${this.base}/admin/testimonials`);
  }

  createTestimonial(data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
    return this.http.post<Models.TestimonialDto>(`${this.base}/admin/testimonials`, data);
  }

  updateTestimonial(id: number, data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
    return this.http.put<Models.TestimonialDto>(`${this.base}/admin/testimonials/${id}`, data);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/testimonials/${id}`);
  }

  // Contact
  getContact(): Observable<Models.ContactDto> {
    return this.http.get<Models.ContactDto>(`${this.base}/admin/contact`);
  }

  updateContact(data: Models.ContactDto): Observable<Models.ContactDto> {
    return this.http.put<Models.ContactDto>(`${this.base}/admin/contact`, data);
  }

  // Settings
  getSettings(): Observable<Models.SettingsDto> {
    return this.http.get<Models.SettingsDto>(`${this.base}/admin/settings`);
  }

  updateSettings(data: Models.SettingsDto): Observable<Models.SettingsDto> {
    return this.http.put<Models.SettingsDto>(`${this.base}/admin/settings`, data);
  }
}


```

---

## src/app/core/services/toast.service.ts

```ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private subject = new Subject<ToastMessage>();
  toast$ = this.subject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'success') {
    this.subject.next({ text, type });
    setTimeout(() => this.subject.next({ text: '', type: 'info' }), 4000);
  }
}


```

---

## src/app/app.html

```html

<router-outlet />
```

---

## src/app/models/portfolio.models.ts

```ts
// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  expiresAt: Date;
}

// Hero
export interface HeroDto {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  credential1Ar: string;
  credential1En: string;
  credential2Ar: string;
  credential2En: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeExpAr: string;
  badgeExpEn: string;
  typedPhrasesAr: string[];
  typedPhrasesEn: string[];
  profileImageUrl: string;
  stat1Value: number;
  stat1LabelAr: string;
  stat1LabelEn: string;
  stat2Value: number;
  stat2LabelAr: string;
  stat2LabelEn: string;
  stat3Value: number;
  stat3LabelAr: string;
  stat3LabelEn: string;
  stat4Value: number;
  stat4LabelAr: string;
  stat4LabelEn: string;
}

// Service
export interface ServiceDto {
  id?: number;
  iconClass: string;
  cardNumber: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Portfolio
export interface PortfolioImageDto {
  id?: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PortfolioCaseDto {
  id?: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconClass: string;
  thumbnailUrl: string;
  sortOrder: number;
  isActive: boolean;
  images: PortfolioImageDto[];
}

// Experience
export interface ExperienceDto {
  id?: number;
  dateRange: string;
  iconClass: string;
  titleAr: string;
  titleEn: string;
  orgAr: string;
  orgEn: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeAr: string;
  badgeEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Testimonial
export interface TestimonialDto {
  id?: number;
  textAr: string;
  textEn: string;
  authorAr: string;
  authorEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Contact
export interface WorkingHourDto {
  id?: number;
  dayLabelAr: string;
  dayLabelEn: string;
  hoursText: string;
  sortOrder: number;
}

export interface ContactDto {
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  linkedInUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsAppUrl: string;
  workingHours: WorkingHourDto[];
}

// Settings
export interface SettingsDto {
  defaultLanguage: string;
  defaultTheme: string;
  isMaintenanceMode: boolean;
  footerTextAr: string;
  footerTextEn: string;
}
```

---

## src/app/features/login/login.component.ts

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="bg-animation">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="login-wrapper">
        <div class="login-card">
          <div class="login-header">
            <div class="logo-icon"><i class="fas fa-tooth"></i></div>
            <h1>لوحة التحكم</h1>
            <p class="subtitle">د. أحمد قنديل</p>
          </div>

          <form (ngSubmit)="login()" #f="ngForm" class="login-form">
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" [(ngModel)]="username" name="username" placeholder="اسم المستخدم" required>
            </div>

            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" [(ngModel)]="password" name="password" placeholder="كلمة المرور" required>
            </div>

            <button type="submit" class="btn-login" [disabled]="loading">
              <span *ngIf="!loading">دخول <i class="fas fa-arrow-right"></i></span>
              <span *ngIf="loading"><i class="fas fa-spinner fa-spin"></i> جاري...</span>
            </button>

            <div *ngIf="error" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ error }}
            </div>
          </form>

          <div class="login-footer">
            <span>© 2026 جميع الحقوق محفوظة</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .login-page {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0f1e;
      overflow: hidden;
      font-family: 'Cairo', sans-serif;
    }

    .bg-animation {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: floatOrb 8s ease-in-out infinite;
    }

    .orb-1 {
      width: 400px;
      height: 400px;
      background: #38bdf8;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 350px;
      height: 350px;
      background: #2dd4bf;
      bottom: -80px;
      right: -80px;
      animation-delay: -3s;
    }

    .orb-3 {
      width: 250px;
      height: 250px;
      background: #a855f7;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -5s;
    }

    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.05); }
      66% { transform: translate(-20px, 20px) scale(0.95); }
    }

    .login-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 420px;
      padding: 20px;
      animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .login-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 25px 80px rgba(0,0,0,0.6);
      transition: all 0.3s ease;
    }

    .login-card:hover {
      box-shadow: 0 30px 90px rgba(56,189,248,0.1);
      border-color: rgba(56,189,248,0.15);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-icon {
      display: inline-block;
      font-size: 2.8rem;
      color: #38bdf8;
      background: rgba(56,189,248,0.1);
      width: 70px;
      height: 70px;
      line-height: 70px;
      border-radius: 20px;
      margin-bottom: 1rem;
      animation: pulseGlow 3s ease-in-out infinite;
    }

    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.15); }
      50% { box-shadow: 0 0 40px rgba(56,189,248,0.3); }
    }

    .login-header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #f0f4f8;
      margin: 0.2rem 0;
    }

    .login-header .subtitle {
      color: #94a3b8;
      font-size: 0.9rem;
      margin: 0.2rem 0 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-group i {
      position: absolute;
      right: 14px;
      color: #64748b;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .input-group input {
      width: 100%;
      padding: 14px 45px 14px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      color: #f0f4f8;
      font-size: 1rem;
      transition: all 0.3s ease;
      outline: none;
      font-family: 'Cairo', sans-serif;
    }

    .input-group input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
      background: rgba(255,255,255,0.08);
    }

    .input-group input:focus + i,
    .input-group input:focus ~ i {
      color: #38bdf8;
    }

    .input-group input::placeholder {
      color: #64748b;
    }

    .btn-login {
      padding: 14px;
      background: linear-gradient(135deg, #38bdf8, #2dd4bf);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Cairo', sans-serif;
      margin-top: 0.5rem;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(56,189,248,0.3);
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-login i {
      font-size: 0.9rem;
    }

    .error-message {
      margin-top: 0.5rem;
      padding: 10px 14px;
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 10px;
      color: #f87171;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: shake 0.4s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }

    .login-footer {
      margin-top: 2rem;
      text-align: center;
      color: #475569;
      font-size: 0.75rem;
      border-top: 1px solid rgba(255,255,255,0.04);
      padding-top: 1.5rem;
    }

    @media (max-width: 480px) {
      .login-card { padding: 1.8rem 1.2rem; }
      .logo-icon { width: 60px; height: 60px; font-size: 2.2rem; }
      .login-header h1 { font-size: 1.4rem; }
    }
    `
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  login() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.error = '';

    this.api.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.auth.setUser({ username: res.username, role: res.role });
        this.toast.show('مرحباً بك في لوحة التحكم', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'بيانات الدخول غير صحيحة';
        this.toast.show(this.error, 'error');
      }
    });
  }
}
```

---

## src/app/features/dashboard/dashboard.component.ts

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <i class="fas fa-tooth"></i>
            <span>Admin</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="hero" routerLinkActive="active">
            <i class="fas fa-user-md"></i>
            <span>البطل</span>
          </a>
          <a routerLink="services" routerLinkActive="active">
            <i class="fas fa-concierge-bell"></i>
            <span>الخدمات</span>
          </a>
          <a routerLink="portfolio" routerLinkActive="active">
            <i class="fas fa-images"></i>
            <span>الأعمال</span>
          </a>
          <a routerLink="experiences" routerLinkActive="active">
            <i class="fas fa-history"></i>
            <span>الخبرات</span>
          </a>
          <a routerLink="testimonials" routerLinkActive="active">
            <i class="fas fa-quote-right"></i>
            <span>الشهادات</span>
          </a>
          <a routerLink="contact" routerLinkActive="active">
            <i class="fas fa-address-card"></i>
            <span>التواصل</span>
          </a>
          <a routerLink="settings" routerLinkActive="active">
            <i class="fas fa-cog"></i>
            <span>الإعدادات</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <button class="logout-btn" type="button" (click)="logout($event)">
            <i class="fas fa-sign-out-alt"></i>
            <span>خروج</span>
          </button>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div class="topbar-right">
            <span class="user-info">
              <i class="fas fa-user-circle"></i>
              {{ user?.username || 'Admin' }}
            </span>
          </div>
        </header>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>

    <div *ngIf="toastMsg.text" class="toast"
         [class.success]="toastMsg.type === 'success'"
         [class.error]="toastMsg.type === 'error'">
      {{ toastMsg.text }}
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      min-height: 100vh;
      background: var(--gray-50);
      color: var(--gray-900);
    }

    .sidebar {
      width: 260px;
      background: #ffffff;
      border-left: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      flex-shrink: 0;
      z-index: 100;
    }

    .sidebar-header {
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--gray-200);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
    }

    .logo i {
      font-size: 1.5rem;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0.75rem;
    }

    .sidebar-nav a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      color: var(--gray-600);
      text-decoration: none;
      border-radius: var(--radius);
      transition: all 0.2s;
      margin-bottom: 2px;
      font-size: 0.95rem;
    }

    .sidebar-nav a i {
      width: 20px;
      text-align: center;
      font-size: 1.1rem;
      color: var(--gray-500);
    }

    .sidebar-nav a:hover {
      background: var(--gray-100);
      color: var(--gray-900);
    }

    .sidebar-nav a.active {
      background: var(--primary);
      color: #fff;
      box-shadow: var(--shadow-md);
    }

    .sidebar-footer {
      padding: 1rem 0.75rem;
      border-top: 1px solid var(--gray-200);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.625rem 1rem;
      border: none;
      background: none;
      color: var(--danger);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.95rem;
      font-family: inherit;
      font-weight: 600;
    }

    .logout-btn i {
      width: 20px;
      text-align: center;
      font-size: 1.1rem;
    }

    .logout-btn:hover {
      background: #fef2f2;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: #fff;
      border-bottom: 1px solid var(--gray-200);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--gray-600);
      font-size: 0.95rem;
      font-weight: 600;
    }

    .user-info i {
      font-size: 1.5rem;
      color: var(--primary);
    }

    .content {
      padding: 1.5rem 2rem 2rem;
      flex: 1;
    }

    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      color: white;
      font-size: 0.9rem;
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      max-width: 450px;
      background: var(--gray-900);
    }

    .toast.success {
      background: var(--secondary);
    }

    .toast.error {
      background: var(--danger);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class DashboardComponent {
  user: any = null;
  toastMsg: { text: string; type: string } = { text: '', type: 'success' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.toast.toast$.subscribe((msg) => (this.toastMsg = msg));
  }

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
  }
}
```

---

## src/app/features/dashboard/hero/hero.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { HeroDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>تعديل قسم البطل (Hero)</h2>
    <form (ngSubmit)="save()" #f="ngForm" class="crud-form">
      <div class="row">
        <div class="col"><label>الاسم (عربي)</label><input [(ngModel)]="data.nameAr" name="nameAr"></div>
        <div class="col"><label>الاسم (إنجليزي)</label><input [(ngModel)]="data.nameEn" name="nameEn"></div>
      </div>
      <div class="row">
        <div class="col"><label>العنوان (عربي)</label><input [(ngModel)]="data.titleAr" name="titleAr"></div>
        <div class="col"><label>العنوان (إنجليزي)</label><input [(ngModel)]="data.titleEn" name="titleEn"></div>
      </div>
      <div class="row">
        <div class="col"><label>الوصف (عربي)</label><textarea [(ngModel)]="data.descriptionAr" name="descriptionAr" rows="3"></textarea></div>
        <div class="col"><label>الوصف (إنجليزي)</label><textarea [(ngModel)]="data.descriptionEn" name="descriptionEn" rows="3"></textarea></div>
      </div>
      <div class="row">
        <div class="col"><label>صورة الملف الشخصي</label><input [(ngModel)]="data.profileImageUrl" name="profileImageUrl"></div>
        <div class="col"><label>سنوات الخبرة (النص)</label><input [(ngModel)]="data.badgeExpAr" name="badgeExpAr"></div>
      </div>

      <h4>الإحصائيات</h4>
      <div class="row">
      <div class="col"><label>Stat1</label><input type="number" [(ngModel)]="data.stat1Value" name="stat1Value"> <input [(ngModel)]="data.stat1LabelAr" name="stat1LabelAr" placeholder="عربي"></div>
<div class="col"><label>Stat2</label><input type="number" [(ngModel)]="data.stat2Value" name="stat2Value"> <input [(ngModel)]="data.stat2LabelAr" name="stat2LabelAr" placeholder="عربي"></div>
<div class="col"><label>Stat3</label><input type="number" [(ngModel)]="data.stat3Value" name="stat3Value"> <input [(ngModel)]="data.stat3LabelAr" name="stat3LabelAr" placeholder="عربي"></div>
<div class="col"><label>Stat4</label><input type="number" [(ngModel)]="data.stat4Value" name="stat4Value"> <input [(ngModel)]="data.stat4LabelAr" name="stat4LabelAr" placeholder="عربي"></div>
</div>

      <button type="submit" class="btn-save">حفظ التغييرات</button>
    </form>
  `,
  styles: [
    `
    .crud-form { background: rgba(255,255,255,0.04); padding: 2rem; border-radius: 12px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .col { display: flex; flex-direction: column; }
    label { font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px; }
    input, textarea { padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .btn-save { background: #38bdf8; border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; }
    h2 { margin-bottom: 1.5rem; }
    h4 { margin: 1rem 0; color: #94a3b8; }
    `
  ]
})
export class HeroComponent implements OnInit {
  data: HeroDto = {} as HeroDto;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.api.getHero().subscribe((d) => (this.data = d));
  }

  save() {
    this.api.updateHero(this.data).subscribe({
      next: () => this.toast.show('تم حفظ البطل بنجاح', 'success'),
      error: () => this.toast.show('حدث خطأ', 'error')
    });
  }
}
```

---

## src/app/features/dashboard/services/services.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { ServiceDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>إدارة الخدمات</h2>
    <button class="btn-add" (click)="edit(null)">+ إضافة خدمة</button>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>العنوان (عربي)</th>
          <th>الوصف</th>
          <th>حالة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of list">
          <td>{{ item.cardNumber }}</td>
          <td>{{ item.titleAr }}</td>
          <td>{{ item.descriptionAr }}</td>
          <td>
            <span class="badge" [class.active]="item.isActive">
              {{ item.isActive ? 'نشط' : 'غير نشط' }}
            </span>
          </td>
          <td>
            <button (click)="edit(item)">تعديل</button>
            <button class="del" (click)="delete(item.id!)">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" *ngIf="editing">
      <div class="modal-content">
        <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} خدمة</h3>

        <label>الرقم (Card)</label>
        <input [(ngModel)]="editing.cardNumber">

        <label>الأيقونة (Class)</label>
        <input [(ngModel)]="editing.iconClass">

        <label>العنوان (عربي)</label>
        <input [(ngModel)]="editing.titleAr">

        <label>العنوان (إنجليزي)</label>
        <input [(ngModel)]="editing.titleEn">

        <label>الوصف (عربي)</label>
        <textarea [(ngModel)]="editing.descriptionAr"></textarea>

        <label>الوصف (إنجليزي)</label>
        <textarea [(ngModel)]="editing.descriptionEn"></textarea>

        <label>الترتيب</label>
        <input type="number" [(ngModel)]="editing.sortOrder">

        <label>
          <input type="checkbox" [(ngModel)]="editing.isActive"> نشط
        </label>

        <div class="actions">
          <button (click)="save()">حفظ</button>
          <button class="del" (click)="editing=null">إلغاء</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .table th, .table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; }
    .btn-add { background: #2dd4bf; border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer; }
    .badge { padding: 4px 12px; border-radius: 20px; background: #475569; font-size: 0.8rem; }
    .badge.active { background: #10b981; }
    button { background: #38bdf8; border: none; padding: 4px 12px; border-radius: 4px; color: white; cursor: pointer; margin: 0 4px; }
    .del { background: #ef4444; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: #1e293b; padding: 2rem; border-radius: 12px; width: 500px; max-height: 90vh; overflow-y: auto; }
    .modal-content label { display: block; margin: 8px 0 4px; color: #94a3b8; }
    .modal-content input, .modal-content textarea { width: 100%; padding: 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .actions { display: flex; gap: 8px; margin-top: 1rem; justify-content: flex-end; }
    `
  ]
})
export class ServicesComponent implements OnInit {
  list: ServiceDto[] = [];
  editing: ServiceDto | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getServices().subscribe((d) => (this.list = d));
  }

  edit(item: ServiceDto | null) {
    this.editing = item
      ? { ...item }
      : ({ iconClass: 'fas fa-tooth', cardNumber: '01', sortOrder: 0, isActive: true } as ServiceDto);
  }

  save() {
    if (!this.editing) return;

    const obs = this.editing.id
      ? this.api.updateService(this.editing.id, this.editing)
      : this.api.createService(this.editing);

    obs.subscribe({
      next: () => {
        this.toast.show('تم الحفظ');
        this.editing = null;
        this.load();
      },
      error: () => this.toast.show('خطأ', 'error')
    });
  }

  delete(id: number) {
    if (confirm('تأكيد الحذف؟')) {
      this.api.deleteService(id).subscribe(() => {
        this.toast.show('تم الحذف');
        this.load();
      });
    }
  }
}
```

---

## src/app/features/dashboard/portfolio/portfolio.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { PortfolioCaseDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>إدارة الأعمال</h2>
    <button class="btn-add" (click)="edit(null)">+ إضافة عمل</button>

    <table class="table">
      <thead>
        <tr>
          <th>العنوان (عربي)</th>
          <th>الوصف</th>
          <th>عدد الصور</th>
          <th>حالة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of list">
          <td>{{ item.titleAr }}</td>
          <td>{{ item.subtitleAr }}</td>
          <td>{{ item.images?.length || 0 }}</td>
          <td>
            <span class="badge" [class.active]="item.isActive">
              {{ item.isActive ? 'نشط' : 'غير نشط' }}
            </span>
          </td>
          <td>
            <button (click)="edit(item)">تعديل</button>
            <button class="del" (click)="delete(item.id!)">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" *ngIf="editing">
      <div class="modal-content">
        <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} عمل</h3>

        <label>العنوان (عربي)</label>
        <input [(ngModel)]="editing.titleAr">

        <label>العنوان (إنجليزي)</label>
        <input [(ngModel)]="editing.titleEn">

        <label>الوصف (عربي)</label>
        <input [(ngModel)]="editing.subtitleAr">

        <label>الوصف (إنجليزي)</label>
        <input [(ngModel)]="editing.subtitleEn">

        <label>الأيقونة (Class)</label>
        <input [(ngModel)]="editing.iconClass">

        <label>رابط الصورة المصغرة</label>
        <input [(ngModel)]="editing.thumbnailUrl">

        <label>الترتيب</label>
        <input type="number" [(ngModel)]="editing.sortOrder">

        <label>
          <input type="checkbox" [(ngModel)]="editing.isActive"> نشط
        </label>

        <h4>الصور</h4>
        <div *ngFor="let img of editing.images; let i=index">
          <div style="display:flex; gap:8px; margin-bottom:4px;">
            <input [(ngModel)]="img.imageUrl" placeholder="رابط الصورة" style="flex:1;">
            <input type="number" [(ngModel)]="img.sortOrder" placeholder="ترتيب" style="width:60px;">
            <button class="del" (click)="removeImage(i)">×</button>
          </div>
        </div>

        <button (click)="addImage()">+ إضافة صورة</button>

        <div class="actions">
          <button (click)="save()">حفظ</button>
          <button class="del" (click)="editing=null">إلغاء</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .table th, .table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; }
    .btn-add { background: #2dd4bf; border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer; }
    .badge { padding: 4px 12px; border-radius: 20px; background: #475569; font-size: 0.8rem; }
    .badge.active { background: #10b981; }
    button { background: #38bdf8; border: none; padding: 4px 12px; border-radius: 4px; color: white; cursor: pointer; margin: 0 4px; }
    .del { background: #ef4444; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: #1e293b; padding: 2rem; border-radius: 12px; width: 600px; max-height: 90vh; overflow-y: auto; }
    .modal-content label { display: block; margin: 8px 0 4px; color: #94a3b8; }
    .modal-content input, .modal-content textarea { width: 100%; padding: 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .actions { display: flex; gap: 8px; margin-top: 1rem; justify-content: flex-end; }
    h4 { margin: 1rem 0 0.5rem; color: #94a3b8; }
    `
  ]
})
export class PortfolioComponent implements OnInit {
  list: PortfolioCaseDto[] = [];
  editing: PortfolioCaseDto | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getCases().subscribe((d) => (this.list = d));
  }

  edit(item: PortfolioCaseDto | null) {
    this.editing = item
      ? { ...item, images: item.images ? [...item.images] : [] }
      : ({
          titleAr: '',
          titleEn: '',
          subtitleAr: '',
          subtitleEn: '',
          iconClass: 'fas fa-tooth',
          thumbnailUrl: '',
          sortOrder: 0,
          isActive: true,
          images: []
        } as PortfolioCaseDto);
  }

  addImage() {
    if (!this.editing) return;
    this.editing.images.push({ imageUrl: '', sortOrder: this.editing.images.length + 1 });
  }

  removeImage(index: number) {
    if (!this.editing) return;
    this.editing.images.splice(index, 1);
  }

  save() {
    if (!this.editing) return;

    const obs = this.editing.id
      ? this.api.updateCase(this.editing.id, this.editing)
      : this.api.createCase(this.editing);

    obs.subscribe({
      next: () => {
        this.toast.show('تم الحفظ');
        this.editing = null;
        this.load();
      },
      error: () => this.toast.show('خطأ', 'error')
    });
  }

  delete(id: number) {
    if (confirm('تأكيد الحذف؟')) {
      this.api.deleteCase(id).subscribe(() => {
        this.toast.show('تم الحذف');
        this.load();
      });
    }
  }
}
```

---

## src/app/features/dashboard/experiences/experiences.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { ExperienceDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>إدارة الخبرات</h2>
    <button class="btn-add" (click)="edit(null)">+ إضافة خبرة</button>

    <table class="table">
      <thead>
        <tr>
          <th>الفترة</th>
          <th>العنوان (عربي)</th>
          <th>الجهة</th>
          <th>حالة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of list">
          <td>{{ item.dateRange }}</td>
          <td>{{ item.titleAr }}</td>
          <td>{{ item.orgAr }}</td>
          <td>
            <span class="badge" [class.active]="item.isActive">
              {{ item.isActive ? 'نشط' : 'غير نشط' }}
            </span>
          </td>
          <td>
            <button (click)="edit(item)">تعديل</button>
            <button class="del" (click)="delete(item.id!)">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" *ngIf="editing">
      <div class="modal-content">
        <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} خبرة</h3>

        <label>الفترة</label><input [(ngModel)]="editing.dateRange">
        <label>الأيقونة (Class)</label><input [(ngModel)]="editing.iconClass">
        <label>العنوان (عربي)</label><input [(ngModel)]="editing.titleAr">
        <label>العنوان (إنجليزي)</label><input [(ngModel)]="editing.titleEn">
        <label>الجهة (عربي)</label><input [(ngModel)]="editing.orgAr">
        <label>الجهة (إنجليزي)</label><input [(ngModel)]="editing.orgEn">

        <label>الوصف (عربي)</label><textarea [(ngModel)]="editing.descriptionAr"></textarea>
        <label>الوصف (إنجليزي)</label><textarea [(ngModel)]="editing.descriptionEn"></textarea>

        <label>الشارة (عربي)</label><input [(ngModel)]="editing.badgeAr">
        <label>الشارة (إنجليزي)</label><input [(ngModel)]="editing.badgeEn">

        <label>الترتيب</label><input type="number" [(ngModel)]="editing.sortOrder">
        <label><input type="checkbox" [(ngModel)]="editing.isActive"> نشط</label>

        <div class="actions">
          <button (click)="save()">حفظ</button>
          <button class="del" (click)="editing=null">إلغاء</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .table th, .table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; }
    .btn-add { background: #2dd4bf; border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer; }
    .badge { padding: 4px 12px; border-radius: 20px; background: #475569; font-size: 0.8rem; }
    .badge.active { background: #10b981; }
    button { background: #38bdf8; border: none; padding: 4px 12px; border-radius: 4px; color: white; cursor: pointer; margin: 0 4px; }
    .del { background: #ef4444; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: #1e293b; padding: 2rem; border-radius: 12px; width: 500px; max-height: 90vh; overflow-y: auto; }
    .modal-content label { display: block; margin: 8px 0 4px; color: #94a3b8; }
    .modal-content input, .modal-content textarea { width: 100%; padding: 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .actions { display: flex; gap: 8px; margin-top: 1rem; justify-content: flex-end; }
    `
  ]
})
export class ExperiencesComponent implements OnInit {
  list: ExperienceDto[] = [];
  editing: ExperienceDto | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getExperiences().subscribe((d) => (this.list = d));
  }

  edit(item: ExperienceDto | null) {
    this.editing = item
      ? { ...item }
      : ({ dateRange: '', iconClass: 'fas fa-tooth', sortOrder: 0, isActive: true } as ExperienceDto);
  }

  save() {
    if (!this.editing) return;

    const obs = this.editing.id
      ? this.api.updateExperience(this.editing.id, this.editing)
      : this.api.createExperience(this.editing);

    obs.subscribe({
      next: () => {
        this.toast.show('تم الحفظ');
        this.editing = null;
        this.load();
      },
      error: () => this.toast.show('خطأ', 'error')
    });
  }

  delete(id: number) {
    if (confirm('تأكيد الحذف؟')) {
      this.api.deleteExperience(id).subscribe(() => {
        this.toast.show('تم الحذف');
        this.load();
      });
    }
  }
}
```

---

## src/app/features/dashboard/testimonials/testimonials.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { TestimonialDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>إدارة الشهادات</h2>
    <button class="btn-add" (click)="edit(null)">+ إضافة شهادة</button>

    <table class="table">
      <thead>
        <tr>
          <th>النص (عربي)</th>
          <th>الاسم</th>
          <th>حالة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of list">
          <td>{{ item.textAr.substring(0, 30) }}...</td>
          <td>{{ item.authorAr }}</td>
          <td>
            <span class="badge" [class.active]="item.isActive">
              {{ item.isActive ? 'نشط' : 'غير نشط' }}
            </span>
          </td>
          <td>
            <button (click)="edit(item)">تعديل</button>
            <button class="del" (click)="delete(item.id!)">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" *ngIf="editing">
      <div class="modal-content">
        <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} شهادة</h3>

        <label>النص (عربي)</label><textarea [(ngModel)]="editing.textAr"></textarea>
        <label>النص (إنجليزي)</label><textarea [(ngModel)]="editing.textEn"></textarea>

        <label>الاسم (عربي)</label><input [(ngModel)]="editing.authorAr">
        <label>الاسم (إنجليزي)</label><input [(ngModel)]="editing.authorEn">

        <label>الترتيب</label><input type="number" [(ngModel)]="editing.sortOrder">
        <label><input type="checkbox" [(ngModel)]="editing.isActive"> نشط</label>

        <div class="actions">
          <button (click)="save()">حفظ</button>
          <button class="del" (click)="editing=null">إلغاء</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .table th, .table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; }
    .btn-add { background: #2dd4bf; border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer; }
    .badge { padding: 4px 12px; border-radius: 20px; background: #475569; font-size: 0.8rem; }
    .badge.active { background: #10b981; }
    button { background: #38bdf8; border: none; padding: 4px 12px; border-radius: 4px; color: white; cursor: pointer; margin: 0 4px; }
    .del { background: #ef4444; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: #1e293b; padding: 2rem; border-radius: 12px; width: 500px; max-height: 90vh; overflow-y: auto; }
    .modal-content label { display: block; margin: 8px 0 4px; color: #94a3b8; }
    .modal-content input, .modal-content textarea { width: 100%; padding: 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .actions { display: flex; gap: 8px; margin-top: 1rem; justify-content: flex-end; }
    `
  ]
})
export class TestimonialsComponent implements OnInit {
  list: TestimonialDto[] = [];
  editing: TestimonialDto | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getTestimonials().subscribe((d) => (this.list = d));
  }

  edit(item: TestimonialDto | null) {
    this.editing = item ? { ...item } : ({ sortOrder: 0, isActive: true } as TestimonialDto);
  }

  save() {
    if (!this.editing) return;

    const obs = this.editing.id
      ? this.api.updateTestimonial(this.editing.id, this.editing)
      : this.api.createTestimonial(this.editing);

    obs.subscribe({
      next: () => {
        this.toast.show('تم الحفظ');
        this.editing = null;
        this.load();
      },
      error: () => this.toast.show('خطأ', 'error')
    });
  }

  delete(id: number) {
    if (confirm('تأكيد الحذف؟')) {
      this.api.deleteTestimonial(id).subscribe(() => {
        this.toast.show('تم الحذف');
        this.load();
      });
    }
  }
}
```

---

## src/app/features/dashboard/contact/contact.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { ContactDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>تعديل معلومات التواصل</h2>

    <form (ngSubmit)="save()" #f="ngForm" class="crud-form">
      <div class="row">
        <div class="col">
          <label>الهاتف</label>
          <input [(ngModel)]="data.phone" name="phone">
        </div>
        <div class="col">
          <label>البريد الإلكتروني</label>
          <input [(ngModel)]="data.email" name="email">
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label>العنوان (عربي)</label>
          <input [(ngModel)]="data.addressAr" name="addressAr">
        </div>
        <div class="col">
          <label>العنوان (إنجليزي)</label>
          <input [(ngModel)]="data.addressEn" name="addressEn">
        </div>
      </div>

      <h4>روابط التواصل الاجتماعي</h4>
      <div class="row">
        <div class="col">
          <label>LinkedIn</label>
          <input [(ngModel)]="data.linkedInUrl" name="linkedInUrl">
        </div>
        <div class="col">
          <label>Instagram</label>
          <input [(ngModel)]="data.instagramUrl" name="instagramUrl">
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label>Facebook</label>
          <input [(ngModel)]="data.facebookUrl" name="facebookUrl">
        </div>
        <div class="col">
          <label>WhatsApp</label>
          <input [(ngModel)]="data.whatsAppUrl" name="whatsAppUrl">
        </div>
      </div>

      <h4>ساعات العمل</h4>
      <div *ngFor="let hour of data.workingHours; let i=index" style="display:flex; gap:8px; margin-bottom:8px;">
      <input [(ngModel)]="hour.dayLabelAr" [name]="'dayLabelAr' + i" placeholder="اليوم (عربي)" style="flex:1;">
<input [(ngModel)]="hour.dayLabelEn" [name]="'dayLabelEn' + i" placeholder="اليوم (إنجليزي)" style="flex:1;">
<input [(ngModel)]="hour.hoursText" [name]="'hoursText' + i" placeholder="الوقت" style="flex:1;">
<input type="number" [(ngModel)]="hour.sortOrder" [name]="'sortOrder' + i" placeholder="ترتيب" style="width:60px;">
        <button class="del" (click)="removeHour(i)">×</button>
      </div>

      <button type="button" (click)="addHour()">+ إضافة ساعة</button>

      <button type="submit" class="btn-save">حفظ التغييرات</button>
    </form>
  `,
  styles: [
    `
    .crud-form { background: rgba(255,255,255,0.04); padding: 2rem; border-radius: 12px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .col { display: flex; flex-direction: column; }
    label { font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px; }
    input, textarea { padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .btn-save { background: #38bdf8; border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; margin-top: 1rem; }
    h2 { margin-bottom: 1.5rem; }
    h4 { margin: 1rem 0; color: #94a3b8; }
    .del { background: #ef4444; border: none; color: white; padding: 0 8px; border-radius: 4px; cursor: pointer; }
    `
  ]
})
export class ContactComponent implements OnInit {
  data: ContactDto = {
    phone: '',
    email: '',
    addressAr: '',
    addressEn: '',
    linkedInUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    whatsAppUrl: '',
    workingHours: []
  };

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.api.getContact().subscribe((d) => (this.data = d));
  }

  addHour() {
    this.data.workingHours.push({ dayLabelAr: '', dayLabelEn: '', hoursText: '', sortOrder: this.data.workingHours.length + 1 });
  }

  removeHour(index: number) {
    this.data.workingHours.splice(index, 1);
  }

  save() {
    this.api.updateContact(this.data).subscribe({
      next: () => this.toast.show('تم حفظ التواصل', 'success'),
      error: () => this.toast.show('خطأ', 'error')
    });
  }
}
```

---

## src/app/features/dashboard/settings/settings.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { SettingsDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>الإعدادات العامة</h2>

    <form (ngSubmit)="save()" #f="ngForm" class="crud-form">
      <div class="row">
        <div class="col">
          <label>اللغة الافتراضية</label>
          <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage">
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <div class="col">
          <label>الثيم الافتراضي</label>
          <select [(ngModel)]="data.defaultTheme" name="defaultTheme">
            <option value="dark">داكن</option>
            <option value="light">فاتح</option>
            <option value="blue">أزرق</option>
            <option value="royal">ملكي</option>
            <option value="midnight">منتصف الليل</option>
            <option value="emerald">زمردي</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label>نص التذييل (عربي)</label>
          <input [(ngModel)]="data.footerTextAr" name="footerTextAr">
        </div>
        <div class="col">
          <label>نص التذييل (إنجليزي)</label>
          <input [(ngModel)]="data.footerTextEn" name="footerTextEn">
        </div>
      </div>

      <div>
        <label>
          <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
          وضع الصيانة
        </label>
      </div>

      <button type="submit" class="btn-save">حفظ الإعدادات</button>
    </form>
  `,
  styles: [
    `
    .crud-form { background: rgba(255,255,255,0.04); padding: 2rem; border-radius: 12px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .col { display: flex; flex-direction: column; }
    label { font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px; }
    input, select { padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; }
    .btn-save { background: #38bdf8; border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; margin-top: 1rem; }
    h2 { margin-bottom: 1.5rem; }
    `
  ]
})
export class SettingsComponent implements OnInit {
  data: SettingsDto = {
    defaultLanguage: 'ar',
    defaultTheme: 'dark',
    isMaintenanceMode: false,
    footerTextAr: '',
    footerTextEn: ''
  };

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.api.getSettings().subscribe((d) => (this.data = d));
  }

  save() {
    this.api.updateSettings(this.data).subscribe({
      next: () => this.toast.show('تم حفظ الإعدادات', 'success'),
      error: () => this.toast.show('خطأ', 'error')
    });
  }
}
```

---






