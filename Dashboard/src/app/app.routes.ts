// import { Routes } from '@angular/router';

// import { LoginComponent } from './features/login/login.component';
// import { DashboardComponent } from './features/dashboard/dashboard.component';
// import { HeroComponent } from './features/dashboard/hero/hero.component';
// import { ServicesComponent } from './features/dashboard/services/services.component';
// import { PortfolioComponent } from './features/dashboard/portfolio/portfolio.component';
// import { ExperiencesComponent } from './features/dashboard/experiences/experiences.component';
// import { TestimonialsComponent } from './features/dashboard/testimonials/testimonials.component';
// import { ContactComponent } from './features/dashboard/contact/contact.component';
// import { SettingsComponent } from './features/dashboard/settings/settings.component';

// import { AuthGuard } from './core/auth/auth.guard';

// import { HomeComponent } from './features/home/home.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent, pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },

//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', redirectTo: 'hero', pathMatch: 'full' },
//       { path: 'hero', component: HeroComponent },
//       { path: 'services', component: ServicesComponent },
//       { path: 'portfolio', component: PortfolioComponent },
//       { path: 'experiences', component: ExperiencesComponent },
//       { path: 'testimonials', component: TestimonialsComponent },
//       { path: 'contact', component: ContactComponent },
//       { path: 'settings', component: SettingsComponent }
//     ]
//   },
//   { path: '**', redirectTo: 'login' }
// ];

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
  // أول ما حد يفتح الرابط الأساسي (بدون أي مسار)، بنوجهه على طول لصفحة
  // تسجيل الدخول. لو هو مسجل دخول بالفعل، الـ AuthGuard هيسمحله يدخل
  // للداشبورد مباشرة أول ما يحاول (بدل ما يشوف صفحة HomeComponent التجريبية).
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