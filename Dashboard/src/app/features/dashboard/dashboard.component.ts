import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ApiService } from '../../core/services/api.service';

import { DashboardDataService } from '../../core/services/dashboard-data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  toastMsg: { text: string; type: string } = { text: '', type: 'success' };
  currentDate = '';
  mobileOpen = false;
  isSidebarCollapsed = false;
  currentRouteTitle = 'لوحة التحكم';
  logoUrl = '';

  // ===== متغيرات الثيم =====
  isDarkTheme = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.toast.toast$.subscribe((msg) => (this.toastMsg = msg));
    this.updateDate();
    setInterval(() => this.updateDate(), 30000);
    this.user = this.auth.getUser();

    // قراءة الثيم من localStorage عند بدء التشغيل
    const savedTheme = localStorage.getItem('dashboard-theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme(this.isDarkTheme);

    // لو الكاش لسه فاضي (مثلاً المستخدم عمل Refresh للصفحة وهو جوه الداشبورد
    // من غير ما يعدي بصفحة اللوجن) حمّل كل البيانات دلوقتي بدل ما تستنى كل صفحة تحملها بنفسها.
    if (!this.dataService.loaded && !this.dataService.loading) {
      this.dataService.loadAll().subscribe();
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updatePageTitle();
    });
    this.updatePageTitle();
  }

  ngOnInit(): void {
    // الاشتراك في hero$ للحصول على صورة البروفيل
    this.dataService.hero$.subscribe(hero => {
      if (!this.dataService.profileImagePreview$.value) {
        this.logoUrl = hero?.profileImageUrl ? this.api.resolveImageUrl(hero.profileImageUrl) : '';
      }
    });

    // معاينة فورية: لو المستخدم لسه واقف في صفحة الـ Hero واختار صورة جديدة
    // بس لسه ما ضغطش "حفظ"، نعرضها فورًا في لوجو السايدبار.
    this.dataService.profileImagePreview$.subscribe(preview => {
      if (preview) {
        this.logoUrl = preview;
      } else if (this.dataService.hero$.value?.profileImageUrl) {
        this.logoUrl = this.api.resolveImageUrl(this.dataService.hero$.value.profileImageUrl);
      } else {
        this.logoUrl = '';
      }
    });

    // إذا لم تكن البيانات محملة، نقوم بتحميلها (يتم استدعاؤها أيضاً في المُنشئ)
    if (!this.dataService.loaded && !this.dataService.loading) {
      this.dataService.loadAll().subscribe();
    }

    // قراءة الثيم من إعدادات البورتفوليو كقيمة افتراضية (اختياري)
    this.dataService.settings$.subscribe((settings) => {
      if (settings?.defaultTheme && !localStorage.getItem('dashboard-theme')) {
        const isDark = settings.defaultTheme === 'dark';
        this.isDarkTheme = isDark;
        this.applyTheme(isDark);
        localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
        this.cdr.detectChanges();
      }
    });
  }

  updateDate() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' - ' + now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  }

  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('hero')) this.currentRouteTitle = 'المعلومات الشخصية';
    else if (url.includes('services')) this.currentRouteTitle = 'الخدمات';
    else if (url.includes('portfolio')) this.currentRouteTitle = 'الأعمال';
    else if (url.includes('experiences')) this.currentRouteTitle = 'الخبرات';
    else if (url.includes('testimonials')) this.currentRouteTitle = 'الشهادات';
    else if (url.includes('contact')) this.currentRouteTitle = 'التواصل';
    else if (url.includes('settings')) this.currentRouteTitle = 'الإعدادات';
    else this.currentRouteTitle = 'لوحة التحكم';
  }

  getPageTitle(): string {
    return this.currentRouteTitle;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile() {
    this.mobileOpen = false;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // ===== دوال الثيم =====
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);
    localStorage.setItem('dashboard-theme', this.isDarkTheme ? 'dark' : 'light');
    this.cdr.detectChanges();
  }

  private applyTheme(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
  }
}