
// // import { CommonModule, DOCUMENT } from '@angular/common';
// // import { AfterViewInit, Component, ElementRef,ChangeDetectorRef,HostListener, Inject, OnInit, ViewChild } from '@angular/core';
// // import { FormsModule } from '@angular/forms';

// // import { PortfolioDataService } from './core/services/portfolio-data.service';
// // import {
// //   ContactMessagePayload,
// //   PublicPortfolioData
// // } from './core/models/portfolio.models';

// // import { environment } from '../environments/environment';


// // type Lang = 'ar' | 'en';

// // // نصوص واجهة ثابتة (زرار، تلميحات، حقول الفورم...) مش بيانات من الداتا بيز.
// // // كل محتوى البورتفوليو الفعلي (الهيرو، الخدمات، الأعمال، الخبرات، الشهادات، التواصل) بييجي من الباك اند.
// // const UI_TEXT: Record<Lang, Record<string, string>> = {
// //   ar: {
// //     nav_about: 'نبذة', nav_services: 'الخدمات', nav_portfolio: 'أعمالي',
// //     nav_experience: 'الخبرات', nav_contact: 'اتصل',
// //     badge_available: 'متاح للاستشارات',
// //     hero_btn1: 'استعرض أعمالي', hero_btn2: 'احجز موعداً',
// //     tip1: 'فحص دوري كل 6 أشهر', tip2: 'تنظيف الأسنان مرتين يومياً', tip3: 'ابتسامتك تهمنا',
// //     services_title_prefix: 'خدماتي ', services_title_highlight:  'الطبية',
// //     services_subtitle: 'أحدث التقنيات في تجميل وزراعة الأسنان',
// //     portfolio_title_prefix: 'أعمالي ', portfolio_title_highlight: 'المميزة ',
// //     portfolio_subtitle: 'نماذج من حالاتي الناجحة', click_preview: 'معاينة',
// //     exp_title_prefix: 'السيرة', exp_title_highlight: 'الذاتية', exp_subtitle: 'الخبرات والمؤهلات العلمية',
// //     test_title_prefix: 'آراء', test_title_highlight: 'المرضى', test_subtitle: 'ما يقوله من عالجتهم',
// //     contact_title_prefix:  'تواصل ', contact_title_highlight: 'معي ', contact_subtitle: 'للاستشارات وحجز المواعيد',
// //     contact_info_title: 'لنصنع ابتسامتك', contact_info_desc: 'أنا هنا للإجابة على استفساراتك وتقديم استشارة مجانية.',
// //     clinic_hours_title: 'ساعات العمل',
// //     form_name: 'الاسم بالكامل', form_email: 'البريد الإلكتروني', form_phone: 'رقم الهاتف',
// //     form_message: 'نوع الخدمة أو الاستفسار...', form_submit: 'احجز موعدك الآن',
// //     modal_title_word: 'معرض', modal_subtitle: 'اضغط على أي صورة لتكبيرها',
// //     footer_sub: 'استشاري تجميل وزراعة الأسنان | BDS, MSc',
// //     toast_fill_required: '⚠️ الرجاء ملء جميع الحقول المطلوبة.',
// //     toast_sent: '✅ تم استلام طلبك! سأتواصل معك خلال 24 ساعة.',
// //     toast_error: '⚠️ حدث خطأ أثناء الإرسال، حاول مرة أخرى.',
// //     images_suffix: 'صورة'
// //   },
// //   en: {
// //     nav_about: 'About', nav_services: 'Services', nav_portfolio: 'Portfolio',
// //     nav_experience: 'Experience', nav_contact: 'Contact',
// //     badge_available: 'Available for consultations',
// //     hero_btn1: 'View My Work', hero_btn2: 'Book Appointment',
// //     tip1: 'Check-up every 6 months', tip2: 'Brush teeth twice daily', tip3: 'Your smile matters',
// //     services_title_prefix: 'My', services_title_highlight: 'Medical Services',
// //     services_subtitle: 'Latest technologies in cosmetic and dental implantology',
// //     portfolio_title_prefix: 'My', portfolio_title_highlight: 'Portfolio',
// //     portfolio_subtitle: 'Samples of my successful cases', click_preview: 'Preview',
// //     exp_title_prefix: 'My', exp_title_highlight: 'Resume', exp_subtitle: 'Experience & Qualifications',
// //     test_title_prefix: 'Patient', test_title_highlight: 'Testimonials', test_subtitle: 'What they say about my work',
// //     contact_title_prefix: 'Get in', contact_title_highlight: 'Touch', contact_subtitle: 'For consultations and appointments',
// //     contact_info_title: "Let's design your smile", contact_info_desc: 'I am here to answer your questions and provide a free consultation.',
// //     clinic_hours_title: 'Working Hours',
// //     form_name: 'Full Name', form_email: 'Email Address', form_phone: 'Phone Number',
// //     form_message: 'Service type or inquiry...', form_submit: 'Book Your Appointment Now',
// //     modal_title_word: 'Gallery', modal_subtitle: 'Click on any image to enlarge',
// //     footer_sub: 'Consultant in Cosmetic & Dental Implantology | BDS, MSc',
// //     toast_fill_required: '⚠️ Please fill in all required fields.',
// //     toast_sent: '✅ Your request has been received! I will contact you within 24 hours.',
// //     toast_error: '⚠️ Something went wrong, please try again.',
// //     images_suffix: 'images'
// //   }
// // };

// // @Component({
// //   selector: 'app-root',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './app.component.html'
// // })
// // export class AppComponent implements OnInit, AfterViewInit {
// //   // ---------- Data from backend ----------
// //   data: PublicPortfolioData | null = null;
// //   loading = true;
// //   loadError = false;

// //   // ---------- Language / theme ----------
// //   lang: Lang = (localStorage.getItem('lang') as Lang) || 'ar';
// //   theme = localStorage.getItem('theme') || 'dark';
// //   themeMenuOpen = false;

// //   // ---------- Mobile menu ----------
// //   mobileMenuOpen = false;

// //   // ---------- Typing effect ----------
// //   typedText = '';
// //   private typingTimeout: any = null;

// //   // ---------- Modal / lightbox ----------
// //   modalOpen = false;
// //   modalCaseIndex: number | null = null;
// //   lightboxOpen = false;
// //   lightboxImages: string[] = [];
// //   lightboxIndex = 0;

// //   // ---------- Contact form ----------
// //   contactName = '';
// //   contactEmail = '';
// //   contactPhone = '';
// //   contactMessage = '';
// //   sending = false;

// //   // ---------- Toast ----------
// //   toastText = '';
// //   toastType: 'success' | 'error' = 'success';
// //   toastShow = false;
// //   private toastTimeout: any = null;

// //   // ---------- Custom cursor ----------
// //   @ViewChild('cursorEl') cursorEl?: ElementRef<HTMLDivElement>;
// //   isDesktop = true;

// //   ui = UI_TEXT;

// //   constructor(
// //     private portfolioData: PortfolioDataService,
// //     @Inject(DOCUMENT) private document: Document,
// //         private cdr: ChangeDetectorRef   // <--- إضافة

// //   ) {}

// //   get t(): Record<string, string> {
// //     return this.ui[this.lang];
// //   }

// //   ngOnInit(): void {
// //     this.isDesktop = window.innerWidth > 768;
// //     this.document.documentElement.setAttribute('data-theme', this.theme);
// //     this.document.documentElement.lang = this.lang;
// //     this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';

// //     this.portfolioData.getPortfolioData().subscribe({
// //       next: (res) => {
// //         this.data = res;
// //         this.loading = false;
// //               this.cdr.detectChanges(); // <--- فرض تحديث الـ View فوراً

// //         setTimeout(() => {
// //           this.startTyping();
// //           this.setupRevealObserver();
// //           this.setupStatsObserver();
// //         });
// //       },
// //       error: () => {
// //         this.loading = false;
// //         this.loadError = true;
// //               this.cdr.detectChanges(); // <--- أيضاً هنا

// //       }
// //     });
// //   }

// //   ngAfterViewInit(): void {
// //     // نداء بسيط عشان أول فريم يتظبط لو الداتا جت بسرعة
// //   }

// //   // ================================================================
// //   // LANGUAGE
// //   // ================================================================
// //   toggleLang(): void {
// //     this.lang = this.lang === 'ar' ? 'en' : 'ar';
// //     localStorage.setItem('lang', this.lang);
// //     this.document.documentElement.lang = this.lang;
// //     this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
// //     this.startTyping();
// //   }
// //   reloadData(): void {
// //   this.loading = true;
// //   this.loadError = false;
// //   this.portfolioData.getPortfolioData().subscribe({
// //     next: (res) => {
// //       this.data = res;
// //       this.loading = false;
// //       this.cdr.detectChanges();
// //       // إعادة تشغيل المؤثرات
// //       setTimeout(() => { this.startTyping(); this.setupRevealObserver(); this.setupStatsObserver(); }, 0);
// //     },
// //     error: () => {
// //       this.loading = false;
// //       this.loadError = true;
// //       this.cdr.detectChanges();
// //     }
// //   });
// // }

// //   // ================================================================
// //   // THEME
// //   // ================================================================
// //   toggleTheme(): void {
// //     const next = this.theme === 'dark' ? 'light' : 'dark';
// //     this.applyTheme(next);
// //   }

// //   applyTheme(preset: string): void {
// //     this.theme = preset;
// //     localStorage.setItem('theme', preset);
// //     this.document.documentElement.setAttribute('data-theme', preset);
// //     this.themeMenuOpen = false;
// //   }

// //   toggleThemeMenu(e: Event): void {
// //     e.stopPropagation();
// //     this.themeMenuOpen = !this.themeMenuOpen;
// //   }

// //   @HostListener('document:click')
// //   onDocClick(): void {
// //     this.themeMenuOpen = false;
// //   }

// //   // ================================================================
// //   // MOBILE MENU
// //   // ================================================================
// //   toggleMobileMenu(): void {
// //     this.mobileMenuOpen = !this.mobileMenuOpen;
// //   }

// //   closeMobileMenu(): void {
// //     this.mobileMenuOpen = false;
// //   }

// //   // ================================================================
// //   // CUSTOM CURSOR
// //   // ================================================================
// //   @HostListener('window:mousemove', ['$event'])
// //   onMouseMove(e: MouseEvent): void {
// //     if (!this.isDesktop || !this.cursorEl) return;
// //     this.cursorEl.nativeElement.style.left = e.clientX + 'px';
// //     this.cursorEl.nativeElement.style.top = e.clientY + 'px';
// //   }

// //   cursorHover(on: boolean): void {
// //     if (!this.isDesktop || !this.cursorEl) return;
// //     this.cursorEl.nativeElement.classList.toggle('hover', on);
// //   }

// //   // ================================================================
// //   // SCROLL: progress bar
// //   // ================================================================
// //   progressWidth = 0;

// //   @HostListener('window:scroll')
// //   onScroll(): void {
// //     const scrollTop = window.scrollY;
// //     const height = this.document.documentElement.scrollHeight - window.innerHeight;
// //     this.progressWidth = height > 0 ? (scrollTop / height) * 100 : 0;
// //   }

// //   // ================================================================
// //   // TYPING EFFECT
// //   // ================================================================
// //   private startTyping(): void {
// //     if (this.typingTimeout) clearTimeout(this.typingTimeout);
// //     if (!this.data) return;
// //     const phrases = this.lang === 'ar' ? this.data.hero.typedPhrasesAr : this.data.hero.typedPhrasesEn;
// //     if (!phrases || phrases.length === 0) return;

// //     let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 100;
// //     const step = () => {
// //       const phrase = phrases[phraseIndex];
// //       if (isDeleting) {
// //         this.typedText = phrase.substring(0, charIndex - 1);
// //         charIndex--;
// //         speed = 40;
// //       } else {
// //         this.typedText = phrase.substring(0, charIndex + 1);
// //         charIndex++;
// //         speed = 120;
// //       }
// //       if (!isDeleting && charIndex === phrase.length) {
// //         isDeleting = true;
// //         speed = 2000;
// //       } else if (isDeleting && charIndex === 0) {
// //         isDeleting = false;
// //         phraseIndex = (phraseIndex + 1) % phrases.length;
// //         speed = 400;
// //       }
// //       this.typingTimeout = setTimeout(step, speed);
// //     };
// //     step();
// //   }

// //   // ================================================================
// //   // REVEAL ON SCROLL
// //   // ================================================================
// //   private setupRevealObserver(): void {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) entry.target.classList.add('visible');
// //         });
// //       },
// //       { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
// //     );
// //     this.document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
// //   }

// //   // ================================================================
// //   // CIRCULAR STATS PROGRESS
// //   // ================================================================
// //   private setupStatsObserver(): void {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           const card = entry.target as HTMLElement;
// //           const wrap = card.querySelector('.circle-wrap') as HTMLElement | null;
// //           if (!wrap) return;
// //           const target = parseInt(wrap.dataset['target'] || '0', 10) || 0;
// //           const circle = wrap.querySelector('.progress-circle') as SVGCircleElement | null;
// //           const numSpan = wrap.querySelector('.circle-number span') as HTMLElement | null;
// //           if (!circle || !numSpan) return;

// //           const radius = 45;
// //           const circumference = 2 * Math.PI * radius;
// //           circle.style.strokeDasharray = String(circumference);

// //           let percent = 0;
// //           if (target >= 100) percent = Math.min(target / 1500, 0.8);
// //           else if (target >= 50) percent = Math.min(target / 100, 0.8);
// //           else percent = Math.min(target / 100, 0.95);
// //           if (percent < 0.05 && target > 0) percent = 0.15;

// //           let current = 0;
// //           const stepTime = 20, totalSteps = 60, increment = target / totalSteps;
// //           const counter = setInterval(() => {
// //             current += increment;
// //             if (current >= target) { current = target; clearInterval(counter); }
// //             numSpan.textContent = String(Math.floor(current));
// //           }, stepTime);

// //           circle.style.strokeDashoffset = String(circumference);
// //           setTimeout(() => {
// //             circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.2, 0.9, 0.3, 1)';
// //             circle.style.strokeDashoffset = String(circumference - percent * circumference);
// //           }, 300);

// //           observer.unobserve(card);
// //         });
// //       },
// //       { threshold: 0.3 }
// //     );
// //     this.document.querySelectorAll('.stat-card').forEach((el) => observer.observe(el));
// //   }

// //   // ================================================================
// //   // PORTFOLIO MODAL
// //   // ================================================================
// //   openCaseModal(index: number): void {
// //     if (!this.data) return;
// //     this.modalCaseIndex = index;
// //     this.modalOpen = true;
// //     this.document.body.style.overflow = 'hidden';
// //   }

// //   closeModal(): void {
// //     this.modalOpen = false;
// //     this.modalCaseIndex = null;
// //     this.document.body.style.overflow = '';
// //   }

// //   get activeCase() {
// //     if (this.modalCaseIndex === null || !this.data) return null;
// //     return this.data.cases[this.modalCaseIndex] || null;
// //   }

// //   // ================================================================
// //   // LIGHTBOX
// //   // ================================================================
// //   openLightbox(images: string[], index: number, e?: Event): void {
// //     if (e) e.stopPropagation();
// //     this.lightboxImages = images;
// //     this.lightboxIndex = index;
// //     this.lightboxOpen = true;
// //     this.document.body.style.overflow = 'hidden';
// //   }

// //   closeLightbox(): void {
// //     this.lightboxOpen = false;
// //     this.lightboxImages = [];
// //     this.lightboxIndex = 0;
// //     this.document.body.style.overflow = this.modalOpen ? 'hidden' : '';
// //   }

// //   navigateLightbox(direction: number, e?: Event): void {
// //     if (e) e.stopPropagation();
// //     if (this.lightboxImages.length === 0) return;
// //     this.lightboxIndex = (this.lightboxIndex + direction + this.lightboxImages.length) % this.lightboxImages.length;
// //   }

// //   @HostListener('document:keydown', ['$event'])
// //   onKeydown(e: KeyboardEvent): void {
// //     if (e.key === 'Escape') {
// //       this.closeLightbox();
// //       this.closeModal();
// //     }
// //     if (this.lightboxOpen) {
// //       if (e.key === 'ArrowRight') this.navigateLightbox(-1);
// //       if (e.key === 'ArrowLeft') this.navigateLightbox(1);
// //     }
// //   }

// //   // ================================================================
// //   // CONTACT FORM
// //   // ================================================================
// //   submitContactForm(): void {
// //     const name = this.contactName.trim();
// //     const email = this.contactEmail.trim();
// //     const message = this.contactMessage.trim();

// //     if (!name || !email || !message) {
// //       this.showToast(this.t['toast_fill_required'], 'error');
// //       return;
// //     }

// //     const payload: ContactMessagePayload = {
// //       name, email, message,
// //       phone: this.contactPhone.trim() || undefined
// //     };

// //     this.sending = true;
// //     this.portfolioData.submitContactMessage(payload).subscribe({
// //       next: () => {
// //         this.sending = false;
// //         this.showToast(this.t['toast_sent'], 'success');
// //         this.contactName = '';
// //         this.contactEmail = '';
// //         this.contactPhone = '';
// //         this.contactMessage = '';
// //       },
// //       error: () => {
// //         this.sending = false;
// //         this.showToast(this.t['toast_error'], 'error');
// //       }
// //     });
// //   }

// //   private showToast(msg: string, type: 'success' | 'error'): void {
// //     this.toastText = msg;
// //     this.toastType = type;
// //     this.toastShow = true;
// //     if (this.toastTimeout) clearTimeout(this.toastTimeout);
// //     this.toastTimeout = setTimeout(() => (this.toastShow = false), 4500);
// //   }

// //   // ================================================================
// //   // Helpers used in the template
// //   // ================================================================
// //   imageCountText(count: number): string {
// //     return `${count} ${this.t['images_suffix']}`;
// //   }

// //   getImageUrls(c: { images: { imageUrl: string }[] }): string[] {
// //     return c.images.map((img) => img.imageUrl);
// //   }

// //   // getImageUrl(path: string): string {
// //   //   if (!path) return '';

// //   //   // API ممكن يبعت path بصيغ مختلفة:
// //   //   // 1) /images/portfolio/x.jpg
// //   //   // 2) images/portfolio/x.jpg
// //   //   // 3) portfolio/x.jpg
// //   //   // 4) /portfolio/x.jpg

// //   //   if (path.startsWith('/images/')) {
// //   //     return `${environment.imagesBaseUrl}${path}`;
// //   //   }

// //   //   if (path.startsWith('images/')) {
// //   //     return `${environment.imagesBaseUrl}/${path}`;
// //   //   }

// //   //   if (path.startsWith('/')) {
// //   //     // مثل: /portfolio/x.jpg
// //   //     return `${environment.imagesBaseUrl}/images${path}`;
// //   //   }

// //   //   // مثل: portfolio/x.jpg (بدون /)
// //   //   return `${environment.imagesBaseUrl}/images/${path}`;
// //   // }
// //   getImageUrl(path: string): string {
// //   if (!path) return '';
// //   // إزالة أي شرطة مائلة زائدة من البداية
// //   const cleanPath = path.startsWith('/') ? path.slice(1) : path;
// //   return `${environment.imagesBaseUrl}/${cleanPath}`;
// // }
// // }

// import { CommonModule, DOCUMENT } from '@angular/common';
// import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { PortfolioDataService } from './core/services/portfolio-data.service';
// import {
//   ContactMessagePayload,
//   PublicPortfolioData
// } from './core/models/portfolio.models';

// import { environment } from '../environments/environment';

// type Lang = 'ar' | 'en';

// // نصوص واجهة ثابتة (زرار، تلميحات، حقول الفورم...) مش بيانات من الداتا بيز.
// // كل محتوى البورتفوليو الفعلي (الهيرو، الخدمات، الأعمال، الخبرات، الشهادات، التواصل) بييجي من الباك اند.
// const UI_TEXT: Record<Lang, Record<string, string>> = {
//   ar: {
//     nav_about: 'نبذة', nav_services: 'الخدمات', nav_portfolio: 'أعمالي',
//     nav_experience: 'الخبرات', nav_contact: 'اتصل',
//     badge_available: 'متاح للاستشارات',
//     hero_btn1: 'استعرض أعمالي', hero_btn2: 'احجز موعداً',
//     tip1: 'فحص دوري كل 6 أشهر', tip2: 'تنظيف الأسنان مرتين يومياً', tip3: 'ابتسامتك تهمنا',
//     services_title_prefix: 'خدماتي ', services_title_highlight:  'الطبية',
//     services_subtitle: 'أحدث التقنيات في تجميل وزراعة الأسنان',
//     portfolio_title_prefix: 'أعمالي ', portfolio_title_highlight: 'المميزة ',
//     portfolio_subtitle: 'نماذج من حالاتي الناجحة', click_preview: 'معاينة',
//     exp_title_prefix: 'السيرة', exp_title_highlight: 'الذاتية', exp_subtitle: 'الخبرات والمؤهلات العلمية',
//     test_title_prefix: 'آراء', test_title_highlight: 'المرضى', test_subtitle: 'ما يقوله من عالجتهم',
//     contact_title_prefix:  'تواصل ', contact_title_highlight: 'معي ', contact_subtitle: 'للاستشارات وحجز المواعيد',
//     contact_info_title: 'لنصنع ابتسامتك', contact_info_desc: 'أنا هنا للإجابة على استفساراتك وتقديم استشارة مجانية.',
//     clinic_hours_title: 'ساعات العمل',
//     form_name: 'الاسم بالكامل', form_email: 'البريد الإلكتروني', form_phone: 'رقم الهاتف',
//     form_message: 'نوع الخدمة أو الاستفسار...', form_submit: 'احجز موعدك الآن',
//     modal_title_word: 'معرض', modal_subtitle: 'اضغط على أي صورة لتكبيرها',
//     footer_sub: 'استشاري تجميل وزراعة الأسنان | BDS, MSc',
//     toast_fill_required: '⚠️ الرجاء ملء جميع الحقول المطلوبة.',
//     toast_sent: '✅ تم استلام طلبك! سأتواصل معك خلال 24 ساعة.',
//     toast_error: '⚠️ حدث خطأ أثناء الإرسال، حاول مرة أخرى.',
//     images_suffix: 'صورة'
//   },
//   en: {
//     nav_about: 'About', nav_services: 'Services', nav_portfolio: 'Portfolio',
//     nav_experience: 'Experience', nav_contact: 'Contact',
//     badge_available: 'Available for consultations',
//     hero_btn1: 'View My Work', hero_btn2: 'Book Appointment',
//     tip1: 'Check-up every 6 months', tip2: 'Brush teeth twice daily', tip3: 'Your smile matters',
//     services_title_prefix: 'My', services_title_highlight: 'Medical Services',
//     services_subtitle: 'Latest technologies in cosmetic and dental implantology',
//     portfolio_title_prefix: 'My', portfolio_title_highlight: 'Portfolio',
//     portfolio_subtitle: 'Samples of my successful cases', click_preview: 'Preview',
//     exp_title_prefix: 'My', exp_title_highlight: 'Resume', exp_subtitle: 'Experience & Qualifications',
//     test_title_prefix: 'Patient', test_title_highlight: 'Testimonials', test_subtitle: 'What they say about my work',
//     contact_title_prefix: 'Get in', contact_title_highlight: 'Touch', contact_subtitle: 'For consultations and appointments',
//     contact_info_title: "Let's design your smile", contact_info_desc: 'I am here to answer your questions and provide a free consultation.',
//     clinic_hours_title: 'Working Hours',
//     form_name: 'Full Name', form_email: 'Email Address', form_phone: 'Phone Number',
//     form_message: 'Service type or inquiry...', form_submit: 'Book Your Appointment Now',
//     modal_title_word: 'Gallery', modal_subtitle: 'Click on any image to enlarge',
//     footer_sub: 'Consultant in Cosmetic & Dental Implantology | BDS, MSc',
//     toast_fill_required: '⚠️ Please fill in all required fields.',
//     toast_sent: '✅ Your request has been received! I will contact you within 24 hours.',
//     toast_error: '⚠️ Something went wrong, please try again.',
//     images_suffix: 'images'
//   }
// };

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './app.component.html'
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   // ---------- Data from backend ----------
//   data: PublicPortfolioData | null = null;
//   loading = true;
//   loadError = false;

//   // ---------- Language / theme ----------
//   lang: Lang = (localStorage.getItem('lang') as Lang) || 'ar';
//   theme = localStorage.getItem('theme') || 'dark';
//   themeMenuOpen = false;

//   // ---------- Mobile menu ----------
//   mobileMenuOpen = false;

//   // ---------- Typing effect ----------
//   typedText = '';
//   private typingTimeout: any = null;

//   // ---------- Modal / lightbox ----------
//   modalOpen = false;
//   modalCaseIndex: number | null = null;
//   lightboxOpen = false;
//   lightboxImages: string[] = [];
//   lightboxIndex = 0;

//   // ---------- Contact form ----------
//   contactName = '';
//   contactEmail = '';
//   contactPhone = '';
//   contactMessage = '';
//   sending = false;

//   // ---------- Toast ----------
//   toastText = '';
//   toastType: 'success' | 'error' = 'success';
//   toastShow = false;
//   private toastTimeout: any = null;

//   // ---------- Custom cursor ----------
//   @ViewChild('cursorEl') cursorEl?: ElementRef<HTMLDivElement>;
//   isDesktop = true;

//   ui = UI_TEXT;

//   constructor(
//     private portfolioData: PortfolioDataService,
//     @Inject(DOCUMENT) private document: Document,
//     private cdr: ChangeDetectorRef  // <-- إضافة ChangeDetectorRef
//   ) {}

//   get t(): Record<string, string> {
//     return this.ui[this.lang];
//   }

//   ngOnInit(): void {
//     this.isDesktop = window.innerWidth > 768;
//     this.document.documentElement.setAttribute('data-theme', this.theme);
//     this.document.documentElement.lang = this.lang;
//     this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';

//     this.portfolioData.getPortfolioData().subscribe({
//       next: (res) => {
//         this.data = res;
//         this.loading = false;
//         this.cdr.detectChanges(); // <-- فرض تحديث الـ View فوراً
//         setTimeout(() => {
//           this.startTyping();
//           this.setupRevealObserver();
//           this.setupStatsObserver();
//         }, 0);
//       },
//       error: () => {
//         this.loading = false;
//         this.loadError = true;
//         this.cdr.detectChanges(); // <-- أيضاً هنا
//       }
//     });
//   }

//   ngAfterViewInit(): void {
//     // نداء بسيط عشان أول فريم يتظبط لو الداتا جت بسرعة
//   }

//   // ================================================================
//   // LANGUAGE
//   // ================================================================
//   toggleLang(): void {
//     this.lang = this.lang === 'ar' ? 'en' : 'ar';
//     localStorage.setItem('lang', this.lang);
//     this.document.documentElement.lang = this.lang;
//     this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
//     this.startTyping();
//   }

//   // ================================================================
//   // THEME
//   // ================================================================
//   toggleTheme(): void {
//     const next = this.theme === 'dark' ? 'light' : 'dark';
//     this.applyTheme(next);
//   }

//   applyTheme(preset: string): void {
//     this.theme = preset;
//     localStorage.setItem('theme', preset);
//     this.document.documentElement.setAttribute('data-theme', preset);
//     this.themeMenuOpen = false;
//   }

//   toggleThemeMenu(e: Event): void {
//     e.stopPropagation();
//     this.themeMenuOpen = !this.themeMenuOpen;
//   }

//   @HostListener('document:click')
//   onDocClick(): void {
//     this.themeMenuOpen = false;
//   }

//   // ================================================================
//   // MOBILE MENU
//   // ================================================================
//   toggleMobileMenu(): void {
//     this.mobileMenuOpen = !this.mobileMenuOpen;
//   }

//   closeMobileMenu(): void {
//     this.mobileMenuOpen = false;
//   }

//   // ================================================================
//   // CUSTOM CURSOR
//   // ================================================================
//   @HostListener('window:mousemove', ['$event'])
//   onMouseMove(e: MouseEvent): void {
//     if (!this.isDesktop || !this.cursorEl) return;
//     this.cursorEl.nativeElement.style.left = e.clientX + 'px';
//     this.cursorEl.nativeElement.style.top = e.clientY + 'px';
//   }

//   cursorHover(on: boolean): void {
//     if (!this.isDesktop || !this.cursorEl) return;
//     this.cursorEl.nativeElement.classList.toggle('hover', on);
//   }

//   // ================================================================
//   // SCROLL: progress bar
//   // ================================================================
//   progressWidth = 0;

//   @HostListener('window:scroll')
//   onScroll(): void {
//     const scrollTop = window.scrollY;
//     const height = this.document.documentElement.scrollHeight - window.innerHeight;
//     this.progressWidth = height > 0 ? (scrollTop / height) * 100 : 0;
//   }

//   // ================================================================
//   // TYPING EFFECT
//   // ================================================================
//   private startTyping(): void {
//     if (this.typingTimeout) clearTimeout(this.typingTimeout);
//     if (!this.data) return;
//     const phrases = this.lang === 'ar' ? this.data.hero.typedPhrasesAr : this.data.hero.typedPhrasesEn;
//     if (!phrases || phrases.length === 0) return;

//     let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 100;
//     const step = () => {
//       const phrase = phrases[phraseIndex];
//       if (isDeleting) {
//         this.typedText = phrase.substring(0, charIndex - 1);
//         charIndex--;
//         speed = 40;
//       } else {
//         this.typedText = phrase.substring(0, charIndex + 1);
//         charIndex++;
//         speed = 120;
//       }
//       if (!isDeleting && charIndex === phrase.length) {
//         isDeleting = true;
//         speed = 2000;
//       } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         phraseIndex = (phraseIndex + 1) % phrases.length;
//         speed = 400;
//       }
//       this.typingTimeout = setTimeout(step, speed);
//     };
//     step();
//   }

//   // ================================================================
//   // REVEAL ON SCROLL
//   // ================================================================
//   private setupRevealObserver(): void {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) entry.target.classList.add('visible');
//         });
//       },
//       { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
//     );
//     this.document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
//   }

//   // ================================================================
//   // CIRCULAR STATS PROGRESS
//   // ================================================================
//   private setupStatsObserver(): void {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const card = entry.target as HTMLElement;
//           const wrap = card.querySelector('.circle-wrap') as HTMLElement | null;
//           if (!wrap) return;
//           const target = parseInt(wrap.dataset['target'] || '0', 10) || 0;
//           const circle = wrap.querySelector('.progress-circle') as SVGCircleElement | null;
//           const numSpan = wrap.querySelector('.circle-number span') as HTMLElement | null;
//           if (!circle || !numSpan) return;

//           const radius = 45;
//           const circumference = 2 * Math.PI * radius;
//           circle.style.strokeDasharray = String(circumference);

//           let percent = 0;
//           if (target >= 100) percent = Math.min(target / 1500, 0.8);
//           else if (target >= 50) percent = Math.min(target / 100, 0.8);
//           else percent = Math.min(target / 100, 0.95);
//           if (percent < 0.05 && target > 0) percent = 0.15;

//           let current = 0;
//           const stepTime = 20, totalSteps = 60, increment = target / totalSteps;
//           const counter = setInterval(() => {
//             current += increment;
//             if (current >= target) { current = target; clearInterval(counter); }
//             numSpan.textContent = String(Math.floor(current));
//           }, stepTime);

//           circle.style.strokeDashoffset = String(circumference);
//           setTimeout(() => {
//             circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.2, 0.9, 0.3, 1)';
//             circle.style.strokeDashoffset = String(circumference - percent * circumference);
//           }, 300);

//           observer.unobserve(card);
//         });
//       },
//       { threshold: 0.3 }
//     );
//     this.document.querySelectorAll('.stat-card').forEach((el) => observer.observe(el));
//   }

//   // ================================================================
//   // PORTFOLIO MODAL
//   // ================================================================
//   openCaseModal(index: number): void {
//     if (!this.data) return;
//     this.modalCaseIndex = index;
//     this.modalOpen = true;
//     this.document.body.style.overflow = 'hidden';
//   }

//   closeModal(): void {
//     this.modalOpen = false;
//     this.modalCaseIndex = null;
//     this.document.body.style.overflow = '';
//   }

//   get activeCase() {
//     if (this.modalCaseIndex === null || !this.data) return null;
//     return this.data.cases[this.modalCaseIndex] || null;
//   }

//   // ================================================================
//   // LIGHTBOX
//   // ================================================================
//   openLightbox(images: string[], index: number, e?: Event): void {
//     if (e) e.stopPropagation();
//     this.lightboxImages = images;
//     this.lightboxIndex = index;
//     this.lightboxOpen = true;
//     this.document.body.style.overflow = 'hidden';
//   }

//   closeLightbox(): void {
//     this.lightboxOpen = false;
//     this.lightboxImages = [];
//     this.lightboxIndex = 0;
//     this.document.body.style.overflow = this.modalOpen ? 'hidden' : '';
//   }

//   navigateLightbox(direction: number, e?: Event): void {
//     if (e) e.stopPropagation();
//     if (this.lightboxImages.length === 0) return;
//     this.lightboxIndex = (this.lightboxIndex + direction + this.lightboxImages.length) % this.lightboxImages.length;
//   }

//   @HostListener('document:keydown', ['$event'])
//   onKeydown(e: KeyboardEvent): void {
//     if (e.key === 'Escape') {
//       this.closeLightbox();
//       this.closeModal();
//     }
//     if (this.lightboxOpen) {
//       if (e.key === 'ArrowRight') this.navigateLightbox(-1);
//       if (e.key === 'ArrowLeft') this.navigateLightbox(1);
//     }
//   }

//   // ================================================================
//   // CONTACT FORM
//   // ================================================================
//   submitContactForm(): void {
//     const name = this.contactName.trim();
//     const email = this.contactEmail.trim();
//     const message = this.contactMessage.trim();

//     if (!name || !email || !message) {
//       this.showToast(this.t['toast_fill_required'], 'error');
//       return;
//     }

//     const payload: ContactMessagePayload = {
//       name, email, message,
//       phone: this.contactPhone.trim() || undefined
//     };

//     this.sending = true;
//     this.portfolioData.submitContactMessage(payload).subscribe({
//       next: () => {
//         this.sending = false;
//         this.showToast(this.t['toast_sent'], 'success');
//         this.contactName = '';
//         this.contactEmail = '';
//         this.contactPhone = '';
//         this.contactMessage = '';
//       },
//       error: () => {
//         this.sending = false;
//         this.showToast(this.t['toast_error'], 'error');
//       }
//     });
//   }

//   private showToast(msg: string, type: 'success' | 'error'): void {
//     this.toastText = msg;
//     this.toastType = type;
//     this.toastShow = true;
//     if (this.toastTimeout) clearTimeout(this.toastTimeout);
//     this.toastTimeout = setTimeout(() => (this.toastShow = false), 4500);
//   }

//   // ================================================================
//   // Helpers used in the template
//   // ================================================================
//   imageCountText(count: number): string {
//     return `${count} ${this.t['images_suffix']}`;
//   }

//   getImageUrls(c: { images: { imageUrl: string }[] }): string[] {
//     return c.images.map((img) => img.imageUrl);
//   }

//   getImageUrl(path: string): string {
//     if (!path) return '';
//     // إزالة أي شرطة مائلة زائدة من البداية
//     const cleanPath = path.startsWith('/') ? path.slice(1) : path;
//     return `${environment.imagesBaseUrl}/${cleanPath}`;
//   }

//   // ================================================================
//   // trackBy function for *ngFor (يحسن أداء إعادة التصيير)
//   // ================================================================
//   trackByFn(index: number, item: any): number {
//     return item?.id ?? index;
//   }

//   // ================================================================
//   // إعادة محاولة التحميل عند الخطأ
//   // ================================================================
//   reloadData(): void {
//     this.loading = true;
//     this.loadError = false;
//     this.cdr.detectChanges();
//     this.portfolioData.getPortfolioData().subscribe({
//       next: (res) => {
//         this.data = res;
//         this.loading = false;
//         this.cdr.detectChanges();
//         setTimeout(() => {
//           this.startTyping();
//           this.setupRevealObserver();
//           this.setupStatsObserver();
//         }, 0);
//       },
//       error: () => {
//         this.loading = false;
//         this.loadError = true;
//         this.cdr.detectChanges();
//       }
//     });
//   }
// }


import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
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
    hero_btn1: 'استعرض أعمالي', hero_btn2: ' تواصل معى ',
    tip1: 'فحص دوري كل 6 أشهر', tip2: 'تنظيف الأسنان مرتين يومياً', tip3: 'ابتسامتك تهمنا',
    services_title_prefix: 'خدماتي ', services_title_highlight:  ' الطبية ',
    services_subtitle: 'أحدث التقنيات في تجميل وزراعة الأسنان',
    portfolio_title_prefix: 'أعمالي ', portfolio_title_highlight: ' المميزة ',
    portfolio_subtitle: 'نماذج من حالاتي الناجحة', click_preview: 'معاينة',
    exp_title_prefix: 'السيرة', exp_title_highlight: ' الذاتية ', exp_subtitle: 'الخبرات والمؤهلات العلمية',
    test_title_prefix: 'آراء', test_title_highlight: ' المرضى ', test_subtitle: 'ما يقوله من عالجتهم',
    contact_title_prefix:  'تواصل ', contact_title_highlight: 'معي ', contact_subtitle: 'للاستشارات وحجز المواعيد',
    contact_info_title: 'لنصنع ابتسامتك', contact_info_desc: 'أنا هنا للإجابة على استفساراتك وتقديم استشارة مجانية.',
    clinic_hours_title: 'ساعات العمل',
    form_name: 'الاسم بالكامل', form_email: 'البريد الإلكتروني', form_phone: 'رقم الهاتف',
    form_message: 'نوع الخدمة أو الاستفسار...', form_submit: ' تواصل معى ',
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

  // ---------- Testimonial form ----------
  testimonialAuthor = '';
  testimonialText = '';
  testimonialModalOpen = false;
  submittingTestimonial = false;

  ui = UI_TEXT;

  constructor(
    private portfolioData: PortfolioDataService,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef
  ) {}

  get t(): Record<string, string> {
    return this.ui[this.lang];
  }

  // ngOnInit(): void {
  //   this.isDesktop = window.innerWidth > 768;
  //   this.document.documentElement.setAttribute('data-theme', this.theme);
  //   this.document.documentElement.lang = this.lang;
  //   this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';

  //   this.portfolioData.getPortfolioData().subscribe({
  //     next: (res) => {
  //       this.data = res;
  //       this.loading = false;
  //       this.cdr.detectChanges();
  //       setTimeout(() => {
  //         this.startTyping();
  //         this.setupRevealObserver();
  //         this.setupStatsObserver();
  //       }, 0);
  //     },
  //     error: () => {
  //       this.loading = false;
  //       this.loadError = true;
  //       this.cdr.detectChanges();
  //     }
  //   });
  // }
// أضف هذا المتغير مع باقي المتغيرات
isMaintenanceMode = false;

// في دالة ngOnInit، بعد تحميل البيانات، تحقق من حالة الصيانة
ngOnInit(): void {
  this.isDesktop = window.innerWidth > 768;

  this.portfolioData.getPortfolioData().subscribe({
    next: (res) => {
      this.data = res;
      this.loading = false;
      this.cdr.detectChanges();

      // تعيين حالة الصيانة
      this.isMaintenanceMode = this.data?.settings?.isMaintenanceMode || false;
      console.log('[Maintenance Mode]', this.isMaintenanceMode); // للتتبع

      // تعيين اللغة والثيم من الإعدادات إذا كانت localStorage فاضية
      if (!localStorage.getItem('lang') && this.data?.settings?.defaultLanguage) {
        this.lang = this.data.settings.defaultLanguage as Lang;
        localStorage.setItem('lang', this.lang);
      }
      if (!localStorage.getItem('theme') && this.data?.settings?.defaultTheme) {
        this.theme = this.data.settings.defaultTheme;
        localStorage.setItem('theme', this.theme);
      }

      this.document.documentElement.lang = this.lang;
      this.document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      this.document.documentElement.setAttribute('data-theme', this.theme);

      setTimeout(() => {
        this.startTyping();
        this.setupRevealObserver();
        this.setupStatsObserver();
      }, 0);
    },
    error: () => {
      this.loading = false;
      this.loadError = true;
      this.cdr.detectChanges();
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

  // ================================================================
  // REVEAL ON SCROLL
  // ================================================================
  private setupRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );
    this.document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // ================================================================
  // CIRCULAR STATS PROGRESS
  // ================================================================
  private setupStatsObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          const wrap = card.querySelector('.circle-wrap') as HTMLElement | null;
          if (!wrap) return;
          const target = parseInt(wrap.dataset['target'] || '0', 10) || 0;
          const circle = wrap.querySelector('.progress-circle') as SVGCircleElement | null;
          const numSpan = wrap.querySelector('.circle-number span') as HTMLElement | null;
          if (!circle || !numSpan) return;

          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          circle.style.strokeDasharray = String(circumference);

          let percent = 0;
          if (target >= 100) percent = Math.min(target / 1500, 0.8);
          else if (target >= 50) percent = Math.min(target / 100, 0.8);
          else percent = Math.min(target / 100, 0.95);
          if (percent < 0.05 && target > 0) percent = 0.15;

          let current = 0;
          const stepTime = 20, totalSteps = 60, increment = target / totalSteps;
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(counter); }
            numSpan.textContent = String(Math.floor(current));
          }, stepTime);

          circle.style.strokeDashoffset = String(circumference);
          setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.2, 0.9, 0.3, 1)';
            circle.style.strokeDashoffset = String(circumference - percent * circumference);
          }, 300);

          observer.unobserve(card);
        });
      },
      { threshold: 0.3 }
    );
    this.document.querySelectorAll('.stat-card').forEach((el) => observer.observe(el));
  }

  // ================================================================
  // PORTFOLIO MODAL
  // ================================================================
  openCaseModal(index: number): void {
    if (!this.data) return;
    this.modalCaseIndex = index;
    this.modalOpen = true;
    this.document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.modalCaseIndex = null;
    this.document.body.style.overflow = '';
  }

  get activeCase() {
    if (this.modalCaseIndex === null || !this.data) return null;
    return this.data.cases[this.modalCaseIndex] || null;
  }

  // ================================================================
  // LIGHTBOX
  // ================================================================
  openLightbox(images: string[], index: number, e?: Event): void {
    if (e) e.stopPropagation();
    this.lightboxImages = images;
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    this.document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lightboxImages = [];
    this.lightboxIndex = 0;
    this.document.body.style.overflow = this.modalOpen ? 'hidden' : '';
  }

  navigateLightbox(direction: number, e?: Event): void {
    if (e) e.stopPropagation();
    if (this.lightboxImages.length === 0) return;
    this.lightboxIndex = (this.lightboxIndex + direction + this.lightboxImages.length) % this.lightboxImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.closeLightbox();
      this.closeModal();
    }
    if (this.lightboxOpen) {
      if (e.key === 'ArrowRight') this.navigateLightbox(-1);
      if (e.key === 'ArrowLeft') this.navigateLightbox(1);
    }
  }

  // ================================================================
  // TESTIMONIAL MODAL
  // ================================================================
  openTestimonialModal(): void {
    this.testimonialAuthor = '';
    this.testimonialText = '';
    this.testimonialModalOpen = true;
  }

  closeTestimonialModal(): void {
    this.testimonialModalOpen = false;
    this.submittingTestimonial = false;
  }

  submitTestimonial(): void {
    const author = this.testimonialAuthor.trim();
    const text = this.testimonialText.trim();

    if (!author || !text) {
      this.showToast(this.t['toast_fill_required'], 'error');
      return;
    }

    this.submittingTestimonial = true;

    this.portfolioData.addTestimonial({ author, text }).subscribe({
      next: () => {
        this.submittingTestimonial = false;
        this.showToast('✅ تم إرسال رأيك بنجاح، سيكون مرئياً بعد المراجعة.', 'success');
        this.closeTestimonialModal();
        // يمكن إضافة الرأي مؤقتاً في الواجهة إذا أردت (اختياري)
        // هذا يتطلب إضافة testimonial جديد للـ data.testimonials
      },
      error: () => {
        this.submittingTestimonial = false;
        this.showToast(this.t['toast_error'], 'error');
      }
    });
  }

  // ================================================================
  // CONTACT FORM
  // ================================================================
  submitContactForm(): void {
    const name = this.contactName.trim();
    const email = this.contactEmail.trim();
    const message = this.contactMessage.trim();

    if (!name || !email || !message) {
      this.showToast(this.t['toast_fill_required'], 'error');
      return;
    }

    const payload: ContactMessagePayload = {
      name, email, message,
      phone: this.contactPhone.trim() || undefined
    };

    this.sending = true;
    this.portfolioData.submitContactMessage(payload).subscribe({
      next: () => {
        this.sending = false;
        this.showToast(this.t['toast_sent'], 'success');
        this.contactName = '';
        this.contactEmail = '';
        this.contactPhone = '';
        this.contactMessage = '';
      },
      error: () => {
        this.sending = false;
        this.showToast(this.t['toast_error'], 'error');
      }
    });
  }

  private showToast(msg: string, type: 'success' | 'error'): void {
    this.toastText = msg;
    this.toastType = type;
    this.toastShow = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => (this.toastShow = false), 4500);
  }

  // ================================================================
  // Helpers used in the template
  // ================================================================
  imageCountText(count: number): string {
    return `${count} ${this.t['images_suffix']}`;
  }

  getImageUrls(c: { images: { imageUrl: string }[] }): string[] {
    return c.images.map((img) => img.imageUrl);
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${environment.imagesBaseUrl}/${cleanPath}`;
  }

  trackByFn(index: number, item: any): number {
    return item?.id ?? index;
  }

  reloadData(): void {
    this.loading = true;
    this.loadError = false;
    this.cdr.detectChanges();
    this.portfolioData.getPortfolioData().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.startTyping();
          this.setupRevealObserver();
          this.setupStatsObserver();
        }, 0);
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
        this.cdr.detectChanges();
      }
    });
  }
}