// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
// import { tap } from 'rxjs/operators';

// import { ApiService } from './api.service';
// import * as Models from '../../models/portfolio.models';

// /**
//  * Loads every dashboard section's data ONE TIME (right after login) and
//  * caches it in BehaviorSubjects. Every feature component reads from here
//  * instead of calling the API again on its own ngOnInit — so the moment the
//  * user reaches any page, the data is already sitting in memory and renders
//  * immediately without waiting for a fresh HTTP round trip or an extra click.
//  */
// @Injectable({ providedIn: 'root' })
// export class DashboardDataService {
//   hero$ = new BehaviorSubject<Models.HeroDto | null>(null);
//   // معاينة فورية للصورة الشخصية أول ما تُختار (قبل الحفظ) — عشان لوجو
//   // السايدبار (وأي مكان تاني بيعرض نفس الصورة) يتحدث فورًا من غير ما ننتظر save().
//   profileImagePreview$ = new BehaviorSubject<string | null>(null);
//   services$ = new BehaviorSubject<Models.ServiceDto[]>([]);
//   cases$ = new BehaviorSubject<Models.PortfolioCaseDto[]>([]);
//   experiences$ = new BehaviorSubject<Models.ExperienceDto[]>([]);
//   testimonials$ = new BehaviorSubject<Models.TestimonialDto[]>([]);
//   contact$ = new BehaviorSubject<Models.ContactDto | null>(null);
// settings$ = new BehaviorSubject<SettingsDto | null>(null);

//   loaded = false;
//   loading = false;

//   constructor(private api: ApiService) {}

//   /** Call this once, right after a successful login. */
//   loadAll(): Observable<any> {
//     this.loading = true;
//     return forkJoin({
//       hero: this.api.getHero(),
//       services: this.api.getServices(),
//       cases: this.api.getCases(),
//       experiences: this.api.getExperiences(),
//       testimonials: this.api.getTestimonials(),
//       contact: this.api.getContact(),
//       settings: this.api.getSettings()
//     }).pipe(
//       tap((r) => {
//         this.hero$.next(r.hero);
//         this.services$.next(r.services);
//         this.cases$.next(r.cases);
//         this.experiences$.next(r.experiences);
//         this.testimonials$.next(r.testimonials);
//         this.contact$.next(r.contact);
//         this.settings$.next(r.settings);
//         this.loaded = true;
//         this.loading = false;
//       })
//     );
//   }

//   /** Call after any create/update/delete so every open tab/page stays in sync. */
//   refreshHero() {
//     this.api.getHero().subscribe((d) => this.hero$.next(d));
//   }
//   refreshServices() {
//     this.api.getServices().subscribe((d) => this.services$.next(d));
//   }
//   refreshCases() {
//     this.api.getCases().subscribe((d) => this.cases$.next(d));
//   }
//   refreshExperiences() {
//     this.api.getExperiences().subscribe((d) => this.experiences$.next(d));
//   }
//   refreshTestimonials() {
//     this.api.getTestimonials().subscribe((d) => this.testimonials$.next(d));
//   }
//   refreshContact() {
//     this.api.getContact().subscribe((d) => this.contact$.next(d));
//   }
//   refreshSettings() {
//     this.api.getSettings().subscribe((d) => this.settings$.next(d));
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import * as Models from '../../models/portfolio.models';
import { SettingsDto } from '../../models/portfolio.models';

/**
 * Loads every dashboard section's data ONE TIME (right after login) and
 * caches it in BehaviorSubjects. Every feature component reads from here
 * instead of calling the API again on its own ngOnInit — so the moment the
 * user reaches any page, the data is already sitting in memory and renders
 * immediately without waiting for a fresh HTTP round trip or an extra click.
 */
@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  hero$ = new BehaviorSubject<Models.HeroDto | null>(null);
  profileImagePreview$ = new BehaviorSubject<string | null>(null);
  services$ = new BehaviorSubject<Models.ServiceDto[]>([]);
  cases$ = new BehaviorSubject<Models.PortfolioCaseDto[]>([]);
  experiences$ = new BehaviorSubject<Models.ExperienceDto[]>([]);
  testimonials$ = new BehaviorSubject<Models.TestimonialDto[]>([]);
  contact$ = new BehaviorSubject<Models.ContactDto | null>(null);
  settings$ = new BehaviorSubject<SettingsDto | null>(null);

  loaded = false;
  loading = false;

  constructor(private api: ApiService) {}

  /** Call this once, right after a successful login. */
  loadAll(): Observable<any> {
    this.loading = true;
    return forkJoin({
      hero: this.api.getHero(),
      services: this.api.getServices(),
      cases: this.api.getCases(),
      experiences: this.api.getExperiences(),
      testimonials: this.api.getTestimonials(),
      contact: this.api.getContact(),
      settings: this.api.getSettings()
    }).pipe(
      tap((r) => {
        this.hero$.next(r.hero);
        this.services$.next(r.services);
        this.cases$.next(r.cases);
        this.experiences$.next(r.experiences);
        this.testimonials$.next(r.testimonials);
        this.contact$.next(r.contact);
        this.settings$.next(r.settings);
        this.loaded = true;
        this.loading = false;
      })
    );
  }

  /** Call after any create/update/delete so every open tab/page stays in sync. */
  refreshHero() {
    this.api.getHero().subscribe((d) => this.hero$.next(d));
  }
  refreshServices() {
    this.api.getServices().subscribe((d) => this.services$.next(d));
  }
  refreshCases() {
    this.api.getCases().subscribe((d) => this.cases$.next(d));
  }
  refreshExperiences() {
    this.api.getExperiences().subscribe((d) => this.experiences$.next(d));
  }
  refreshTestimonials() {
    this.api.getTestimonials().subscribe((d) => this.testimonials$.next(d));
  }
  refreshContact() {
    this.api.getContact().subscribe((d) => this.contact$.next(d));
  }
  refreshSettings() {
    this.api.getSettings().subscribe((d) => this.settings$.next(d));
  }
}