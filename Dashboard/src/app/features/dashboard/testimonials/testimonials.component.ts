// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // import { ApiService } from '../../../core/services/api.service';
// // import { ToastService } from '../../../core/services/toast.service';
// // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // import { TestimonialDto } from '../../../models/portfolio.models';

// // @Component({
// //   selector: 'app-testimonials',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="page-header">
// //       <div>
// //         <h2>إدارة آراء وشهادات المرضى</h2>
// //         <p>عرض وتعديل التقييمات والشهادات الطبية المعروضة على موقعك</p>
// //       </div>
// //       <button class="btn-add" (click)="edit(null)">
// //         <i class="fas fa-plus"></i> إضافة شهادة جديدة
// //       </button>
// //     </div>

// //     <div class="table-wrapper">
// //       <table class="table">
// //         <thead>
// //           <tr>
// //             <th>نص التقييم / الشهادة (عربي)</th>
// //             <th style="width: 220px;">اسم صاحب الشهادة</th>
// //             <th style="width: 120px;">الحالة</th>
// //             <th style="width: 140px; text-align: center;">الإجراءات</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr *ngIf="list.length === 0">
// //             <td colspan="4" class="empty-state">
// //               <i class="fas fa-quote-right"></i>
// //               <span>لا توجد تقييمات أو شهادات مضافة حالياً.</span>
// //             </td>
// //           </tr>
// //           <tr *ngFor="let item of list">
// //             <td><em>"{{ item.textAr.substring(0, 80) }}{{ item.textAr.length > 80 ? '...' : '' }}"</em></td>
// //             <td><strong>{{ item.authorAr }}</strong></td>
// //             <td>
// //               <span class="badge" [class.active]="item.isActive" [class.inactive]="!item.isActive">
// //                 <span class="dot"></span>
// //                 {{ item.isActive ? 'نشط' : 'غير نشط' }}
// //               </span>
// //             </td>
// //             <td style="text-align: center;">
// //               <button class="btn-edit" (click)="edit(item)" title="تعديل">
// //                 <i class="fas fa-edit"></i>
// //               </button>
// //               <button class="btn-delete" (click)="delete(item.id!)" title="حذف">
// //                 <i class="fas fa-trash"></i>
// //               </button>
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>

// //     <!-- Modal -->
// //     <div class="modal-overlay" *ngIf="editing" (click)="editing=null">
// //       <div class="modal-content" (click)="$event.stopPropagation()">
// //         <div class="modal-header">
// //           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} شهادة مريض</h3>
// //           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
// //         </div>

// //         <div class="modal-body">
// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>نص التقييم (عربي)</label>
// //               <textarea [(ngModel)]="editing.textAr" class="form-control" rows="4" placeholder="اكتب رأي المريض بالعربية..."></textarea>
// //             </div>
// //             <div class="form-group">
// //               <label>نص التقييم (إنجليزي)</label>
// //               <textarea [(ngModel)]="editing.textEn" class="form-control" rows="4" placeholder="Write feedback in English..."></textarea>
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>اسم الكاتب (عربي)</label>
// //               <input [(ngModel)]="editing.authorAr" class="form-control" placeholder="مثال: محمد أحمد">
// //             </div>
// //             <div class="form-group">
// //               <label>اسم الكاتب (إنجليزي)</label>
// //               <input [(ngModel)]="editing.authorEn" class="form-control" placeholder="Example: Mohamed Ahmed">
// //             </div>
// //           </div>

// //           <div class="form-row" style="align-items: center;">
// //             <div class="form-group">
// //               <label>الترتيب في العرض</label>
// //               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
// //             </div>
// //             <div class="form-group" style="padding-top: 1.5rem;">
// //               <label class="checkbox-container">
// //                 <input type="checkbox" [(ngModel)]="editing.isActive">
// //                 <span>تفعيل ونشر هذه الشهادة</span>
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         <div class="modal-footer">
// //           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
// //           <button class="btn-save" (click)="save()">حفظ الشهادة</button>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: []
// // })
// // export class TestimonialsComponent implements OnInit {
// //   list: TestimonialDto[] = [];
// //   editing: TestimonialDto | null = null;

// //   constructor(
// //     private api: ApiService,
// //     private toast: ToastService,
// //     private dataService: DashboardDataService
// //   ) {}

// //   ngOnInit() {
// //     this.dataService.testimonials$.subscribe((d) => (this.list = d));
// //     if (!this.dataService.loaded) this.load();
// //   }

// //   load() {
// //     this.api.getTestimonials().subscribe((d) => this.dataService.testimonials$.next(d));
// //   }

// //   edit(item: TestimonialDto | null) {
// //     this.editing = item ? { ...item } : ({ sortOrder: 0, isActive: true } as TestimonialDto);
// //   }

// //   save() {
// //     if (!this.editing) return;

// //     const obs = this.editing.id
// //       ? this.api.updateTestimonial(this.editing.id, this.editing)
// //       : this.api.createTestimonial(this.editing);

// //     obs.subscribe({
// //       next: () => {
// //         this.toast.show('تم الحفظ');
// //         this.editing = null;
// //         this.load();
// //       },
// //       error: () => this.toast.show('خطأ', 'error')
// //     });
// //   }

// //   delete(id: number) {
// //     if (confirm('تأكيد الحذف؟')) {
// //       this.api.deleteTestimonial(id).subscribe(() => {
// //         this.toast.show('تم الحذف');
// //         this.load();
// //       });
// //     }
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { ApiService } from '../../../core/services/api.service';
// import { ToastService } from '../../../core/services/toast.service';
// import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// import { TestimonialDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-testimonials',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="page-header">
//       <div>
//         <h2>إدارة آراء وشهادات المرضى</h2>
//         <p>عرض وتعديل التقييمات والشهادات الطبية المعروضة على موقعك</p>
//       </div>
//       <button class="btn-add" (click)="edit(null)">
//         <i class="fas fa-plus"></i> إضافة شهادة جديدة
//       </button>
//     </div>

//     <div class="table-wrapper">
//       <table class="table">
//         <thead>
//           <tr>
//             <th>نص التقييم / الشهادة (عربي)</th>
//             <th style="width: 220px;">اسم صاحب الشهادة</th>
//             <th style="width: 120px;">الحالة</th>
//             <th style="width: 140px; text-align: center;">الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngIf="list.length === 0">
//             <td colspan="4" class="empty-state">
//               <i class="fas fa-quote-right"></i>
//               <span>لا توجد تقييمات أو شهادات مضافة حالياً.</span>
//             </td>
//           </tr>
//           <tr *ngFor="let item of list">
//             <td><em>"{{ item.textAr.substring(0, 80) }}{{ item.textAr.length > 80 ? '...' : '' }}"</em></td>
//             <td><strong>{{ item.authorAr }}</strong></td>
//             <td>
//               <span class="badge" [class.active]="item.isActive" [class.inactive]="!item.isActive">
//                 <span class="dot"></span>
//                 {{ item.isActive ? 'نشط' : 'غير نشط' }}
//               </span>
//             </td>
//             <td style="text-align: center;">
//               <button class="btn-edit" (click)="edit(item)" title="تعديل">
//                 <i class="fas fa-edit"></i>
//               </button>
//               <button class="btn-delete" (click)="requestDelete(item.id!)" [disabled]="deleting || confirmOpen" title="حذف">
//                 <i class="fas fa-trash"></i>
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     <!-- Modal -->
//     <div class="modal-overlay" *ngIf="editing" (click)="editing=null">
//       <div class="modal-content" (click)="$event.stopPropagation()">
//         <div class="modal-header">
//           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} شهادة مريض</h3>
//           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
//         </div>

//         <div class="modal-body">
//           <div class="form-row">
//             <div class="form-group">
//               <label>نص التقييم (عربي)</label>
//               <textarea [(ngModel)]="editing.textAr" class="form-control" rows="4" placeholder="اكتب رأي المريض بالعربية..."></textarea>
//             </div>
//             <div class="form-group">
//               <label>نص التقييم (إنجليزي)</label>
//               <textarea [(ngModel)]="editing.textEn" class="form-control" rows="4" placeholder="Write feedback in English..."></textarea>
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>اسم الكاتب (عربي)</label>
//               <input [(ngModel)]="editing.authorAr" class="form-control" placeholder="مثال: محمد أحمد">
//             </div>
//             <div class="form-group">
//               <label>اسم الكاتب (إنجليزي)</label>
//               <input [(ngModel)]="editing.authorEn" class="form-control" placeholder="Example: Mohamed Ahmed">
//             </div>
//           </div>

//           <div class="form-row" style="align-items: center;">
//             <div class="form-group">
//               <label>الترتيب في العرض</label>
//               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
//             </div>
//             <div class="form-group" style="padding-top: 1.5rem;">
//               <label class="checkbox-container">
//                 <input type="checkbox" [(ngModel)]="editing.isActive">
//                 <span>تفعيل ونشر هذه الشهادة</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div class="modal-footer">
//           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
//           <button class="btn-save" (click)="save()">حفظ الشهادة</button>
//         </div>
//       </div>
//     </div>

//     <!-- Confirm delete popup (responsive) -->
//     <div
//       class="confirm-overlay"
//       *ngIf="confirmOpen"
//       (click)="closeConfirm()"
//       aria-modal="true"
//       role="dialog"
//     >
//       <div class="confirm-modal" (click)="$event.stopPropagation()">
//         <div class="confirm-header">
//           <h3>تأكيد الحذف</h3>
//           <button class="modal-close" (click)="closeConfirm()" aria-label="إغلاق">
//             <i class="fas fa-times"></i>
//           </button>
//         </div>

//         <div class="confirm-body">
//           هل أنت متأكد من حذف هذه الشهادة؟
//         </div>

//         <div class="confirm-footer">
//           <button class="btn-cancel" (click)="closeConfirm()" [disabled]="deleting">إلغاء</button>
//           <button
//             class="btn-save btn-danger"
//             (click)="performDelete()"
//             [disabled]="confirmDeleteId == null || deleting"
//           >
//             <i class="fas fa-trash"></i> حذف
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     /* Confirm popup (responsive) */
//     .confirm-overlay {
//       position: fixed;
//       inset: 0;
//       background: rgba(0,0,0,.45);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 16px;
//       z-index: 3000;
//     }

//     .confirm-modal {
//       width: 100%;
//       max-width: 520px;
//       background: #fff;
//       border-radius: 14px;
//       box-shadow: 0 18px 55px rgba(0,0,0,.25);
//       overflow: hidden;
//     }

//     .confirm-header {
//       padding: 14px 16px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       gap: 12px;
//       border-bottom: 1px solid rgba(0,0,0,.06);
//     }

//     .confirm-body {
//       padding: 18px 16px;
//       font-size: 16px;
//       line-height: 1.6;
//       text-align: center;
//       color: #222;
//     }

//     .confirm-footer {
//       padding: 14px 16px;
//       display: flex;
//       justify-content: space-between;
//       gap: 12px;
//       border-top: 1px solid rgba(0,0,0,.06);
//     }

//     @media (max-width: 480px) {
//       .confirm-body {
//         font-size: 15px;
//       }
//       .confirm-footer {
//         flex-direction: column-reverse;
//       }
//       .confirm-footer button {
//         width: 100%;
//       }
//     }
//   `]
// })
// export class TestimonialsComponent implements OnInit {
//   list: TestimonialDto[] = [];
//   editing: TestimonialDto | null = null;

//   confirmOpen = false;
//   confirmDeleteId: number | null = null;
//   deleting = false;

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService
//   ) {}

//   ngOnInit() {
//     this.dataService.testimonials$.subscribe((d) => (this.list = d));
//     if (!this.dataService.loaded) this.load();
//   }

//   load() {
//     this.api.getTestimonials().subscribe((d) => this.dataService.testimonials$.next(d));
//   }

//   edit(item: TestimonialDto | null) {
//     this.editing = item ? { ...item } : ({ sortOrder: 0, isActive: true } as TestimonialDto);
//   }

//   save() {
//     if (!this.editing) return;

//     const obs = this.editing.id
//       ? this.api.updateTestimonial(this.editing.id, this.editing)
//       : this.api.createTestimonial(this.editing);

//     obs.subscribe({
//       next: () => {
//         this.toast.show('تم الحفظ');
//         this.editing = null;
//         this.load();
//       },
//       error: () => this.toast.show('خطأ', 'error')
//     });
//   }

//   requestDelete(id: number) {
//     this.confirmDeleteId = id;
//     this.confirmOpen = true;
//   }

//   closeConfirm() {
//     if (this.deleting) return;
//     this.confirmOpen = false;
//     this.confirmDeleteId = null;
//   }

//   performDelete() {
//     if (this.confirmDeleteId == null) return;
//     this.deleting = true;

//     this.api.deleteTestimonial(this.confirmDeleteId).subscribe({
//       next: () => {
//         this.toast.show('تم الحذف');
//         this.deleting = false;
//         this.confirmOpen = false;
//         this.confirmDeleteId = null;
//         this.load();
//       },
//       error: () => {
//         this.deleting = false;
//         this.toast.show('فشل الحذف', 'error');
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
import { TestimonialDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>إدارة آراء وشهادات المرضى</h2>
        <p>عرض وتعديل التقييمات والشهادات الطبية المعروضة على موقعك</p>
      </div>
      <button class="btn-add" (click)="edit(null)">
        <i class="fas fa-plus"></i> إضافة شهادة جديدة
      </button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>نص التقييم / الشهادة (عربي)</th>
            <th style="width: 220px;">اسم صاحب الشهادة</th>
            <th style="width: 120px;">الحالة</th>
            <th style="width: 140px; text-align: center;">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="list.length === 0">
            <td colspan="4" class="empty-state">
              <i class="fas fa-quote-right"></i>
              <span>لا توجد تقييمات أو شهادات مضافة حالياً.</span>
            </td>
          </tr>
          <tr *ngFor="let item of list">
            <td><em>"{{ item.textAr.substring(0, 80) }}{{ item.textAr.length > 80 ? '...' : '' }}"</em></td>
            <td><strong>{{ item.authorAr }}</strong></td>
            <td>
              <span class="badge" [class.active]="item.isActive" [class.inactive]="!item.isActive">
                <span class="dot"></span>
                {{ item.isActive ? 'نشط' : 'غير نشط' }}
              </span>
            </td>
            <td style="text-align: center;">
              <button class="btn-edit" (click)="edit(item)" title="تعديل">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-delete" (click)="requestDelete(item.id!)" [disabled]="deleting || confirmOpen" title="حذف">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" *ngIf="editing" (click)="editing=null">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} شهادة مريض</h3>
          <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>نص التقييم (عربي)</label>
              <textarea [(ngModel)]="editing.textAr" class="form-control" rows="4" placeholder="اكتب رأي المريض بالعربية..."></textarea>
            </div>
            <div class="form-group">
              <label>نص التقييم (إنجليزي)</label>
              <textarea [(ngModel)]="editing.textEn" class="form-control" rows="4" placeholder="Write feedback in English..."></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>اسم الكاتب (عربي)</label>
              <input [(ngModel)]="editing.authorAr" class="form-control" placeholder="مثال: محمد أحمد">
            </div>
            <div class="form-group">
              <label>اسم الكاتب (إنجليزي)</label>
              <input [(ngModel)]="editing.authorEn" class="form-control" placeholder="Example: Mohamed Ahmed">
            </div>
          </div>

          <div class="form-row" style="align-items: center;">
            <div class="form-group">
              <label>الترتيب في العرض</label>
              <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
            </div>
            <div class="form-group" style="padding-top: 1.5rem;">
              <label class="checkbox-container">
                <input type="checkbox" [(ngModel)]="editing.isActive">
                <span>تفعيل ونشر هذه الشهادة</span>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" (click)="editing=null">إلغاء</button>
          <button class="btn-save" (click)="save()" [disabled]="saving">
            <i class="fas fa-save"></i>
            {{ saving ? 'جاري الحفظ...' : 'حفظ الشهادة' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm delete popup (responsive) -->
    <div
      class="confirm-overlay"
      *ngIf="confirmOpen"
      (click)="closeConfirm()"
      aria-modal="true"
      role="dialog"
    >
      <div class="confirm-modal" (click)="$event.stopPropagation()">
        <div class="confirm-header">
          <h3>تأكيد الحذف</h3>
          <button class="modal-close" (click)="closeConfirm()" aria-label="إغلاق">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="confirm-body">
          هل أنت متأكد من حذف هذه الشهادة؟
        </div>

        <div class="confirm-footer">
          <button class="btn-cancel" (click)="closeConfirm()" [disabled]="deleting">إلغاء</button>
          <button
            class="btn-save btn-danger"
            (click)="performDelete()"
            [disabled]="confirmDeleteId == null || deleting"
          >
            <i class="fas fa-trash"></i> حذف
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Confirm popup (responsive) */
    .confirm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 3000;
    }

    .confirm-modal {
      width: 100%;
      max-width: 520px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 18px 55px rgba(0,0,0,.25);
      overflow: hidden;
    }

    .confirm-header {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid rgba(0,0,0,.06);
    }

    .confirm-body {
      padding: 18px 16px;
      font-size: 16px;
      line-height: 1.6;
      text-align: center;
      color: #222;
    }

    .confirm-footer {
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      border-top: 1px solid rgba(0,0,0,.06);
    }

    @media (max-width: 480px) {
      .confirm-body {
        font-size: 15px;
      }
      .confirm-footer {
        flex-direction: column-reverse;
      }
      .confirm-footer button {
        width: 100%;
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
export class TestimonialsComponent implements OnInit {
  list: TestimonialDto[] = [];
  editing: TestimonialDto | null = null;

  confirmOpen = false;
  confirmDeleteId: number | null = null;
  deleting = false;
  saving = false; // متغير لمنع النقر المتعدد

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef // إضافة لتحديث الواجهة فوراً
  ) {}

  ngOnInit() {
    this.dataService.testimonials$.subscribe((d) => {
      this.list = d;
      this.cdr.detectChanges();
    });
    if (!this.dataService.loaded) this.load();
  }

  load() {
    this.api.getTestimonials().subscribe({
      next: (d) => this.dataService.testimonials$.next(d),
      error: () => this.toast.show('فشل تحميل الشهادات', 'error')
    });
  }

  edit(item: TestimonialDto | null) {
    this.editing = item ? { ...item } : ({ sortOrder: 0, isActive: true } as TestimonialDto);
    this.saving = false; // إعادة تعيين عند فتح المودال
  }

  save() {
    if (this.saving || !this.editing) return;

    // تعطيل الزر وتحديث الواجهة فوراً
    this.saving = true;
    this.cdr.detectChanges();

    const obs = this.editing.id
      ? this.api.updateTestimonial(this.editing.id, this.editing)
      : this.api.createTestimonial(this.editing);

    obs.pipe(
      finalize(() => {
        this.saving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.toast.show('تم الحفظ بنجاح ✅', 'success');
        // إغلاق المودال أولاً
        this.editing = null;
        this.cdr.detectChanges();
        // ثم تحديث القائمة
        this.load();
      },
      error: () => {
        this.toast.show('حدث خطأ أثناء الحفظ', 'error');
        // المودال يبقى مفتوحاً لتصحيح البيانات
      }
    });
  }

  requestDelete(id: number) {
    this.confirmDeleteId = id;
    this.confirmOpen = true;
  }

  closeConfirm() {
    if (this.deleting) return;
    this.confirmOpen = false;
    this.confirmDeleteId = null;
  }

  performDelete() {
    if (this.confirmDeleteId == null) return;
    this.deleting = true;

    this.api.deleteTestimonial(this.confirmDeleteId).subscribe({
      next: () => {
        this.toast.show('تم الحذف', 'success');
        this.deleting = false;
        this.confirmOpen = false;
        this.confirmDeleteId = null;
        this.load();
      },
      error: () => {
        this.deleting = false;
        this.toast.show('فشل الحذف', 'error');
      }
    });
  }
}