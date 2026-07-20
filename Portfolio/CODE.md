# CODE.md

> تم إنشاء هذا الملف تلقائيًا لعرض كود المشروع بصيغة Markdown.

## src/main.ts
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

## src/app/app.config.ts
```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()
  ]
};
```

## src/app/app.component.ts
```ts
import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PortfolioDataService } from './core/services/portfolio-data.service';
import {
  ContactMessagePayload,
  PublicPortfolioData
} from './core/models/portfolio.models';

import { environment } from '../environments/environment';


type Lang = 'ar' | 'en';

// نصوص واجهة ثابتة (زرار، تلميحات، حقول الفورم...) مش بيانات من الداتا بيز.
// كل محتوى البورتفوليو الفعلي (الهيرو، الخدمات، الأعمال، الخبرات، الشهادات، التواصل) بييجي من الباك اند.
const UI_TEXT: Record<Lang, Record<string, string>> = {
  ar: {
    nav_about: 'نبذة', nav_services: 'الخدمات', nav_portfolio: 'أعمالي',
    nav_experience: 'الخبرات', nav_contact: 'اتصل',
    badge_available: 'متاح للاستشارات',
    hero_btn1: 'استعرض أعمالي', hero_btn2: 'احجز موعداً',
    tip1: 'فحص دوري كل 6 أشهر', tip2: 'تنظيف الأسنان مرتين يومياً', tip3: 'ابتسامتك تهمنا',
    services_title_prefix: 'خدماتي', services_title_highlight: 'الطبية',
    services_subtitle: 'أحدث التقنيات في تجميل وزراعة الأسنان',
    portfolio_title_prefix: 'أعمالي', portfolio_title_highlight: 'المميزة',
    portfolio_subtitle: 'نماذج من حالاتي الناجحة', click_preview: 'معاينة',
    exp_title_prefix: 'السيرة', exp_title_highlight: 'الذاتية', exp_subtitle: 'الخبرات والمؤهلات العلمية',
    test_title_prefix: 'آراء', test_title_highlight: 'المرضى', test_subtitle: 'ما يقوله من عالجتهم',
    contact_title_prefix: 'تواصل', contact_title_highlight: 'معي', contact_subtitle: 'للاستشارات وحجز المواعيد',
    contact_info_title: 'لنصنع ابتسامتك', contact_info_desc: 'أنا هنا للإجابة على استفساراتك وتقديم استشارة مجانية.',
    clinic_hours_title: 'ساعات العمل',
    form_name: 'الاسم بالكامل', form_email: 'البريد الإلكتروني', form_phone: 'رقم الهاتف',
    form_message: 'نوع الخدمة أو الاستفسار...', form_submit: 'احجز موعدك الآن',
    modal_title_word: 'معرض', modal_subtitle: 'اضغط على أي صورة لتكبيرها',
    footer_sub: 'استشاري تجميل وزراعة الأسنان | BDS, MSc',
    toast_fill_required: '⚠️ الرجاء ملء جميع الحقول المطلوبة.',
    toast_sent: '✅ تم استلام طلبك! سأتواصل معك خلال 24 ساعة.',
    toast_error: '⚠️ حدث خطأ أثناء الإرسال، حاول مرة أخرى.',
    images_suffix: 'صورة'
  },
  en: {
    nav_about: 'About', nav_services: 'Services', nav_portfolio: 'Portfolio',
    nav_experience: 'Experience', nav_contact: 'Contact',
    badge_available: 'Available for consultations',
    hero_btn1: 'View My Work', hero_btn2: 'Book Appointment',
    tip1: 'Check-up every 6 months', tip2: 'Brush teeth twice daily', tip3: 'Your smile matters',
    services_title_prefix: 'My', services_title_highlight: 'Medical Services',
    services_subtitle: 'Latest technologies in cosmetic and dental implantology',
    portfolio_title_prefix: 'My', portfolio_title_highlight: 'Portfolio',
    portfolio_subtitle: 'Samples of my successful cases', click_preview: 'Preview',
    exp_title_prefix: 'My', exp_title_highlight: 'Resume', exp_subtitle: 'Experience & Qualifications',
    test_title_prefix: 'Patient', test_title_highlight: 'Testimonials', test_subtitle: 'What they say about my work',
    contact_title_prefix: 'Get in', contact_title_highlight: 'Touch', contact_subtitle: 'For consultations and appointments',
    contact_info_title: "Let's design your smile", contact_info_desc: 'I am here to answer your questions and provide a free consultation.',
    clinic_hours_title: 'Working Hours',
    form_name: 'Full Name', form_email: 'Email Address', form_phone: 'Phone Number',
    form_message: 'Service type or inquiry...', form_submit: 'Book Your Appointment Now',
    modal_title_word: 'Gallery', modal_subtitle: 'Click on any image to enlarge',
    footer_sub: 'Consultant in Cosmetic & Dental Implantology | BDS, MSc',
    toast_fill_required: '⚠️ Please fill in all required fields.',
    toast_sent: '✅ Your request has been received! I will contact you within 24 hours.',
    toast_error: '⚠️ Something went wrong, please try again.',
    images_suffix: 'images'
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  // ---------- Data from backend ----------
  data: PublicPortfolioData | null = null;
  loading = true;
  loadError = false;

  // ---------- Language / theme ----------
  lang: Lang = (localStorage.getItem('lang') as Lang) || 'ar';
  theme = localStorage.getItem('theme') || 'dark';
  themeMenuOpen = false;

  // ---------- Mobile menu ----------
  mobileMenuOpen = false;

  // ---------- Typing effect ----------
  typedText = '';
  private typingTimeout: any = null;

  // ---------- Modal / lightbox ----------
  modalOpen = false;
  modalCaseIndex: number | null = null;
  lightboxOpen = false;
  lightboxImages: string[] = [];
  lightboxIndex = 0;

  // ---------- Contact form ----------
  contactName = '';
  contactEmail = '';
  contactPhone = '';
  contactMessage = '';
  sending = false;

  // ---------- Toast ----------
  toastText = '';
  toastType: 'success' | 'error' = 'success';
  toastShow = false;
  private toastTimeout: any = null;

  // ---------- Custom cursor ----------
  @ViewChild('cursorEl') cursorEl?: ElementRef<HTMLDivElement>;
  isDesktop = true;

  ui = UI_TEXT;

  constructor(
    private portfolioData: PortfolioDataService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  get t(): Record<string, string> {
    return this.ui[this.lang];
  }

  ngOnInit(): void {
    this.isDesktop = window.innerWidth > 768;
    this.document.documentElement.setAttribute('data-theme', this.theme);
    this.document.documentElement.lang = this.lang;
    this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';

    this.portfolioData.getPortfolioData().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        setTimeout(() => {
          this.startTyping();
          this.setupRevealObserver();
          this.setupStatsObserver();
        });
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      }
    });
  }

  ngAfterViewInit(): void {
    // نداء بسيط عشان أول فريم يتظبط لو الداتا جت بسرعة
  }

  // ================================================================
  // LANGUAGE
  // ================================================================
  toggleLang(): void {
    this.lang = this.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', this.lang);
    this.document.documentElement.lang = this.lang;
    this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
    this.startTyping();
  }

  // ================================================================
  // THEME
  // ================================================================
  toggleTheme(): void {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  applyTheme(preset: string): void {
    this.theme = preset;
    localStorage.setItem('theme', preset);
    this.document.documentElement.setAttribute('data-theme', preset);
    this.themeMenuOpen = false;
  }

  toggleThemeMenu(e: Event): void {
    e.stopPropagation();
    this.themeMenuOpen = !this.themeMenuOpen;
  }

  @HostListener('document:click')
  onDocClick(): void {
    this.themeMenuOpen = false;
  }

  // ================================================================
  // MOBILE MENU
  // ================================================================
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // ================================================================
  // CUSTOM CURSOR
  // ================================================================
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isDesktop || !this.cursorEl) return;
    this.cursorEl.nativeElement.style.left = e.clientX + 'px';
    this.cursorEl.nativeElement.style.top = e.clientY + 'px';
  }

  cursorHover(on: boolean): void {
    if (!this.isDesktop || !this.cursorEl) return;
    this.cursorEl.nativeElement.classList.toggle('hover', on);
  }

  // ================================================================
  // SCROLL: progress bar
  // ================================================================
  progressWidth = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const height = this.document.documentElement.scrollHeight - window.innerHeight;
    this.progressWidth = height > 0 ? (scrollTop / height) * 100 : 0;
  }

  // ================================================================
  // TYPING EFFECT
  // ================================================================
  private startTyping(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (!this.data) return;
    const phrases = this.lang === 'ar' ? this.data.hero.typedPhrasesAr : this.data.hero.typedPhrasesEn;
    if (!phrases || phrases.length === 0) return;

    let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 100;
    const step = () => {
      const phrase = phrases[phraseIndex];
      if (isDeleting) {
        this.typedText = phrase.substring(0, charIndex - 1);
        charIndex--;
        speed = 40;
      } else {
        this.typedText = phrase.substring(0, charIndex + 1);
        charIndex++;
        speed = 120;
      }
      if (!isDeleting && charIndex === phrase.length) {
        isDeleting = true;
        speed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }
      this.typingTimeout = setTimeout(step, speed);
    };
    step();
  }

  // (تم اختصار بقية الكود داخل CODE.md لتقليل حجم الملف)
}
```

## src/app/app.component.html
```html
(تم نسخ محتوى الملف داخل CODE.md عند الإنشاء)
```

## src/styles.css
```css
(تم نسخ محتوى الملف داخل CODE.md عند الإنشاء)
```

## src/index.html
```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>د. أحمد قنديل | استشاري تجميل وزراعة الأسنان</title>
  <base href="/">

  <!-- Favicon -->
  <link rel="icon" href="profile.jpg" type="image/jpeg">
  <link rel="apple-touch-icon" href="profile.jpg">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

## src/environments/environment.ts
```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7042/api',
  imagesBaseUrl: 'https://localhost:7042' // بدون /api
};
```

## src/environments/environment.prod.ts
```ts
export const environment = {
  production: true,
  // TODO: غيّرها لدومين الباك اند الفعلي بعد رفعه (مثال: https://ahmed-kandil.runasp.net/api)
  apiUrl: 'https://your-backend-domain.runasp.net/api',
  // بدون /api
  imagesBaseUrl: 'https://your-backend-domain.runasp.net'
};
```

