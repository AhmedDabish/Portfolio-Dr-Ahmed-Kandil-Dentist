// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { ApiService } from '../../../core/services/api.service';
// import { ToastService } from '../../../core/services/toast.service';
// import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// import { ServiceDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="page-header">
//       <div>
//         <h2>إدارة الخدمات</h2>
//         <p>إضافة وتعديل وحذف الخدمات الطبية</p>
//       </div>
//       <button class="btn-add" (click)="openModal()">
//         <i class="fas fa-plus"></i> إضافة خدمة
//       </button>
//     </div>

//     <div class="table-wrapper">
//       <table class="table">
//         <thead>
//           <tr>
//             <th style="width:60px;">#</th>
//             <th>العنوان (عربي)</th>
//             <th>الوصف</th>
//             <th style="width:100px;">الحالة</th>
//             <th style="width:140px;">الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngIf="list.length === 0">
//             <td colspan="5" class="empty-state">
//               <i class="fas fa-inbox"></i>
//               <span>لا توجد خدمات، أضف خدمة جديدة</span>
//             </td>
//           </tr>
//           <tr *ngFor="let item of list">
//             <td><span class="card-number">{{ item.cardNumber }}</span></td>
//             <td><strong>{{ item.titleAr }}</strong></td>
//             <td class="desc-cell">{{ item.descriptionAr }}</td>
//             <td>
//               <span class="badge" [class.active]="item.isActive">
//                 <span class="dot" [class.active]="item.isActive"></span>
//                 {{ item.isActive ? 'نشط' : 'غير نشط' }}
//               </span>
//             </td>
//             <td>
//               <button class="btn-edit" (click)="openModal(item)">
//                 <i class="fas fa-edit"></i>
//               </button>
//               <button class="btn-delete" (click)="requestDelete(item.id!)" [disabled]="deleting || confirmOpen">
//                 <i class="fas fa-trash"></i>
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     <!-- Modal add/edit -->
//     <div class="modal-overlay" *ngIf="modalOpen" (click)="closeModal($event)">
//       <div class="modal-content" (click)="$event.stopPropagation()">
//         <div class="modal-header">
//           <h3>{{ editing?.id ? 'تعديل' : 'إضافة' }} خدمة</h3>
//           <button class="modal-close" (click)="closeModal()"><i class="fas fa-times"></i></button>
//         </div>

//         <div class="modal-body">
//           <div class="form-row">
//             <div class="form-group">
//               <label>الرقم (Card)</label>
//               <input [(ngModel)]="editing.cardNumber" class="form-control" placeholder="01">
//             </div>
//             <div class="form-group">
//               <label>الأيقونة المميزة (Class)</label>
//               <div class="icon-picker">
//                 <select
//                   [(ngModel)]="editing.iconClass"
//                   class="form-control icon-select"
//                 >
//                   <option [ngValue]="null" disabled>
//                     اختر أيقونة
//                   </option>

//                   <!-- fallback: if current iconClass not in iconOptions -->
//                   <option
//                     *ngIf="editing.iconClass && !iconOptions.includes(editing.iconClass)"
//                     [ngValue]="editing.iconClass"
//                   >
//                     {{ editing.iconClass }}
//                   </option>

//                   <option *ngFor="let c of iconOptions" [ngValue]="c">
//                     {{ c }}
//                   </option>
//                 </select>

//                 <div title="معاينة الأيقونة" class="icon-preview">
//                   <i class="fa-fw" [ngClass]="editing.iconClass"></i>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>العنوان (عربي) *</label>
//               <input [(ngModel)]="editing.titleAr" class="form-control" required placeholder="زراعة الأسنان">
//             </div>
//             <div class="form-group">
//               <label>العنوان (إنجليزي) *</label>
//               <input [(ngModel)]="editing.titleEn" class="form-control" required placeholder="Dental Implants">
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الوصف (عربي) *</label>
//               <textarea [(ngModel)]="editing.descriptionAr" class="form-control" rows="3" placeholder="وصف الخدمة بالعربية"></textarea>
//             </div>
//             <div class="form-group">
//               <label>الوصف (إنجليزي) *</label>
//               <textarea [(ngModel)]="editing.descriptionEn" class="form-control" rows="3" placeholder="Service description in English"></textarea>
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الترتيب</label>
//               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control" min="0">
//             </div>
//             <div class="form-group checkbox-group">
//               <label>
//                 <input type="checkbox" [(ngModel)]="editing.isActive">
//                 <span>نشط</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div class="modal-footer">
//           <button class="btn-cancel" (click)="closeModal()">إلغاء</button>
//           <button class="btn-save" (click)="save()" [disabled]="!isValid()">
//             <i class="fas fa-save"></i> حفظ
//           </button>
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
//           هل أنت متأكد من حذف هذه الخدمة؟
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
//     .desc-cell {
//       max-width: 250px;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

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
// export class ServicesComponent implements OnInit {
//   list: ServiceDto[] = [];
//   editing: ServiceDto = this.getEmpty();
//   modalOpen = false;

//   confirmOpen = false;
//   confirmDeleteId: number | null = null;
//   deleting = false;

//   // FontAwesome icon classes (edit/add as needed)
//   iconOptions: string[] = [
//     'fas fa-tooth',
//     'fas fa-stethoscope',
//     'fas fa-heart-pulse',
//     'fas fa-syringe',
//     'fas fa-user-md',
//     'fas fa-notes-medical',
//     'fas fa-x-ray',
//     'fas fa-hand-holding-medical'
//   ];

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService
//   ) {}

//   ngOnInit() {
//     this.dataService.services$.subscribe((d) => (this.list = d));
//     if (!this.dataService.loaded) this.load();
//   }

//   load() {
//     this.api.getServices().subscribe({
//       next: (d) => this.dataService.services$.next(d),
//       error: () => this.toast.show('فشل تحميل الخدمات', 'error')
//     });
//   }

//   getEmpty(): ServiceDto {
//     return {
//       iconClass: 'fas fa-tooth',
//       cardNumber: '01',
//       titleAr: '',
//       titleEn: '',
//       descriptionAr: '',
//       descriptionEn: '',
//       sortOrder: 0,
//       isActive: true
//     };
//   }

//   openModal(item?: ServiceDto) {
//     this.editing = item ? { ...item } : this.getEmpty();
//     this.modalOpen = true;
//   }

//   closeModal(e?: Event) {
//     if (e && !(e.target as HTMLElement).classList.contains('modal-overlay')) return;
//     this.modalOpen = false;
//     this.editing = this.getEmpty();
//   }

//   isValid(): boolean {
//     const e = this.editing;
//     return !!(e.titleAr?.trim() && e.titleEn?.trim() && e.descriptionAr?.trim() && e.descriptionEn?.trim());
//   }

//   save() {
//     if (!this.isValid()) return;

//     const obs = this.editing.id
//       ? this.api.updateService(this.editing.id, this.editing)
//       : this.api.createService(this.editing);

//     obs.subscribe({
//       next: () => {
//         this.toast.show('تم حفظ الخدمة بنجاح ✅', 'success');
//         this.modalOpen = false;
//         this.load();
//       },
//       error: () => this.toast.show('حدث خطأ أثناء الحفظ', 'error')
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

//     this.api.deleteService(this.confirmDeleteId).subscribe({
//       next: () => {
//         this.toast.show('تم حذف الخدمة', 'success');
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
import { ServiceDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>إدارة الخدمات</h2>
        <p>إضافة وتعديل وحذف الخدمات الطبية</p>
      </div>
      <button class="btn-add" (click)="openModal()">
        <i class="fas fa-plus"></i> إضافة خدمة
      </button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th style="width:60px;">#</th>
            <th>العنوان (عربي)</th>
            <th>الوصف</th>
            <th style="width:100px;">الحالة</th>
            <th style="width:140px;">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="list.length === 0">
            <td colspan="5" class="empty-state">
              <i class="fas fa-inbox"></i>
              <span>لا توجد خدمات، أضف خدمة جديدة</span>
            </td>
          </tr>
          <tr *ngFor="let item of list">
            <td><span class="card-number">{{ item.cardNumber }}</span></td>
            <td><strong>{{ item.titleAr }}</strong></td>
            <td class="desc-cell">{{ item.descriptionAr }}</td>
            <td>
              <span class="badge" [class.active]="item.isActive">
                <span class="dot" [class.active]="item.isActive"></span>
                {{ item.isActive ? 'نشط' : 'غير نشط' }}
              </span>
            </td>
            <td>
              <button class="btn-edit" (click)="openModal(item)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-delete" (click)="requestDelete(item.id!)" [disabled]="deleting || confirmOpen">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal add/edit -->
    <div class="modal-overlay" *ngIf="modalOpen" (click)="closeModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ editing?.id ? 'تعديل' : 'إضافة' }} خدمة</h3>
          <button class="modal-close" (click)="closeModal()"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>الرقم (Card)</label>
              <input [(ngModel)]="editing.cardNumber" class="form-control" placeholder="01">
            </div>
            <div class="form-group">
              <label>الأيقونة المميزة (Class)</label>
              <div class="icon-picker">
                <select
                  [(ngModel)]="editing.iconClass"
                  class="form-control icon-select"
                >
                  <option [ngValue]="null" disabled>
                    اختر أيقونة
                  </option>

                  <!-- fallback: if current iconClass not in iconOptions -->
                  <option
                    *ngIf="editing.iconClass && !iconOptions.includes(editing.iconClass)"
                    [ngValue]="editing.iconClass"
                  >
                    {{ editing.iconClass }}
                  </option>

                  <option *ngFor="let c of iconOptions" [ngValue]="c">
                    {{ c }}
                  </option>
                </select>

                <div title="معاينة الأيقونة" class="icon-preview">
                  <i class="fa-fw" [ngClass]="editing.iconClass"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>العنوان (عربي) *</label>
              <input [(ngModel)]="editing.titleAr" class="form-control" required placeholder="زراعة الأسنان">
            </div>
            <div class="form-group">
              <label>العنوان (إنجليزي) *</label>
              <input [(ngModel)]="editing.titleEn" class="form-control" required placeholder="Dental Implants">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الوصف (عربي) *</label>
              <textarea [(ngModel)]="editing.descriptionAr" class="form-control" rows="3" placeholder="وصف الخدمة بالعربية"></textarea>
            </div>
            <div class="form-group">
              <label>الوصف (إنجليزي) *</label>
              <textarea [(ngModel)]="editing.descriptionEn" class="form-control" rows="3" placeholder="Service description in English"></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الترتيب</label>
              <input type="number" [(ngModel)]="editing.sortOrder" class="form-control" min="0">
            </div>
            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" [(ngModel)]="editing.isActive">
                <span>نشط</span>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" (click)="closeModal()">إلغاء</button>
          <button class="btn-save" (click)="save()" [disabled]="!isValid() || saving">
            <i class="fas fa-save"></i>
            {{ saving ? 'جاري الحفظ...' : 'حفظ' }}
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
          هل أنت متأكد من حذف هذه الخدمة؟
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
    .desc-cell {
      max-width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

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
export class ServicesComponent implements OnInit {
  list: ServiceDto[] = [];
  editing: ServiceDto = this.getEmpty();
  modalOpen = false;

  confirmOpen = false;
  confirmDeleteId: number | null = null;
  deleting = false;
  saving = false; // متغير لمنع النقر المتعدد

  // FontAwesome icon classes (edit/add as needed)
  iconOptions: string[] = [
    'fas fa-tooth',
    'fas fa-stethoscope',
    'fas fa-heart-pulse',
    'fas fa-syringe',
    'fas fa-user-md',
    'fas fa-notes-medical',
    'fas fa-x-ray',
    'fas fa-hand-holding-medical'
  ];

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef // إضافة لتحديث الواجهة فوراً
  ) {}

  ngOnInit() {
    this.dataService.services$.subscribe((d) => {
      this.list = d;
      this.cdr.detectChanges(); // تحديث الجدول فوراً
    });
    if (!this.dataService.loaded) this.load();
  }

  load() {
    this.api.getServices().subscribe({
      next: (d) => this.dataService.services$.next(d),
      error: () => this.toast.show('فشل تحميل الخدمات', 'error')
    });
  }

  getEmpty(): ServiceDto {
    return {
      iconClass: 'fas fa-tooth',
      cardNumber: '01',
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      sortOrder: 0,
      isActive: true
    };
  }

  openModal(item?: ServiceDto) {
    this.editing = item ? { ...item } : this.getEmpty();
    this.modalOpen = true;
    this.saving = false; // إعادة تعيين عند فتح المودال
  }

  closeModal(e?: Event) {
    if (e && !(e.target as HTMLElement).classList.contains('modal-overlay')) return;
    this.modalOpen = false;
    this.editing = this.getEmpty();
    this.saving = false;
  }

  isValid(): boolean {
    const e = this.editing;
    return !!(e.titleAr?.trim() && e.titleEn?.trim() && e.descriptionAr?.trim() && e.descriptionEn?.trim());
  }

  save() {
    // منع النقر المتعدد
    if (this.saving || !this.isValid()) return;

    // تعطيل الزر وتحديث الواجهة فوراً
    this.saving = true;
    this.cdr.detectChanges();

    const obs = this.editing.id
      ? this.api.updateService(this.editing.id, this.editing)
      : this.api.createService(this.editing);

    obs.pipe(
      finalize(() => {
        this.saving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.toast.show('تم حفظ الخدمة بنجاح ✅', 'success');
        // إغلاق المودال أولاً
        this.modalOpen = false;
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

    this.api.deleteService(this.confirmDeleteId).subscribe({
      next: () => {
        this.toast.show('تم حذف الخدمة', 'success');
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