// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // import { ApiService } from '../../../core/services/api.service';
// // import { ToastService } from '../../../core/services/toast.service';
// // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // import { ExperienceDto } from '../../../models/portfolio.models';

// // @Component({
// //   selector: 'app-experiences',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="page-header">
// //       <div>
// //         <h2>إدارة الخبرات المهنية</h2>
// //         <p>إضافة وتعديل الأقسام الخاصة بمسيرتك المهنية وتاريخك الطبي</p>
// //       </div>
// //       <button class="btn-add" (click)="edit(null)">
// //         <i class="fas fa-plus"></i> إضافة خبرة جديدة
// //       </button>
// //     </div>

// //     <div class="table-wrapper">
// //       <table class="table">
// //         <thead>
// //           <tr>
// //             <th style="width: 140px;">الفترة</th>
// //             <th>العنوان والوظيفة (عربي)</th>
// //             <th>الجهة والمكان</th>
// //             <th style="width: 120px;">الحالة</th>
// //             <th style="width: 140px; text-align: center;">الإجراءات</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr *ngIf="list.length === 0">
// //             <td colspan="5" class="empty-state">
// //               <i class="fas fa-history"></i>
// //               <span>لا توجد خبرات مسجلة حالياً، قم بإضافة خبرة جديدة.</span>
// //             </td>
// //           </tr>
// //           <tr *ngFor="let item of list">
// //             <td><strong>{{ item.dateRange }}</strong></td>
// //             <td><strong>{{ item.titleAr }}</strong></td>
// //             <td>{{ item.orgAr }}</td>
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
// //           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} خبرة</h3>
// //           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
// //         </div>

// //         <div class="modal-body">
// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الفترة الزمنية</label>
// //               <input [(ngModel)]="editing.dateRange" class="form-control" placeholder="مثال: 2022 - الآن">
// //             </div>
// //             <div class="form-group">
// //               <label>رمز الأيقونة (Class)</label>

// //               <div class="icon-picker">
// //                 <select [(ngModel)]="editing.iconClass" class="form-control icon-select">
// //                   <option *ngFor="let opt of iconOptions" [ngValue]="opt.value">
// //                     {{ opt.label }}
// //                   </option>
// //                 </select>

// //                 <div class="icon-preview" title="معاينة الأيقونة">
// //                   <i [class]="editing.iconClass"></i>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>المسمى الوظيفي (عربي)</label>
// //               <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: أخصائي زراعة أسنان">
// //             </div>
// //             <div class="form-group">
// //               <label>المسمى الوظيفي (إنجليزي)</label>
// //               <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Dental Implant Specialist">
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الجهة / المؤسسة (عربي)</label>
// //               <input [(ngModel)]="editing.orgAr" class="form-control" placeholder="مثال: مستشفى الأسنان التخصصي">
// //             </div>
// //             <div class="form-group">
// //               <label>الجهة / المؤسسة (إنجليزي)</label>
// //               <input [(ngModel)]="editing.orgEn" class="form-control" placeholder="Example: Dental Specialist Hospital">
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الوصف والمهام (عربي)</label>
// //               <textarea [(ngModel)]="editing.descriptionAr" class="form-control" rows="3" placeholder="تفاصيل الخبرة بالعربية..."></textarea>
// //             </div>
// //             <div class="form-group">
// //               <label>الوصف والمهام (إنجليزي)</label>
// //               <textarea [(ngModel)]="editing.descriptionEn" class="form-control" rows="3" placeholder="Job description in English..."></textarea>
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الشارة / تمييز (عربي)</label>
// //               <input [(ngModel)]="editing.badgeAr" class="form-control" placeholder="مثال: مميز">
// //             </div>
// //             <div class="form-group">
// //               <label>الشارة / تمييز (إنجليزي)</label>
// //               <input [(ngModel)]="editing.badgeEn" class="form-control" placeholder="Example: Featured">
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
// //                 <span>تفعيل الخبرة ونشرها</span>
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         <div class="modal-footer">
// //           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
// //           <button class="btn-save" (click)="save()">حفظ البيانات</button>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: []
// // })
// // export class ExperiencesComponent implements OnInit {
// //   list: ExperienceDto[] = [];
// //   editing: ExperienceDto | null = null;

// //   iconOptions: Array<{ label: string; value: string }> = [
// //     { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
// //     { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
// //     { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
// //     { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
// //     { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
// //     { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
// //   ];

// //   constructor(
// //     private api: ApiService,
// //     private toast: ToastService,
// //     private dataService: DashboardDataService
// //   ) {}

// //   ngOnInit() {
// //     this.dataService.experiences$.subscribe((d) => (this.list = d));
// //     if (!this.dataService.loaded) this.load();
// //   }

// //   load() {
// //     this.api.getExperiences().subscribe((d) => this.dataService.experiences$.next(d));
// //   }

// //   edit(item: ExperienceDto | null) {
// //     this.editing = item
// //       ? { ...item }
// //       : ({
// //           dateRange: '',
// //           iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
// //           sortOrder: 0,
// //           isActive: true
// //         } as ExperienceDto);
// //   }

// //   save() {
// //     if (!this.editing) return;

// //     const obs = this.editing.id
// //       ? this.api.updateExperience(this.editing.id, this.editing)
// //       : this.api.createExperience(this.editing);

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
// //       this.api.deleteExperience(id).subscribe(() => {
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
// import { ExperienceDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-experiences',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="page-header">
//       <div>
//         <h2>إدارة الخبرات المهنية</h2>
//         <p>إضافة وتعديل الأقسام الخاصة بمسيرتك المهنية وتاريخك الطبي</p>
//       </div>
//       <button class="btn-add" (click)="edit(null)">
//         <i class="fas fa-plus"></i> إضافة خبرة جديدة
//       </button>
//     </div>

//     <div class="table-wrapper">
//       <table class="table">
//         <thead>
//           <tr>
//             <th style="width: 140px;">الفترة</th>
//             <th>العنوان والوظيفة (عربي)</th>
//             <th>الجهة والمكان</th>
//             <th style="width: 120px;">الحالة</th>
//             <th style="width: 140px; text-align: center;">الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngIf="list.length === 0">
//             <td colspan="5" class="empty-state">
//               <i class="fas fa-history"></i>
//               <span>لا توجد خبرات مسجلة حالياً، قم بإضافة خبرة جديدة.</span>
//             </td>
//           </tr>
//           <tr *ngFor="let item of list">
//             <td><strong>{{ item.dateRange }}</strong></td>
//             <td><strong>{{ item.titleAr }}</strong></td>
//             <td>{{ item.orgAr }}</td>
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
//           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} خبرة</h3>
//           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
//         </div>

//         <div class="modal-body">
//           <div class="form-row">
//             <div class="form-group">
//               <label>الفترة الزمنية</label>
//               <input [(ngModel)]="editing.dateRange" class="form-control" placeholder="مثال: 2022 - الآن">
//             </div>
//             <div class="form-group">
//               <label>رمز الأيقونة (Class)</label>

//               <div class="icon-picker">
//                 <select [(ngModel)]="editing.iconClass" class="form-control icon-select">
//                   <option *ngFor="let opt of iconOptions" [ngValue]="opt.value">
//                     {{ opt.label }}
//                   </option>
//                 </select>

//                 <div class="icon-preview" title="معاينة الأيقونة">
//                   <i [class]="editing.iconClass"></i>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>المسمى الوظيفي (عربي)</label>
//               <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: أخصائي زراعة أسنان">
//             </div>
//             <div class="form-group">
//               <label>المسمى الوظيفي (إنجليزي)</label>
//               <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Dental Implant Specialist">
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الجهة / المؤسسة (عربي)</label>
//               <input [(ngModel)]="editing.orgAr" class="form-control" placeholder="مثال: مستشفى الأسنان التخصصي">
//             </div>
//             <div class="form-group">
//               <label>الجهة / المؤسسة (إنجليزي)</label>
//               <input [(ngModel)]="editing.orgEn" class="form-control" placeholder="Example: Dental Specialist Hospital">
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الوصف والمهام (عربي)</label>
//               <textarea [(ngModel)]="editing.descriptionAr" class="form-control" rows="3" placeholder="تفاصيل الخبرة بالعربية..."></textarea>
//             </div>
//             <div class="form-group">
//               <label>الوصف والمهام (إنجليزي)</label>
//               <textarea [(ngModel)]="editing.descriptionEn" class="form-control" rows="3" placeholder="Job description in English..."></textarea>
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الشارة / تمييز (عربي)</label>
//               <input [(ngModel)]="editing.badgeAr" class="form-control" placeholder="مثال: مميز">
//             </div>
//             <div class="form-group">
//               <label>الشارة / تمييز (إنجليزي)</label>
//               <input [(ngModel)]="editing.badgeEn" class="form-control" placeholder="Example: Featured">
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
//                 <span>تفعيل الخبرة ونشرها</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div class="modal-footer">
//           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
//           <button class="btn-save" (click)="save()">حفظ البيانات</button>
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
//           هل أنت متأكد من حذف هذه الخبرة؟
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
// export class ExperiencesComponent implements OnInit {
//   list: ExperienceDto[] = [];
//   editing: ExperienceDto | null = null;

//   confirmOpen = false;
//   confirmDeleteId: number | null = null;
//   deleting = false;

//   iconOptions: Array<{ label: string; value: string }> = [
//     { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
//     { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
//     { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
//     { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
//     { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
//     { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
//   ];

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService
//   ) {}

//   ngOnInit() {
//     this.dataService.experiences$.subscribe((d) => (this.list = d));
//     if (!this.dataService.loaded) this.load();
//   }

//   load() {
//     this.api.getExperiences().subscribe((d) => this.dataService.experiences$.next(d));
//   }

//   edit(item: ExperienceDto | null) {
//     this.editing = item
//       ? { ...item }
//       : ({
//           dateRange: '',
//           iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
//           sortOrder: 0,
//           isActive: true
//         } as ExperienceDto);
//   }

//   save() {
//     if (!this.editing) return;

//     const obs = this.editing.id
//       ? this.api.updateExperience(this.editing.id, this.editing)
//       : this.api.createExperience(this.editing);

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

//     this.api.deleteExperience(this.confirmDeleteId).subscribe({
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
import { ExperienceDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>إدارة الخبرات المهنية</h2>
        <p>إضافة وتعديل الأقسام الخاصة بمسيرتك المهنية وتاريخك الطبي</p>
      </div>
      <button class="btn-add" (click)="edit(null)">
        <i class="fas fa-plus"></i> إضافة خبرة جديدة
      </button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 140px;">الفترة</th>
            <th>العنوان والوظيفة (عربي)</th>
            <th>الجهة والمكان</th>
            <th style="width: 120px;">الحالة</th>
            <th style="width: 140px; text-align: center;">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="list.length === 0">
            <td colspan="5" class="empty-state">
              <i class="fas fa-history"></i>
              <span>لا توجد خبرات مسجلة حالياً، قم بإضافة خبرة جديدة.</span>
            </td>
          </tr>
          <tr *ngFor="let item of list">
            <td><strong>{{ item.dateRange }}</strong></td>
            <td><strong>{{ item.titleAr }}</strong></td>
            <td>{{ item.orgAr }}</td>
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
          <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} خبرة</h3>
          <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>الفترة الزمنية</label>
              <input [(ngModel)]="editing.dateRange" class="form-control" placeholder="مثال: 2022 - الآن">
            </div>
            <div class="form-group">
              <label>رمز الأيقونة (Class)</label>

              <div class="icon-picker">
                <select [(ngModel)]="editing.iconClass" class="form-control icon-select">
                  <option *ngFor="let opt of iconOptions" [ngValue]="opt.value">
                    {{ opt.label }}
                  </option>
                </select>

                <div class="icon-preview" title="معاينة الأيقونة">
                  <i [class]="editing.iconClass"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>المسمى الوظيفي (عربي)</label>
              <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: أخصائي زراعة أسنان">
            </div>
            <div class="form-group">
              <label>المسمى الوظيفي (إنجليزي)</label>
              <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Dental Implant Specialist">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الجهة / المؤسسة (عربي)</label>
              <input [(ngModel)]="editing.orgAr" class="form-control" placeholder="مثال: مستشفى الأسنان التخصصي">
            </div>
            <div class="form-group">
              <label>الجهة / المؤسسة (إنجليزي)</label>
              <input [(ngModel)]="editing.orgEn" class="form-control" placeholder="Example: Dental Specialist Hospital">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الوصف والمهام (عربي)</label>
              <textarea [(ngModel)]="editing.descriptionAr" class="form-control" rows="3" placeholder="تفاصيل الخبرة بالعربية..."></textarea>
            </div>
            <div class="form-group">
              <label>الوصف والمهام (إنجليزي)</label>
              <textarea [(ngModel)]="editing.descriptionEn" class="form-control" rows="3" placeholder="Job description in English..."></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الشارة / تمييز (عربي)</label>
              <input [(ngModel)]="editing.badgeAr" class="form-control" placeholder="مثال: مميز">
            </div>
            <div class="form-group">
              <label>الشارة / تمييز (إنجليزي)</label>
              <input [(ngModel)]="editing.badgeEn" class="form-control" placeholder="Example: Featured">
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
                <span>تفعيل الخبرة ونشرها</span>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" (click)="editing=null">إلغاء</button>
          <button class="btn-save" (click)="save()" [disabled]="saving">
            <i class="fas fa-save"></i>
            {{ saving ? 'جاري الحفظ...' : 'حفظ البيانات' }}
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
          هل أنت متأكد من حذف هذه الخبرة؟
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
export class ExperiencesComponent implements OnInit {
  list: ExperienceDto[] = [];
  editing: ExperienceDto | null = null;

  confirmOpen = false;
  confirmDeleteId: number | null = null;
  deleting = false;
  saving = false; // متغير لمنع النقر المتعدد

  iconOptions: Array<{ label: string; value: string }> = [
    { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
    { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
    { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
    { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
    { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
    { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
  ];

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef // إضافة لتحديث الواجهة فوراً
  ) {}

  ngOnInit() {
    this.dataService.experiences$.subscribe((d) => {
      this.list = d;
      this.cdr.detectChanges();
    });
    if (!this.dataService.loaded) this.load();
  }

  load() {
    this.api.getExperiences().subscribe({
      next: (d) => this.dataService.experiences$.next(d),
      error: () => this.toast.show('فشل تحميل الخبرات', 'error')
    });
  }

  edit(item: ExperienceDto | null) {
    this.editing = item
      ? { ...item }
      : ({
          dateRange: '',
          iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
          sortOrder: 0,
          isActive: true
        } as ExperienceDto);
    this.saving = false; // إعادة تعيين عند فتح المودال
  }

  save() {
    if (this.saving || !this.editing) return;

    // تعطيل الزر وتحديث الواجهة فوراً
    this.saving = true;
    this.cdr.detectChanges();

    const obs = this.editing.id
      ? this.api.updateExperience(this.editing.id, this.editing)
      : this.api.createExperience(this.editing);

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

    this.api.deleteExperience(this.confirmDeleteId).subscribe({
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