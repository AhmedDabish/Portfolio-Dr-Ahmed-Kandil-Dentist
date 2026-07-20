import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ContactDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>تعديل معلومات التواصل والعيادة</h2>
        <p>تحديث أرقام الهاتف، البريد الإلكتروني، الحسابات الرسمية وساعات العمل</p>
      </div>
    </div>

    <form (ngSubmit)="save()" #f="ngForm" class="panel-card fade-in-up">
      <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <i class="fas fa-address-book" style="margin-left: 6px; color: var(--primary);"></i> البيانات الأساسية للتواصل
      </h3>
      
      <div class="form-row">
        <div class="form-group">
          <label>رقم الهاتف</label>
          <input [(ngModel)]="data.phone" name="phone" class="form-control" placeholder="مثال: +20 100 000 0000">
        </div>
        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input [(ngModel)]="data.email" name="email" class="form-control" type="email" placeholder="example@domain.com">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>العنوان الجغرافي (عربي)</label>
          <input [(ngModel)]="data.addressAr" name="addressAr" class="form-control" placeholder="مثال: القاهرة، مصر">
        </div>
        <div class="form-group">
          <label>العنوان الجغرافي (إنجليزي)</label>
          <input [(ngModel)]="data.addressEn" name="addressEn" class="form-control" placeholder="Example: Cairo, Egypt">
        </div>
      </div>

      <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <i class="fas fa-share-alt" style="margin-left: 6px; color: var(--primary);"></i> حسابات التواصل الاجتماعي
      </h3>
      
      <div class="form-row">
        <div class="form-group">
          <label><i class="fab fa-linkedin" style="margin-left: 4px; color: #0a66c2;"></i> LinkedIn</label>
          <input [(ngModel)]="data.linkedInUrl" name="linkedInUrl" class="form-control" placeholder="رابط الحساب على لينكد إن">
        </div>
        <div class="form-group">
          <label><i class="fab fa-instagram" style="margin-left: 4px; color: #e1306c;"></i> Instagram</label>
          <input [(ngModel)]="data.instagramUrl" name="instagramUrl" class="form-control" placeholder="رابط الحساب على إنستغرام">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label><i class="fab fa-facebook" style="margin-left: 4px; color: #1877f2;"></i> Facebook</label>
          <input [(ngModel)]="data.facebookUrl" name="facebookUrl" class="form-control" placeholder="رابط الصفحة على فيسبوك">
        </div>
        <div class="form-group">
          <label><i class="fab fa-whatsapp" style="margin-left: 4px; color: #25d366;"></i> WhatsApp</label>
          <input [(ngModel)]="data.whatsAppUrl" name="whatsAppUrl" class="form-control" placeholder="رابط الدردشة على واتساب">
        </div>
      </div>

      <h3 style="margin-top: 2rem; margin-bottom: 1.25rem; font-size: 1.15rem; color: var(--text-dark); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span><i class="fas fa-clock" style="margin-left: 6px; color: var(--primary);"></i> مواعيد العمل بالعيادة</span>
        <button type="button" class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem;" (click)="addHour()">
          <i class="fas fa-plus"></i> إضافة موعد جديد
        </button>
      </h3>

      <div *ngIf="data.workingHours.length === 0" style="text-align: center; padding: 2rem; color: var(--text-light); border: 2px dashed var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
        <i class="fas fa-calendar-times" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        <span>لا توجد ساعات عمل مدخلة.</span>
      </div>

      <div *ngFor="let hour of data.workingHours; let i=index" class="working-hour-row">
        <div class="form-group" style="flex: 1.4;">
          <input [(ngModel)]="hour.dayLabelAr" [name]="'dayLabelAr' + i" placeholder="اليوم بالعربية (مثال: السبت - الخميس)" class="form-control">
        </div>

        <div class="form-group" style="flex: 1.4;">
          <input [(ngModel)]="hour.dayLabelEn" [name]="'dayLabelEn' + i" placeholder="English days (e.g. Sat - Thu)" class="form-control">
        </div>

        <div class="form-group" style="flex: 1.6;">
          <input [(ngModel)]="hour.hoursText" [name]="'hoursText' + i" placeholder="الوقت (مثال: 4:00 م - 9:00 م)" class="form-control">
        </div>

        <div class="form-group" style="flex: 0.6; min-width: 92px;">
          <input type="number"
                 [(ngModel)]="hour.sortOrder"
                 [name]="'sortOrder' + i"
                 placeholder="ترتيب"
                 class="form-control"
                 title="ترتيب العرض">
        </div>

        <button type="button"
                class="btn-delete"
                style="margin-top: 0; flex: 0 0 auto;"
                (click)="removeHour(i)"
                title="حذف الموعد">
          <i class="fas fa-trash"></i>
        </button>
      </div>

      <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end;">
        <button type="submit" class="btn-save" [disabled]="saving" style="padding: 0.75rem 2.5rem;">
          <i class="fas fa-save"></i> {{ saving ? 'جاري الحفظ...' : 'حفظ جميع تعديلات التواصل' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    /* ============================================================
       WORKING HOUR ROW - متوافق مع الثيمات
       ============================================================ */
    .working-hour-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
      padding: 0.85rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      transition: background var(--transition), border-color var(--transition);
    }

    /* تحسين مظهر الحقول داخل الصف */
    .working-hour-row .form-group {
      margin-bottom: 0;
    }

    /* زر الحذف في وضع الداكن */
    .working-hour-row .btn-delete {
      background: var(--danger-light);
      color: var(--danger);
      border: none;
      border-radius: var(--radius-xs);
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
    }
    .working-hour-row .btn-delete:hover {
      background: var(--danger);
      color: #fff;
    }

    /* ضمان توافق الحقول مع الثيم */
    .working-hour-row .form-control {
      background: var(--bg-input);
      color: var(--text-dark);
      border-color: var(--border-color);
    }
    .working-hour-row .form-control:focus {
      background: var(--bg-card);
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--border-focus);
    }

    /* حالة عدم وجود ساعات عمل */
    .empty-hours {
      text-align: center;
      padding: 2rem;
      color: var(--text-light);
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-sm);
      margin-bottom: 1.5rem;
    }

    /* عنوان القسم */
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      margin-bottom: 1.25rem;
      font-size: 1.15rem;
      color: var(--text-dark);
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
    }
      @media (max-width: 640px) {
  .working-hour-row {
    flex-wrap: wrap;
  }
  .working-hour-row .form-group {
    flex: 1 1 100% !important;
    min-width: unset;
  }
  .working-hour-row .btn-delete {
    align-self: flex-end;
  }
}
  @media (max-width: 768px) {
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
}
  `]
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

  saving = false;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.contact$.subscribe((d) => {
      if (d) {
        this.data = d;
        this.cdr.detectChanges();
      }
    });
    if (!this.dataService.loaded) {
      this.loadData();
    }
  }

  loadData() {
    this.api.getContact().subscribe({
      next: (d) => this.dataService.contact$.next(d),
      error: () => this.toast.show('فشل تحميل بيانات التواصل', 'error')
    });
  }

  addHour() {
    this.data.workingHours.push({
      dayLabelAr: '',
      dayLabelEn: '',
      hoursText: '',
      sortOrder: this.data.workingHours.length + 1
    });
  }

  removeHour(index: number) {
    this.data.workingHours.splice(index, 1);
  }

  save() {
    if (this.saving) return;

    this.saving = true;
    this.cdr.detectChanges();

    this.api.updateContact(this.data).pipe(
      finalize(() => {
        this.saving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (d) => {
        this.dataService.contact$.next(d);
        this.toast.show('تم حفظ التواصل بنجاح ✅', 'success');
        this.loadData();
      },
      error: () => {
        this.toast.show('حدث خطأ أثناء الحفظ', 'error');
      }
    });
  }
}