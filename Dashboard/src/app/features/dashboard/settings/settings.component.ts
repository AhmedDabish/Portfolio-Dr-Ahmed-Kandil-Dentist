// // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common';
// // // // // // import { FormsModule } from '@angular/forms';

// // // // // // import { ApiService } from '../../../core/services/api.service';
// // // // // // import { ToastService } from '../../../core/services/toast.service';
// // // // // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // // // // import { SettingsDto } from '../../../models/portfolio.models';

// // // // // // @Component({
// // // // // //   selector: 'app-settings',
// // // // // //   standalone: true,
// // // // // //   imports: [CommonModule, FormsModule],
// // // // // //   template: `
// // // // // //     <div class="page-header">
// // // // // //       <div>
// // // // // //         <h2>الإعدادات العامة للنظام</h2>
// // // // // //         <p>تخصيص الخيارات الافتراضية واللغة والمظهر ووضع صيانة الموقع</p>
// // // // // //       </div>
// // // // // //     </div>

// // // // // //     <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
// // // // // //       <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // // //         <i class="fas fa-sliders-h" style="margin-left: 6px; color: var(--primary);"></i> خيارات الواجهة والتشغيل
// // // // // //       </h3>

// // // // // //       <div class="form-row">
// // // // // //         <div class="form-group">
// // // // // //           <label>اللغة الافتراضية</label>
// // // // // //           <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage" class="form-control">
// // // // // //             <option value="ar">العربية (Arabic)</option>
// // // // // //             <option value="en">English (الانجليزية)</option>
// // // // // //           </select>
// // // // // //         </div>

// // // // // //         <div class="form-group">
// // // // // //           <label>المظهر الافتراضي للموقع (Theme)</label>
// // // // // //           <select [(ngModel)]="data.defaultTheme" name="defaultTheme" class="form-control">
// // // // // //             <option value="dark">الوضع الداكن (Dark)</option>
// // // // // //             <option value="light">الوضع الفاتح (Light)</option>
// // // // // //             <option value="blue">اللون الأزرق (Ocean Blue)</option>
// // // // // //             <option value="royal">اللون الملكي (Royal Purple)</option>
// // // // // //             <option value="midnight">منتصف الليل (Midnight Accent)</option>
// // // // // //             <option value="emerald">اللون الزمردي (Emerald Green)</option>
// // // // // //           </select>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // // //         <i class="fas fa-paragraph" style="margin-left: 6px; color: var(--primary);"></i> محتويات التذييل (Footer Copy)
// // // // // //       </h3>

// // // // // //       <div class="form-row">
// // // // // //         <div class="form-group">
// // // // // //           <label>نص التذييل (عربي)</label>
// // // // // //           <input [(ngModel)]="data.footerTextAr" name="footerTextAr" class="form-control" placeholder="مثال: جميع الحقوق محفوظة لعيادة الدكتور أحمد قنديل">
// // // // // //         </div>
// // // // // //         <div class="form-group">
// // // // // //           <label>نص التذييل (إنجليزي)</label>
// // // // // //           <input [(ngModel)]="data.footerTextEn" name="footerTextEn" class="form-control" placeholder="Example: All Rights Reserved to Dr. Ahmed Kandil clinic">
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // // //         <i class="fas fa-cogs" style="margin-left: 6px; color: var(--primary);"></i> حالة الخادم والصيانة
// // // // // //       </h3>

// // // // // //       <div class="form-group" style="margin-bottom: 1.5rem;">
// // // // // //         <label class="checkbox-container">
// // // // // //           <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
// // // // // //           <span>تفعيل وضع الصيانة (إيقاف واجهة المستخدم وتوجيه الزوار لصفحة الصيانة)</span>
// // // // // //         </label>
// // // // // //       </div>

// // // // // //       <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
// // // // // //         <button type="submit" class="btn-save" style="padding: 0.75rem 2.5rem;">
// // // // // //           <i class="fas fa-save"></i> حفظ إعدادات النظام
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </form>
// // // // // //   `,
// // // // // //   styles: []
// // // // // // })
// // // // // // export class SettingsComponent implements OnInit {
// // // // // //   data: SettingsDto = {
// // // // // //     defaultLanguage: 'ar',
// // // // // //     defaultTheme: 'dark',
// // // // // //     isMaintenanceMode: false,
// // // // // //     footerTextAr: '',
// // // // // //     footerTextEn: ''
// // // // // //   };

// // // // // //   constructor(
// // // // // //     private api: ApiService,
// // // // // //     private toast: ToastService,
// // // // // //     private dataService: DashboardDataService
// // // // // //   ) {}

// // // // // //   ngOnInit() {
// // // // // //     this.dataService.settings$.subscribe((d) => {
// // // // // //       if (d) this.data = d;
// // // // // //     });
// // // // // //     if (!this.dataService.loaded) {
// // // // // //       this.api.getSettings().subscribe((d) => this.dataService.settings$.next(d));
// // // // // //     }
// // // // // //   }

// // // // // //   save() {
// // // // // //     this.api.updateSettings(this.data).subscribe({
// // // // // //       next: (d) => {
// // // // // //         this.dataService.settings$.next(d);
// // // // // //         this.toast.show('تم حفظ الإعدادات', 'success');
// // // // // //       },
// // // // // //       error: () => this.toast.show('خطأ', 'error')
// // // // // //     });
// // // // // //   }
// // // // // // }


// // // // // import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common';
// // // // // import { FormsModule } from '@angular/forms';
// // // // // import { finalize } from 'rxjs/operators';

// // // // // import { ApiService } from '../../../core/services/api.service';
// // // // // import { ToastService } from '../../../core/services/toast.service';
// // // // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // // // import { SettingsDto } from '../../../models/portfolio.models';

// // // // // @Component({
// // // // //   selector: 'app-settings',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, FormsModule],
// // // // //   template: `
// // // // //     <div class="page-header">
// // // // //       <div>
// // // // //         <h2>الإعدادات العامة للنظام</h2>
// // // // //         <p>تخصيص الخيارات الافتراضية واللغة والمظهر ووضع صيانة الموقع</p>
// // // // //       </div>
// // // // //     </div>

// // // // //     <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
// // // // //       <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // //         <i class="fas fa-sliders-h" style="margin-left: 6px; color: var(--primary);"></i> خيارات الواجهة والتشغيل
// // // // //       </h3>

// // // // //       <div class="form-row">
// // // // //         <div class="form-group">
// // // // //           <label>اللغة الافتراضية</label>
// // // // //           <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage" class="form-control">
// // // // //             <option value="ar">العربية (Arabic)</option>
// // // // //             <option value="en">English (الانجليزية)</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         <div class="form-group">
// // // // //           <label>المظهر الافتراضي للموقع (Theme)</label>
// // // // //           <select [(ngModel)]="data.defaultTheme" name="defaultTheme" class="form-control">
// // // // //             <option value="dark">الوضع الداكن (Dark)</option>
// // // // //             <option value="light">الوضع الفاتح (Light)</option>
// // // // //             <option value="blue">اللون الأزرق (Ocean Blue)</option>
// // // // //             <option value="royal">اللون الملكي (Royal Purple)</option>
// // // // //             <option value="midnight">منتصف الليل (Midnight Accent)</option>
// // // // //             <option value="emerald">اللون الزمردي (Emerald Green)</option>
// // // // //           </select>
// // // // //         </div>
// // // // //       </div>

// // // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // //         <i class="fas fa-paragraph" style="margin-left: 6px; color: var(--primary);"></i> محتويات التذييل (Footer Copy)
// // // // //       </h3>

// // // // //       <div class="form-row">
// // // // //         <div class="form-group">
// // // // //           <label>نص التذييل (عربي)</label>
// // // // //           <input [(ngModel)]="data.footerTextAr" name="footerTextAr" class="form-control" placeholder="مثال: جميع الحقوق محفوظة لعيادة الدكتور أحمد قنديل">
// // // // //         </div>
// // // // //         <div class="form-group">
// // // // //           <label>نص التذييل (إنجليزي)</label>
// // // // //           <input [(ngModel)]="data.footerTextEn" name="footerTextEn" class="form-control" placeholder="Example: All Rights Reserved to Dr. Ahmed Kandil clinic">
// // // // //         </div>
// // // // //       </div>

// // // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // // //         <i class="fas fa-cogs" style="margin-left: 6px; color: var(--primary);"></i> حالة الخادم والصيانة
// // // // //       </h3>

// // // // //       <div class="form-group" style="margin-bottom: 1.5rem;">
// // // // //         <label class="checkbox-container">
// // // // //           <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
// // // // //           <span>تفعيل وضع الصيانة (إيقاف واجهة المستخدم وتوجيه الزوار لصفحة الصيانة)</span>
// // // // //         </label>
// // // // //       </div>

// // // // //       <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
// // // // //         <button type="submit" class="btn-save" [disabled]="saving" style="padding: 0.75rem 2.5rem;">
// // // // //           <i class="fas fa-save"></i> {{ saving ? 'جاري الحفظ...' : 'حفظ إعدادات النظام' }}
// // // // //         </button>
// // // // //       </div>
// // // // //     </form>
// // // // //   `,
// // // // //   styles: []
// // // // // })
// // // // // export class SettingsComponent implements OnInit {
// // // // //   data: SettingsDto = {
// // // // //     defaultLanguage: 'ar',
// // // // //     defaultTheme: 'dark',
// // // // //     isMaintenanceMode: false,
// // // // //     footerTextAr: '',
// // // // //     footerTextEn: ''
// // // // //   };

// // // // //   saving = false;

// // // // //   constructor(
// // // // //     private api: ApiService,
// // // // //     private toast: ToastService,
// // // // //     private dataService: DashboardDataService,
// // // // //     private cdr: ChangeDetectorRef
// // // // //   ) {}

// // // // //   ngOnInit() {
// // // // //     this.dataService.settings$.subscribe((d) => {
// // // // //       if (d) {
// // // // //         this.data = d;
// // // // //         this.cdr.detectChanges();
// // // // //       }
// // // // //     });
// // // // //     if (!this.dataService.loaded) {
// // // // //       this.loadData();
// // // // //     }
// // // // //   }

// // // // //   loadData() {
// // // // //     this.api.getSettings().subscribe({
// // // // //       next: (d) => this.dataService.settings$.next(d),
// // // // //       error: () => this.toast.show('فشل تحميل الإعدادات', 'error')
// // // // //     });
// // // // //   }

// // // // //   save() {
// // // // //     if (this.saving) return;

// // // // //     this.saving = true;
// // // // //     this.cdr.detectChanges();

// // // // //     this.api.updateSettings(this.data).pipe(
// // // // //       finalize(() => {
// // // // //         this.saving = false;
// // // // //         this.cdr.detectChanges();
// // // // //       })
// // // // //     ).subscribe({
// // // // //       next: (d) => {
// // // // //         this.dataService.settings$.next(d);
// // // // //         this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
// // // // //         // إعادة تحميل البيانات للتأكد من أحدث إصدار (قد يكون السيرفر عدّل شيئاً)
// // // // //         this.loadData();
// // // // //       },
// // // // //       error: () => {
// // // // //         this.toast.show('حدث خطأ أثناء حفظ الإعدادات', 'error');
// // // // //       }
// // // // //     });
// // // // //   }
// // // // // }
// // // // import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { FormsModule } from '@angular/forms';
// // // // import { finalize, catchError } from 'rxjs/operators';
// // // // import { throwError } from 'rxjs';

// // // // import { ApiService } from '../../../core/services/api.service';
// // // // import { ToastService } from '../../../core/services/toast.service';
// // // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // // import { SettingsDto } from '../../../models/portfolio.models';

// // // // @Component({
// // // //   selector: 'app-settings',
// // // //   standalone: true,
// // // //   imports: [CommonModule, FormsModule],
// // // //   template: `
// // // //     <div class="page-header">
// // // //       <div>
// // // //         <h2>الإعدادات العامة للنظام</h2>
// // // //         <p>تخصيص الخيارات الافتراضية واللغة والمظهر ووضع صيانة الموقع</p>
// // // //       </div>
// // // //     </div>

// // // //     <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
// // // //       <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // //         <i class="fas fa-sliders-h" style="margin-left: 6px; color: var(--primary);"></i> خيارات الواجهة والتشغيل
// // // //       </h3>

// // // //       <div class="form-row">
// // // //         <div class="form-group">
// // // //           <label>اللغة الافتراضية</label>
// // // //           <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage" class="form-control">
// // // //             <option value="ar">العربية (Arabic)</option>
// // // //             <option value="en">English (الانجليزية)</option>
// // // //           </select>
// // // //         </div>

// // // //         <div class="form-group">
// // // //           <label>المظهر الافتراضي للموقع (Theme)</label>
// // // //           <select [(ngModel)]="data.defaultTheme" name="defaultTheme" class="form-control">
// // // //             <option value="dark">الوضع الداكن (Dark)</option>
// // // //             <option value="light">الوضع الفاتح (Light)</option>
// // // //             <option value="blue">اللون الأزرق (Ocean Blue)</option>
// // // //             <option value="royal">اللون الملكي (Royal Purple)</option>
// // // //             <option value="midnight">منتصف الليل (Midnight Accent)</option>
// // // //             <option value="emerald">اللون الزمردي (Emerald Green)</option>
// // // //           </select>
// // // //         </div>
// // // //       </div>

// // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // //         <i class="fas fa-paragraph" style="margin-left: 6px; color: var(--primary);"></i> محتويات التذييل (Footer Copy)
// // // //       </h3>

// // // //       <div class="form-row">
// // // //         <div class="form-group">
// // // //           <label>نص التذييل (عربي)</label>
// // // //           <input [(ngModel)]="data.footerTextAr" name="footerTextAr" class="form-control" placeholder="مثال: جميع الحقوق محفوظة لعيادة الدكتور أحمد قنديل">
// // // //         </div>
// // // //         <div class="form-group">
// // // //           <label>نص التذييل (إنجليزي)</label>
// // // //           <input [(ngModel)]="data.footerTextEn" name="footerTextEn" class="form-control" placeholder="Example: All Rights Reserved to Dr. Ahmed Kandil clinic">
// // // //         </div>
// // // //       </div>

// // // //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// // // //         <i class="fas fa-cogs" style="margin-left: 6px; color: var(--primary);"></i> حالة الخادم والصيانة
// // // //       </h3>

// // // //       <div class="form-group" style="margin-bottom: 1.5rem;">
// // // //         <label class="checkbox-container">
// // // //           <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
// // // //           <span>تفعيل وضع الصيانة (إيقاف واجهة المستخدم وتوجيه الزوار لصفحة الصيانة)</span>
// // // //         </label>
// // // //       </div>

// // // //       <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
// // // //         <button type="submit" class="btn-save" [disabled]="saving" style="padding: 0.75rem 2.5rem;">
// // // //           <i class="fas fa-save"></i> {{ saving ? 'جاري الحفظ...' : 'حفظ إعدادات النظام' }}
// // // //         </button>
// // // //       </div>
// // // //     </form>
// // // //   `,
// // // //   styles: []
// // // // })
// // // // export class SettingsComponent implements OnInit {
// // // //   data: SettingsDto = {
// // // //     defaultLanguage: 'ar',
// // // //     defaultTheme: 'dark',
// // // //     isMaintenanceMode: false,
// // // //     footerTextAr: '',
// // // //     footerTextEn: ''
// // // //   };

// // // //   saving = false;

// // // //   constructor(
// // // //     private api: ApiService,
// // // //     private toast: ToastService,
// // // //     private dataService: DashboardDataService,
// // // //     private cdr: ChangeDetectorRef,
// // // //     private zone: NgZone
// // // //   ) {}

// // // //   ngOnInit() {
// // // //     this.dataService.settings$.subscribe((d) => {
// // // //       if (d) {
// // // //         this.data = d;
// // // //         this.cdr.detectChanges();
// // // //       }
// // // //     });
// // // //     if (!this.dataService.loaded) {
// // // //       this.loadData();
// // // //     }
// // // //   }

// // // //   loadData() {
// // // //     this.api.getSettings().subscribe({
// // // //       next: (d) => this.dataService.settings$.next(d),
// // // //       error: () => this.toast.show('فشل تحميل الإعدادات', 'error')
// // // //     });
// // // //   }

// // // //   save() {
// // // //     // منع النقر المتعدد
// // // //     if (this.saving) {
// // // //       console.warn('[Settings] محاولة حفظ أثناء عملية جارية');
// // // //       return;
// // // //     }

// // // //     console.log('[Settings] بدء عملية الحفظ...');

// // // //     // تعطيل الزر وتحديث الواجهة فوراً داخل NgZone
// // // //     this.zone.run(() => {
// // // //       this.saving = true;
// // // //       this.cdr.detectChanges();
// // // //     });

// // // //     this.api.updateSettings(this.data).pipe(
// // // //       catchError((err) => {
// // // //         console.error('[Settings] خطأ في الطلب:', err);
// // // //         // عرض توست الخطأ
// // // //         this.zone.run(() => {
// // // //           this.toast.show(err?.error?.message || 'حدث خطأ أثناء حفظ الإعدادات', 'error');
// // // //         });
// // // //         // إعادة إلقاء الخطأ للوصول إلى finalize
// // // //         return throwError(() => err);
// // // //       }),
// // // //       finalize(() => {
// // // //         // إعادة تفعيل الزر بعد الانتهاء من الطلب (نجاح أو فشل)
// // // //         this.zone.run(() => {
// // // //           this.saving = false;
// // // //           this.cdr.detectChanges();
// // // //         });
// // // //         console.log('[Settings] finalize - تم تحرير الزر');
// // // //       })
// // // //     ).subscribe({
// // // //       next: (d) => {
// // // //         console.log('[Settings] تم الحفظ بنجاح');
// // // //         // تحديث الكاش المحلي
// // // //         this.dataService.settings$.next(d);
// // // //         // عرض رسالة نجاح
// // // //         this.zone.run(() => {
// // // //           this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
// // // //         });
// // // //         // إعادة تحميل البيانات من السيرفر للتأكد من أحدث إصدار (اختياري)
// // // //         this.loadData();
// // // //       },
// // // //       error: (err) => {
// // // //         // تم التعامل مع الخطأ في catchError أعلاه، لكن نضع هذا للسلامة
// // // //         console.error('[Settings] خطأ في subscribe:', err);
// // // //       }
// // // //     });
// // // //   }
// // // // }
// // // import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { FormsModule } from '@angular/forms';
// // // import { finalize } from 'rxjs/operators';

// // // import { ApiService } from '../../../core/services/api.service';
// // // import { ToastService } from '../../../core/services/toast.service';
// // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // import { SettingsDto } from '../../../models/portfolio.models';

// // // @Component({
// // //   selector: 'app-settings',
// // //   standalone: true,
// // //   imports: [CommonModule, FormsModule],
// // //   template: ` ... (نفس القالب السابق مع إضافة `[disabled]="saving"` على زر الحفظ وتغيير النص) ... `,
// // //   styles: []
// // // })
// // // export class SettingsComponent implements OnInit {
// // //   data: SettingsDto = {
// // //     defaultLanguage: 'ar',
// // //     defaultTheme: 'dark',
// // //     isMaintenanceMode: false,
// // //     footerTextAr: '',
// // //     footerTextEn: ''
// // //   };

// // //   saving = false;

// // //   constructor(
// // //     private api: ApiService,
// // //     private toast: ToastService,
// // //     private dataService: DashboardDataService,
// // //     private cdr: ChangeDetectorRef
// // //   ) {}

// // //   ngOnInit() {
// // //     this.dataService.settings$.subscribe((d) => {
// // //       if (d) {
// // //         this.data = d;
// // //         this.cdr.detectChanges();
// // //       }
// // //     });
// // //     if (!this.dataService.loaded) {
// // //       this.loadData();
// // //     }
// // //   }

// // //   loadData() {
// // //     this.api.getSettings().subscribe({
// // //       next: (d) => this.dataService.settings$.next(d),
// // //       error: () => this.toast.show('فشل تحميل الإعدادات', 'error')
// // //     });
// // //   }

// // //   save() {
// // //     if (this.saving) return;

// // //     this.saving = true;
// // //     this.cdr.detectChanges();

// // //     this.api.updateSettings(this.data).pipe(
// // //       finalize(() => {
// // //         this.saving = false;
// // //         this.cdr.detectChanges();
// // //       })
// // //     ).subscribe({
// // //       next: (d) => {
// // //         this.dataService.settings$.next(d);
// // //         this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
// // //         this.loadData(); // إعادة تحميل للتأكد من تحديث البيانات
// // //       },
// // //       error: (err) => {
// // //         this.toast.show('حدث خطأ أثناء حفظ الإعدادات', 'error');
// // //         console.error(err);
// // //       }
// // //     });
// // //   }
// // // }

// // import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { finalize } from 'rxjs/operators';

// // import { ApiService } from '../../../core/services/api.service';
// // import { ToastService } from '../../../core/services/toast.service';
// // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // import { SettingsDto } from '../../../models/portfolio.models';

// // @Component({
// //   selector: 'app-settings',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="page-header">
// //       <div>
// //         <h2>الإعدادات العامة للنظام</h2>
// //         <p>تخصيص الخيارات الافتراضية واللغة والمظهر ووضع صيانة الموقع</p>
// //       </div>
// //     </div>

// //     <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
// //       <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// //         <i class="fas fa-sliders-h" style="margin-left: 6px; color: var(--primary);"></i> خيارات الواجهة والتشغيل
// //       </h3>

// //       <div class="form-row">
// //         <div class="form-group">
// //           <label>اللغة الافتراضية</label>
// //           <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage" class="form-control">
// //             <option value="ar">العربية (Arabic)</option>
// //             <option value="en">English (الانجليزية)</option>
// //           </select>
// //         </div>

// //         <div class="form-group">
// //           <label>المظهر الافتراضي للموقع (Theme)</label>
// //           <select [(ngModel)]="data.defaultTheme" name="defaultTheme" class="form-control">
// //             <option value="dark">الوضع الداكن (Dark)</option>
// //             <option value="light">الوضع الفاتح (Light)</option>
// //             <option value="blue">اللون الأزرق (Ocean Blue)</option>
// //             <option value="royal">اللون الملكي (Royal Purple)</option>
// //             <option value="midnight">منتصف الليل (Midnight Accent)</option>
// //             <option value="emerald">اللون الزمردي (Emerald Green)</option>
// //           </select>
// //         </div>
// //       </div>

// //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// //         <i class="fas fa-paragraph" style="margin-left: 6px; color: var(--primary);"></i> محتويات التذييل (Footer Copy)
// //       </h3>

// //       <div class="form-row">
// //         <div class="form-group">
// //           <label>نص التذييل (عربي)</label>
// //           <input [(ngModel)]="data.footerTextAr" name="footerTextAr" class="form-control" placeholder="مثال: جميع الحقوق محفوظة لعيادة الدكتور أحمد قنديل">
// //         </div>
// //         <div class="form-group">
// //           <label>نص التذييل (إنجليزي)</label>
// //           <input [(ngModel)]="data.footerTextEn" name="footerTextEn" class="form-control" placeholder="Example: All Rights Reserved to Dr. Ahmed Kandil clinic">
// //         </div>
// //       </div>

// //       <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
// //         <i class="fas fa-cogs" style="margin-left: 6px; color: var(--primary);"></i> حالة الخادم والصيانة
// //       </h3>

// //       <div class="form-group" style="margin-bottom: 1.5rem;">
// //         <label class="checkbox-container">
// //           <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
// //           <span>تفعيل وضع الصيانة (إيقاف واجهة المستخدم وتوجيه الزوار لصفحة الصيانة)</span>
// //         </label>
// //       </div>

// //       <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
// //         <button type="submit" class="btn-save" [disabled]="saving" style="padding: 0.75rem 2.5rem;">
// //           <i class="fas fa-save"></i> {{ saving ? 'جاري الحفظ...' : 'حفظ إعدادات النظام' }}
// //         </button>
// //       </div>
// //     </form>
// //   `,
// //   styles: []
// // })
// // export class SettingsComponent implements OnInit {
// //   data: SettingsDto = {
// //     defaultLanguage: 'ar',
// //     defaultTheme: 'dark',
// //     isMaintenanceMode: false,
// //     footerTextAr: '',
// //     footerTextEn: ''
// //   };

// //   saving = false;

// //   constructor(
// //     private api: ApiService,
// //     private toast: ToastService,
// //     private dataService: DashboardDataService,
// //     private cdr: ChangeDetectorRef
// //   ) {}

// //   ngOnInit() {
// //     this.dataService.settings$.subscribe((d) => {
// //       if (d) {
// //         this.data = d;
// //         this.cdr.detectChanges();
// //       }
// //     });
// //     if (!this.dataService.loaded) {
// //       this.loadData();
// //     }
// //   }

// //   loadData() {
// //     this.api.getSettings().subscribe({
// //       next: (d) => this.dataService.settings$.next(d),
// //       error: () => this.toast.show('فشل تحميل الإعدادات', 'error')
// //     });
// //   }

// //   save() {
// //     if (this.saving) return;

// //     this.saving = true;
// //     this.cdr.detectChanges();

// //     this.api.updateSettings(this.data).pipe(
// //       finalize(() => {
// //         this.saving = false;
// //         this.cdr.detectChanges();
// //       })
// //     ).subscribe({
// //       next: (d) => {
// //         this.dataService.settings$.next(d);
// //         this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
// //         this.loadData();
// //       },
// //       error: (err) => {
// //         this.toast.show('حدث خطأ أثناء حفظ الإعدادات', 'error');
// //         console.error(err);
// //       }
// //     });
// //   }
// // }
// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { finalize } from 'rxjs/operators';

// import { ApiService } from '../../../core/services/api.service';
// import { ToastService } from '../../../core/services/toast.service';
// import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// import { SettingsDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-settings',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './settings.component.html', // أو template مباشر
//   styleUrls: ['./settings.component.css']
// })
// export class SettingsComponent implements OnInit {
//   data: SettingsDto = {
//     defaultLanguage: 'ar',
//     defaultTheme: 'dark',
//     isMaintenanceMode: false,
//     footerTextAr: '',
//     footerTextEn: ''
//   };

//   saving = false;

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit() {
//     // اشترك في تحديثات الإعدادات
//     this.dataService.settings$.subscribe((d) => {
//       if (d) {
//         this.data = { ...d }; // نسخ لتجنب التعديل المباشر على BehaviorSubject
//         this.cdr.detectChanges();
//       }
//     });

//     // إذا لم تكن البيانات محملة مسبقاً، قم بتحميلها
//     if (!this.dataService.loaded) {
//       this.loadData();
//     }
//   }

//   loadData() {
//     this.api.getSettings().subscribe({
//       next: (d) => {
//         this.dataService.settings$.next(d);
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         console.error('فشل تحميل الإعدادات:', err);
//         this.toast.show('فشل تحميل الإعدادات', 'error');
//       }
//     });
//   }

//   save() {
//     if (this.saving) return;

//     this.saving = true;
//     this.cdr.detectChanges();

//     this.api.updateSettings(this.data).pipe(
//       finalize(() => {
//         this.saving = false;
//         this.cdr.detectChanges();
//       })
//     ).subscribe({
//       next: (d) => {
//         this.dataService.settings$.next(d);
//         this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
//         this.loadData(); // إعادة تحميل للتأكد من تحديث البيانات
//       },
//       error: (err) => {
//         console.error('خطأ في الحفظ:', err);
//         this.toast.show('حدث خطأ أثناء حفظ الإعدادات', 'error');
//       }
//     });
//   }
// }
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { SettingsDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>الإعدادات العامة للنظام</h2>
        <p>تخصيص الخيارات الافتراضية واللغة والمظهر ووضع صيانة الموقع</p>
      </div>
    </div>

    <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
      <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <i class="fas fa-sliders-h" style="margin-left: 6px; color: var(--primary);"></i> خيارات الواجهة والتشغيل
      </h3>

      <div class="form-row">
        <div class="form-group">
          <label>اللغة الافتراضية</label>
          <select [(ngModel)]="data.defaultLanguage" name="defaultLanguage" class="form-control">
            <option value="ar">العربية (Arabic)</option>
            <option value="en">English (الانجليزية)</option>
          </select>
        </div>

        <div class="form-group">
          <label>المظهر الافتراضي للموقع (Theme)</label>
          <select [(ngModel)]="data.defaultTheme" name="defaultTheme" class="form-control">
            <option value="dark">الوضع الداكن (Dark)</option>
            <option value="light">الوضع الفاتح (Light)</option>
            <option value="blue">اللون الأزرق (Ocean Blue)</option>
            <option value="royal">اللون الملكي (Royal Purple)</option>
            <option value="midnight">منتصف الليل (Midnight Accent)</option>
            <option value="emerald">اللون الزمردي (Emerald Green)</option>
          </select>
        </div>
      </div>

      <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <i class="fas fa-paragraph" style="margin-left: 6px; color: var(--primary);"></i> محتويات التذييل (Footer Copy)
      </h3>

      <div class="form-row">
        <div class="form-group">
          <label>نص التذييل (عربي)</label>
          <input [(ngModel)]="data.footerTextAr" name="footerTextAr" class="form-control" placeholder="مثال: جميع الحقوق محفوظة لعيادة الدكتور أحمد قنديل">
        </div>
        <div class="form-group">
          <label>نص التذييل (إنجليزي)</label>
          <input [(ngModel)]="data.footerTextEn" name="footerTextEn" class="form-control" placeholder="Example: All Rights Reserved to Dr. Ahmed Kandil clinic">
        </div>
      </div>

      <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <i class="fas fa-cogs" style="margin-left: 6px; color: var(--primary);"></i> حالة الخادم والصيانة
      </h3>

      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label class="checkbox-container">
          <input type="checkbox" [(ngModel)]="data.isMaintenanceMode" name="isMaintenanceMode">
          <span>تفعيل وضع الصيانة (إيقاف واجهة المستخدم وتوجيه الزوار لصفحة الصيانة)</span>
        </label>
      </div>

      <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
        <button type="submit" class="btn-save" [disabled]="saving" style="padding: 0.75rem 2.5rem;">
          <i class="fas fa-save"></i> {{ saving ? 'جاري الحفظ...' : 'حفظ إعدادات النظام' }}
        </button>
      </div>
    </form>
  `,
  styles: [`@media (max-width: 768px) {
  .table-wrapper {
    overflow-x: auto;
  }
  .table {
    min-width: 600px;
  }
  .modal-content {
    max-width: 95%;
    margin: 0.5rem;
  }
}`]
})
export class SettingsComponent implements OnInit {
  data: SettingsDto = {
    defaultLanguage: 'ar',
    defaultTheme: 'dark',
    isMaintenanceMode: false,
    footerTextAr: '',
    footerTextEn: ''
  };

  saving = false;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.settings$.subscribe((d) => {
      if (d) {
        this.data = { ...d };
        this.cdr.detectChanges();
      }
    });
    if (!this.dataService.loaded) {
      this.loadData();
    }
  }

  loadData() {
    this.api.getSettings().subscribe({
      next: (d) => {
        this.dataService.settings$.next(d);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('فشل تحميل الإعدادات:', err);
        this.toast.show('فشل تحميل الإعدادات', 'error');
      }
    });
  }

  save() {
    if (this.saving) return;

    this.saving = true;
    this.cdr.detectChanges();

    this.api.updateSettings(this.data).pipe(
      finalize(() => {
        this.saving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (d) => {
        this.dataService.settings$.next(d);
        this.toast.show('تم حفظ الإعدادات بنجاح ✅', 'success');
        this.loadData();
      },
      error: (err) => {
        console.error('خطأ في الحفظ:', err);
        this.toast.show('حدث خطأ أثناء حفظ الإعدادات', 'error');
      }
    });
  }
}