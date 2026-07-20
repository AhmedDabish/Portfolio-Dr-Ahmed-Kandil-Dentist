// // // import { Component, OnInit } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { FormsModule } from '@angular/forms';

// // // import { ApiService } from '../../../core/services/api.service';
// // // import { ToastService } from '../../../core/services/toast.service';
// // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // import { PortfolioCaseDto } from '../../../models/portfolio.models';

// // // @Component({
// // //   selector: 'app-portfolio',
// // //   standalone: true,
// // //   imports: [CommonModule, FormsModule],
// // //   template: `
// // //     <div class="page-header">
// // //       <div>
// // //         <h2>إدارة معرض الأعمال</h2>
// // //         <p>عرض وتعديل ملفات وصور مشاريع وأعمال د. أحمد قنديل</p>
// // //       </div>
// // //       <button class="btn-add" (click)="edit(null)">
// // //         <i class="fas fa-plus"></i> إضافة عمل جديد
// // //       </button>
// // //     </div>

// // //     <div class="table-wrapper">
// // //       <table class="table">
// // //         <thead>
// // //           <tr>
// // //             <th>عنوان العمل (عربي)</th>
// // //             <th>الوصف المختصر (عربي)</th>
// // //             <th style="width: 120px; text-align: center;">عدد الصور</th>
// // //             <th style="width: 120px;">الحالة</th>
// // //             <th style="width: 140px; text-align: center;">الإجراءات</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           <tr *ngIf="list.length === 0">
// // //             <td colspan="5" class="empty-state">
// // //               <i class="fas fa-images"></i>
// // //               <span>لا توجد أعمال مضافة حالياً.</span>
// // //             </td>
// // //           </tr>
// // //           <tr *ngFor="let item of list">
// // //             <td><strong>{{ item.titleAr }}</strong></td>
// // //             <td>{{ item.subtitleAr }}</td>
// // //             <td style="text-align: center;">
// // //               <span class="badge">
// // //                 <i class="fas fa-image" style="margin-left: 4px;"></i>
// // //                 {{ item.images?.length || 0 }}
// // //               </span>
// // //             </td>
// // //             <td>
// // //               <span class="badge" [class.active]="item.isActive" [class.inactive]="!item.isActive">
// // //                 <span class="dot"></span>
// // //                 {{ item.isActive ? 'نشط' : 'غير نشط' }}
// // //               </span>
// // //             </td>
// // //             <td style="text-align: center;">
// // //               <button class="btn-edit" (click)="edit(item)" title="تعديل">
// // //                 <i class="fas fa-edit"></i>
// // //               </button>
// // //               <button class="btn-delete" (click)="delete(item.id!)" title="حذف">
// // //                 <i class="fas fa-trash"></i>
// // //               </button>
// // //             </td>
// // //           </tr>
// // //         </tbody>
// // //       </table>
// // //     </div>

// // //     <!-- Modal -->
// // //     <div class="modal-overlay" *ngIf="editing" (click)="editing=null">
// // //       <div class="modal-content" (click)="$event.stopPropagation()">
// // //         <div class="modal-header">
// // //           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} عمل</h3>
// // //           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
// // //         </div>

// // //         <div class="modal-body">
// // //           <div class="form-row">
// // //             <div class="form-group">
// // //               <label>العنوان (عربي)</label>
// // //               <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: ابتسامة هوليوود">
// // //             </div>
// // //             <div class="form-group">
// // //               <label>العنوان (إنجليزي)</label>
// // //               <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Hollywood Smile">
// // //             </div>
// // //           </div>

// // //           <div class="form-row">
// // //             <div class="form-group">
// // //               <label>الوصف المختصر (عربي)</label>
// // //               <input [(ngModel)]="editing.subtitleAr" class="form-control" placeholder="تفاصيل سريعة للعمل...">
// // //             </div>
// // //             <div class="form-group">
// // //               <label>الوصف المختصر (إنجليزي)</label>
// // //               <input [(ngModel)]="editing.subtitleEn" class="form-control" placeholder="Quick English subtitle...">
// // //             </div>
// // //           </div>

// // //           <div class="form-row">
// // //             <div class="form-group">
// // //               <label>الأيقونة المميزة (Class)</label>

// // //               <div class="icon-picker">
// // //                 <select [(ngModel)]="editing.iconClass" class="form-control icon-select">
// // //                   <option *ngFor="let opt of iconOptions" [ngValue]="opt.value">
// // //                     {{ opt.label }}
// // //                   </option>
// // //                 </select>

// // //                 <div class="icon-preview" title="معاينة الأيقونة">
// // //                   <i [class]="editing.iconClass"></i>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div class="form-group">
// // //               <label>الصورة المصغرة الرئيسية (Thumbnail)</label>
// // //               <input type="file" accept="image/*" class="form-control" (change)="onThumbnailSelected($event)">
// // //               <img *ngIf="thumbnailPreview || editing.thumbnailUrl"
// // //                    [src]="thumbnailPreview || resolveUrl(editing.thumbnailUrl)"
// // //                    style="max-width: 120px; margin-top: 0.5rem; border-radius: 6px; display:block;">
// // //             </div>
// // //           </div>

// // //           <div class="form-row" style="align-items: center;">
// // //             <div class="form-group">
// // //               <label>الترتيب</label>
// // //               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
// // //             </div>
// // //             <div class="form-group" style="padding-top: 1.5rem;">
// // //               <label class="checkbox-container">
// // //                 <input type="checkbox" [(ngModel)]="editing.isActive">
// // //                 <span>نشر هذا العمل في المعرض</span>
// // //               </label>
// // //             </div>
// // //           </div>

// // //           <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
// // //             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
// // //               <h4 style="margin: 0; font-size: 1rem; color: var(--text-dark);">معرض صور هذا العمل</h4>
// // //               <label class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem; cursor:pointer;">
// // //                 <i class="fas fa-plus"></i> رفع صور جديدة
// // //                 <input type="file" accept="image/*" multiple style="display:none" (change)="onNewImagesSelected($event)">
// // //               </label>
// // //             </div>

// // //             <div *ngIf="editing.images.length === 0 && pendingNewImages.length === 0"
// // //                  style="text-align: center; padding: 1.5rem; color: var(--text-light); border: 2px dashed var(--border-color); border-radius: var(--radius-sm);">
// // //               <i class="fas fa-image" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
// // //               <span>لا توجد صور فرعية مضافة بعد.</span>
// // //             </div>

// // //             <!-- الصور الموجودة بالفعل على السيرفر -->
// // //             <div *ngFor="let img of editing.images; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
// // //               <img [src]="resolveUrl(img.imageUrl)" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
// // //               <span style="flex:1;"></span>
// // //               <button type="button" class="btn-delete" (click)="removeExistingImage(i)" title="حذف الصورة">
// // //                 <i class="fas fa-trash"></i>
// // //               </button>
// // //             </div>

// // //             <!-- الصور الجديدة المختارة (لسه مش مرفوعة) -->
// // //             <div *ngFor="let p of pendingNewImages; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
// // //               <img [src]="p.preview" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
// // //               <span style="flex:1; color: var(--text-light); font-size: 0.85rem;">{{ p.file.name }} (جديدة)</span>
// // //               <button type="button" class="btn-delete" (click)="removePendingImage(i)" title="إلغاء">
// // //                 <i class="fas fa-trash"></i>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div class="modal-footer">
// // //           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
// // //           <button class="btn-save" (click)="save()">حفظ التغييرات</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   `,
// // //   styles: []
// // // })
// // // export class PortfolioComponent implements OnInit {
// // //   list: PortfolioCaseDto[] = [];
// // //   editing: PortfolioCaseDto | null = null;

// // //   iconOptions: Array<{ label: string; value: string }> = [
// // //     { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
// // //     { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
// // //     { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
// // //     { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
// // //     { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
// // //     { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
// // //   ];

// // //   // صورة الغلاف (Thumbnail) الجديدة المختارة
// // //   thumbnailFile: File | null = null;
// // //   thumbnailPreview: string | null = null;

// // //   // صور المعرض الجديدة المختارة (لسه مش مرفوعة)
// // //   pendingNewImages: { file: File; preview: string }[] = [];

// // //   // معرفات الصور القديمة اللي المستخدم طلب حذفها
// // //   imagesToDelete: number[] = [];

// // //   constructor(
// // //     private api: ApiService,
// // //     private toast: ToastService,
// // //     private dataService: DashboardDataService
// // //   ) {}

// // //   ngOnInit() {
// // //     this.dataService.cases$.subscribe((d) => (this.list = d));
// // //     if (!this.dataService.loaded) this.load();
// // //   }

// // //   load() {
// // //     this.api.getCases().subscribe((d) => this.dataService.cases$.next(d));
// // //   }

// // //   resolveUrl(path?: string | null): string {
// // //     return this.api.resolveImageUrl(path);
// // //   }

// // //   edit(item: PortfolioCaseDto | null) {
// // //     this.thumbnailFile = null;
// // //     this.thumbnailPreview = null;
// // //     this.pendingNewImages = [];
// // //     this.imagesToDelete = [];

// // //     this.editing = item
// // //       ? { ...item, images: item.images ? [...item.images] : [] }
// // //       : ({
// // //           titleAr: '',
// // //           titleEn: '',
// // //           subtitleAr: '',
// // //           subtitleEn: '',
// // //           iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
// // //           thumbnailUrl: '',
// // //           sortOrder: 0,
// // //           isActive: true,
// // //           images: []
// // //         } as PortfolioCaseDto);
// // //   }

// // //   onThumbnailSelected(event: Event) {
// // //     const input = event.target as HTMLInputElement;
// // //     const file = input.files?.[0];
// // //     if (!file) return;
// // //     this.thumbnailFile = file;
// // //     const reader = new FileReader();
// // //     reader.onload = () => (this.thumbnailPreview = reader.result as string);
// // //     reader.readAsDataURL(file);
// // //   }

// // //   onNewImagesSelected(event: Event) {
// // //     const input = event.target as HTMLInputElement;
// // //     const files = Array.from(input.files || []);
// // //     files.forEach((file) => {
// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         this.pendingNewImages.push({ file, preview: reader.result as string });
// // //       };
// // //       reader.readAsDataURL(file);
// // //     });
// // //     input.value = '';
// // //   }

// // //   removePendingImage(index: number) {
// // //     this.pendingNewImages.splice(index, 1);
// // //   }

// // //   removeExistingImage(index: number) {
// // //     if (!this.editing) return;
// // //     const img = this.editing.images[index];
// // //     if (img?.id) this.imagesToDelete.push(img.id);
// // //     this.editing.images.splice(index, 1);
// // //   }

// // //   save() {
// // //     if (!this.editing) return;

// // //     // لو المستخدم اختار صورة غلاف جديدة، تتحط ضمن الصور الجديدة برضه
// // //     // وبعد الرفع السيرفر بياخد أول صورة كـ Thumbnail لو مفيش رابط محدد
// // //     const newFiles = this.thumbnailFile
// // //       ? [this.thumbnailFile, ...this.pendingNewImages.map((p) => p.file)]
// // //       : this.pendingNewImages.map((p) => p.file);

// // //     // لو مفيش thumbnailUrl قديم وهيتحط صورة غلاف جديدة، سيبها فاضية عشان السيرفر ياخد أول صورة مرفوعة
// // //     if (this.thumbnailFile) {
// // //       this.editing.thumbnailUrl = '';
// // //     }

// // //     const obs = this.editing.id
// // //       ? this.api.updateCase(this.editing.id, this.editing, newFiles, this.imagesToDelete)
// // //       : this.api.createCase(this.editing, newFiles, this.imagesToDelete);

// // //     obs.subscribe({
// // //       next: () => {
// // //         this.toast.show('تم الحفظ');
// // //         this.editing = null;
// // //         this.load();
// // //       },
// // //       error: () => this.toast.show('خطأ', 'error')
// // //     });
// // //   }

// // //   delete(id: number) {
// // //     if (confirm('تأكيد الحذف؟')) {
// // //       this.api.deleteCase(id).subscribe(() => {
// // //         this.toast.show('تم الحذف');
// // //         this.load();
// // //       });
// // //     }
// // //   }
// // // }
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // import { ApiService } from '../../../core/services/api.service';
// // import { ToastService } from '../../../core/services/toast.service';
// // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // import { PortfolioCaseDto } from '../../../models/portfolio.models';

// // @Component({
// //   selector: 'app-portfolio',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="page-header">
// //       <div>
// //         <h2>إدارة معرض الأعمال</h2>
// //         <p>عرض وتعديل ملفات وصور مشاريع وأعمال د. أحمد قنديل</p>
// //       </div>
// //       <button class="btn-add" (click)="edit(null)">
// //         <i class="fas fa-plus"></i> إضافة عمل جديد
// //       </button>
// //     </div>

// //     <div class="table-wrapper">
// //       <table class="table">
// //         <thead>
// //           <tr>
// //             <th>عنوان العمل (عربي)</th>
// //             <th>الوصف المختصر (عربي)</th>
// //             <th style="width: 120px; text-align: center;">عدد الصور</th>
// //             <th style="width: 120px;">الحالة</th>
// //             <th style="width: 140px; text-align: center;">الإجراءات</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr *ngIf="list.length === 0">
// //             <td colspan="5" class="empty-state">
// //               <i class="fas fa-images"></i>
// //               <span>لا توجد أعمال مضافة حالياً.</span>
// //             </td>
// //           </tr>
// //           <tr *ngFor="let item of list">
// //             <td><strong>{{ item.titleAr }}</strong></td>
// //             <td>{{ item.subtitleAr }}</td>
// //             <td style="text-align: center;">
// //               <span class="badge">
// //                 <i class="fas fa-image" style="margin-left: 4px;"></i>
// //                 {{ item.images?.length || 0 }}
// //               </span>
// //             </td>
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
// //               <button class="btn-delete" (click)="requestDelete(item.id!)" [disabled]="deleting || confirmOpen" title="حذف">
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
// //           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} عمل</h3>
// //           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
// //         </div>

// //         <div class="modal-body">
// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>العنوان (عربي)</label>
// //               <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: ابتسامة هوليوود">
// //             </div>
// //             <div class="form-group">
// //               <label>العنوان (إنجليزي)</label>
// //               <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Hollywood Smile">
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الوصف المختصر (عربي)</label>
// //               <input [(ngModel)]="editing.subtitleAr" class="form-control" placeholder="تفاصيل سريعة للعمل...">
// //             </div>
// //             <div class="form-group">
// //               <label>الوصف المختصر (إنجليزي)</label>
// //               <input [(ngModel)]="editing.subtitleEn" class="form-control" placeholder="Quick English subtitle...">
// //             </div>
// //           </div>

// //           <div class="form-row">
// //             <div class="form-group">
// //               <label>الأيقونة المميزة (Class)</label>

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
// //             <div class="form-group">
// //               <label>الصورة المصغرة الرئيسية (Thumbnail)</label>
// //               <input type="file" accept="image/*" class="form-control" (change)="onThumbnailSelected($event)">
// //               <img *ngIf="thumbnailPreview || editing.thumbnailUrl"
// //                    [src]="thumbnailPreview || resolveUrl(editing.thumbnailUrl)"
// //                    style="max-width: 120px; margin-top: 0.5rem; border-radius: 6px; display:block;">
// //             </div>
// //           </div>

// //           <div class="form-row" style="align-items: center;">
// //             <div class="form-group">
// //               <label>الترتيب</label>
// //               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
// //             </div>
// //             <div class="form-group" style="padding-top: 1.5rem;">
// //               <label class="checkbox-container">
// //                 <input type="checkbox" [(ngModel)]="editing.isActive">
// //                 <span>نشر هذا العمل في المعرض</span>
// //               </label>
// //             </div>
// //           </div>

// //           <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
// //             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
// //               <h4 style="margin: 0; font-size: 1rem; color: var(--text-dark);">معرض صور هذا العمل</h4>
// //               <label class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem; cursor:pointer;">
// //                 <i class="fas fa-plus"></i> رفع صور جديدة
// //                 <input type="file" accept="image/*" multiple style="display:none" (change)="onNewImagesSelected($event)">
// //               </label>
// //             </div>

// //             <div *ngIf="editing.images.length === 0 && pendingNewImages.length === 0"
// //                  style="text-align: center; padding: 1.5rem; color: var(--text-light); border: 2px dashed var(--border-color); border-radius: var(--radius-sm);">
// //               <i class="fas fa-image" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
// //               <span>لا توجد صور فرعية مضافة بعد.</span>
// //             </div>

// //             <!-- الصور الموجودة بالفعل على السيرفر -->
// //             <div *ngFor="let img of editing.images; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
// //               <img [src]="resolveUrl(img.imageUrl)" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
// //               <span style="flex:1;"></span>
// //               <button type="button" class="btn-delete" (click)="removeExistingImage(i)" title="حذف الصورة">
// //                 <i class="fas fa-trash"></i>
// //               </button>
// //             </div>

// //             <!-- الصور الجديدة المختارة (لسه مش مرفوعة) -->
// //             <div *ngFor="let p of pendingNewImages; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
// //               <img [src]="p.preview" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
// //               <span style="flex:1; color: var(--text-light); font-size: 0.85rem;">{{ p.file.name }} (جديدة)</span>
// //               <button type="button" class="btn-delete" (click)="removePendingImage(i)" title="إلغاء">
// //                 <i class="fas fa-trash"></i>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div class="modal-footer">
// //           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
// // <button class="btn-save" (click)="save()" [disabled]="saving">
// //   <i class="fas fa-save"></i>
// //   {{ saving ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
// // </button>
// //           </div>
// //       </div>
// //     </div>

// //     <!-- Confirm delete popup (responsive) -->
// //     <div
// //       class="confirm-overlay"
// //       *ngIf="confirmOpen"
// //       (click)="closeConfirm()"
// //       aria-modal="true"
// //       role="dialog"
// //     >
// //       <div class="confirm-modal" (click)="$event.stopPropagation()">
// //         <div class="confirm-header">
// //           <h3>تأكيد الحذف</h3>
// //           <button class="modal-close" (click)="closeConfirm()" aria-label="إغلاق">
// //             <i class="fas fa-times"></i>
// //           </button>
// //         </div>

// //         <div class="confirm-body">
// //           هل أنت متأكد من حذف هذا العمل؟
// //         </div>

// //         <div class="confirm-footer">
// //           <button class="btn-cancel" (click)="closeConfirm()" [disabled]="deleting">إلغاء</button>
// //           <button
// //             class="btn-save btn-danger"
// //             (click)="performDelete()"
// //             [disabled]="confirmDeleteId == null || deleting"
// //           >
// //             <i class="fas fa-trash"></i> حذف
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: [`
// //     /* Confirm popup (responsive) */
// //     .confirm-overlay {
// //       position: fixed;
// //       inset: 0;
// //       background: rgba(0,0,0,.45);
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       padding: 16px;
// //       z-index: 3000;
// //     }

// //     .confirm-modal {
// //       width: 100%;
// //       max-width: 520px;
// //       background: #fff;
// //       border-radius: 14px;
// //       box-shadow: 0 18px 55px rgba(0,0,0,.25);
// //       overflow: hidden;
// //     }

// //     .confirm-header {
// //       padding: 14px 16px;
// //       display: flex;
// //       align-items: center;
// //       justify-content: space-between;
// //       gap: 12px;
// //       border-bottom: 1px solid rgba(0,0,0,.06);
// //     }

// //     .confirm-body {
// //       padding: 18px 16px;
// //       font-size: 16px;
// //       line-height: 1.6;
// //       text-align: center;
// //       color: #222;
// //     }

// //     .confirm-footer {
// //       padding: 14px 16px;
// //       display: flex;
// //       justify-content: space-between;
// //       gap: 12px;
// //       border-top: 1px solid rgba(0,0,0,.06);
// //     }

// //     @media (max-width: 480px) {
// //       .confirm-body {
// //         font-size: 15px;
// //       }
// //       .confirm-footer {
// //         flex-direction: column-reverse;
// //       }
// //       .confirm-footer button {
// //         width: 100%;
// //       }
// //     }
// //   `]
// // })
// // export class PortfolioComponent implements OnInit {
// //   list: PortfolioCaseDto[] = [];
// //   editing: PortfolioCaseDto | null = null;

// //   confirmOpen = false;
// //   confirmDeleteId: number | null = null;
// //   deleting = false;
// //   saving = false; // <-- أضف هذا

// //   iconOptions: Array<{ label: string; value: string }> = [
// //     { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
// //     { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
// //     { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
// //     { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
// //     { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
// //     { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
// //   ];

// //   // صورة الغلاف (Thumbnail) الجديدة المختارة
// //   thumbnailFile: File | null = null;
// //   thumbnailPreview: string | null = null;

// //   // صور المعرض الجديدة المختارة (لسه مش مرفوعة)
// //   pendingNewImages: { file: File; preview: string }[] = [];

// //   // معرفات الصور القديمة اللي المستخدم طلب حذفها
// //   imagesToDelete: number[] = [];

// //   constructor(
// //     private api: ApiService,
// //     private toast: ToastService,
// //     private dataService: DashboardDataService
// //   ) {}




  
// //   ngOnInit() {
// //     this.dataService.cases$.subscribe((d) => (this.list = d));
// //     if (!this.dataService.loaded) this.load();
// //   }

// //   load() {
// //     this.api.getCases().subscribe((d) => this.dataService.cases$.next(d));
// //   }

// //   resolveUrl(path?: string | null): string {
// //     return this.api.resolveImageUrl(path);
// //   }

// //   edit(item: PortfolioCaseDto | null) {
// //     this.thumbnailFile = null;
// //     this.thumbnailPreview = null;
// //     this.pendingNewImages = [];
// //     this.imagesToDelete = [];

// //     this.editing = item
// //       ? { ...item, images: item.images ? [...item.images] : [] }
// //       : ({
// //           titleAr: '',
// //           titleEn: '',
// //           subtitleAr: '',
// //           subtitleEn: '',
// //           iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
// //           thumbnailUrl: '',
// //           sortOrder: 0,
// //           isActive: true,
// //           images: []
// //         } as PortfolioCaseDto);
// //   }

// //   onThumbnailSelected(event: Event) {
// //     const input = event.target as HTMLInputElement;
// //     const file = input.files?.[0];
// //     if (!file) return;
// //     this.thumbnailFile = file;
// //     const reader = new FileReader();
// //     reader.onload = () => (this.thumbnailPreview = reader.result as string);
// //     reader.readAsDataURL(file);
// //   }

// //   onNewImagesSelected(event: Event) {
// //     const input = event.target as HTMLInputElement;
// //     const files = Array.from(input.files || []);
// //     files.forEach((file) => {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.pendingNewImages.push({ file, preview: reader.result as string });
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //     input.value = '';
// //   }

// //   removePendingImage(index: number) {
// //     this.pendingNewImages.splice(index, 1);
// //   }

// //   removeExistingImage(index: number) {
// //     if (!this.editing) return;
// //     const img = this.editing.images[index];
// //     if (img?.id) this.imagesToDelete.push(img.id);
// //     this.editing.images.splice(index, 1);
// //   }

// //   save() {
// //     if (this.saving || !this.editing) return;

// //     // لو المستخدم اختار صورة غلاف جديدة، تتحط ضمن الصور الجديدة برضه
// //     // وبعد الرفع السيرفر بياخد أول صورة كـ Thumbnail لو مفيش رابط محدد
// //     const newFiles = this.thumbnailFile
// //       ? [this.thumbnailFile, ...this.pendingNewImages.map((p) => p.file)]
// //       : this.pendingNewImages.map((p) => p.file);

// //     // لو مفيش thumbnailUrl قديم وهيتحط صورة غلاف جديدة، سيبها فاضية عشان السيرفر ياخد أول صورة مرفوعة
// //     if (this.thumbnailFile) {
// //       this.editing.thumbnailUrl = '';
// //     }
// //     this.saving = true;

// //     const obs = this.editing.id
// //       ? this.api.updateCase(this.editing.id, this.editing, newFiles, this.imagesToDelete)
// //       : this.api.createCase(this.editing, newFiles, this.imagesToDelete);

// //      obs.subscribe({
// //       next: () => {
// //         this.toast.show('تم الحفظ بنجاح ✅', 'success');
// //         this.editing = null;       // إغلاق المودال
// //         this.saving = false;
// //         this.load();              // تحديث القائمة
// //       },
// //       error: (err) => {
// //         this.saving = false;
// //         this.toast.show('حدث خطأ أثناء الحفظ', 'error');
// //         console.error(err);
// //       }
// //     });
// //   }

// //   requestDelete(id: number) {
// //     this.confirmDeleteId = id;
// //     this.confirmOpen = true;
// //   }

// //   closeConfirm() {
// //     if (this.deleting) return;
// //     this.confirmOpen = false;
// //     this.confirmDeleteId = null;
// //   }

// //   performDelete() {
// //     if (this.confirmDeleteId == null) return;
// //     this.deleting = true;

// //     this.api.deleteCase(this.confirmDeleteId).subscribe({
// //       next: () => {
// //         this.toast.show('تم الحذف');
// //         this.deleting = false;
// //         this.confirmOpen = false;
// //         this.confirmDeleteId = null;
// //         this.load();
// //       },
// //       error: () => {
// //         this.deleting = false;
// //         this.toast.show('فشل الحذف', 'error');
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
// import { PortfolioCaseDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-portfolio',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="page-header">
//       <div>
//         <h2>إدارة معرض الأعمال</h2>
//         <p>عرض وتعديل ملفات وصور مشاريع وأعمال د. أحمد قنديل</p>
//       </div>
//       <button class="btn-add" (click)="edit(null)">
//         <i class="fas fa-plus"></i> إضافة عمل جديد
//       </button>
//     </div>

//     <div class="table-wrapper">
//       <table class="table">
//         <thead>
//           <tr>
//             <th>عنوان العمل (عربي)</th>
//             <th>الوصف المختصر (عربي)</th>
//             <th style="width: 120px; text-align: center;">عدد الصور</th>
//             <th style="width: 120px;">الحالة</th>
//             <th style="width: 140px; text-align: center;">الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngIf="list.length === 0">
//             <td colspan="5" class="empty-state">
//               <i class="fas fa-images"></i>
//               <span>لا توجد أعمال مضافة حالياً.</span>
//             </td>
//           </tr>
//           <tr *ngFor="let item of list">
//             <td><strong>{{ item.titleAr }}</strong></td>
//             <td>{{ item.subtitleAr }}</td>
//             <td style="text-align: center;">
//               <span class="badge">
//                 <i class="fas fa-image" style="margin-left: 4px;"></i>
//                 {{ item.images?.length || 0 }}
//               </span>
//             </td>
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
//           <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} عمل</h3>
//           <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
//         </div>

//         <div class="modal-body">
//           <div class="form-row">
//             <div class="form-group">
//               <label>العنوان (عربي)</label>
//               <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: ابتسامة هوليوود">
//             </div>
//             <div class="form-group">
//               <label>العنوان (إنجليزي)</label>
//               <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Hollywood Smile">
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الوصف المختصر (عربي)</label>
//               <input [(ngModel)]="editing.subtitleAr" class="form-control" placeholder="تفاصيل سريعة للعمل...">
//             </div>
//             <div class="form-group">
//               <label>الوصف المختصر (إنجليزي)</label>
//               <input [(ngModel)]="editing.subtitleEn" class="form-control" placeholder="Quick English subtitle...">
//             </div>
//           </div>

//           <div class="form-row">
//             <div class="form-group">
//               <label>الأيقونة المميزة (Class)</label>

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
//             <div class="form-group">
//               <label>الصورة المصغرة الرئيسية (Thumbnail)</label>
//               <input type="file" accept="image/*" class="form-control" (change)="onThumbnailSelected($event)">
//               <img *ngIf="thumbnailPreview || editing.thumbnailUrl"
//                    [src]="thumbnailPreview || resolveUrl(editing.thumbnailUrl)"
//                    style="max-width: 120px; margin-top: 0.5rem; border-radius: 6px; display:block;">
//             </div>
//           </div>

//           <div class="form-row" style="align-items: center;">
//             <div class="form-group">
//               <label>الترتيب</label>
//               <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
//             </div>
//             <div class="form-group" style="padding-top: 1.5rem;">
//               <label class="checkbox-container">
//                 <input type="checkbox" [(ngModel)]="editing.isActive">
//                 <span>نشر هذا العمل في المعرض</span>
//               </label>
//             </div>
//           </div>

//           <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
//             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
//               <h4 style="margin: 0; font-size: 1rem; color: var(--text-dark);">معرض صور هذا العمل</h4>
//               <label class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem; cursor:pointer;">
//                 <i class="fas fa-plus"></i> رفع صور جديدة
//                 <input type="file" accept="image/*" multiple style="display:none" (change)="onNewImagesSelected($event)">
//               </label>
//             </div>

//             <div *ngIf="editing.images.length === 0 && pendingNewImages.length === 0"
//                  style="text-align: center; padding: 1.5rem; color: var(--text-light); border: 2px dashed var(--border-color); border-radius: var(--radius-sm);">
//               <i class="fas fa-image" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
//               <span>لا توجد صور فرعية مضافة بعد.</span>
//             </div>

//             <!-- الصور الموجودة بالفعل على السيرفر -->
//             <div *ngFor="let img of editing.images; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
//               <img [src]="resolveUrl(img.imageUrl)" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
//               <span style="flex:1;"></span>
//               <button type="button" class="btn-delete" (click)="removeExistingImage(i)" title="حذف الصورة">
//                 <i class="fas fa-trash"></i>
//               </button>
//             </div>

//             <!-- الصور الجديدة المختارة (لسه مش مرفوعة) -->
//             <div *ngFor="let p of pendingNewImages; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
//               <img [src]="p.preview" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
//               <span style="flex:1; color: var(--text-light); font-size: 0.85rem;">{{ p.file.name }} (جديدة)</span>
//               <button type="button" class="btn-delete" (click)="removePendingImage(i)" title="إلغاء">
//                 <i class="fas fa-trash"></i>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div class="modal-footer">
//           <button class="btn-cancel" (click)="editing=null">إلغاء</button>
//           <button class="btn-save" (click)="save()" [disabled]="saving">
//             <i class="fas fa-save"></i>
//             {{ saving ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
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
//           هل أنت متأكد من حذف هذا العمل؟
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
// export class PortfolioComponent implements OnInit {
//   list: PortfolioCaseDto[] = [];
//   editing: PortfolioCaseDto | null = null;

//   confirmOpen = false;
//   confirmDeleteId: number | null = null;
//   deleting = false;
//   saving = false;

//   iconOptions: Array<{ label: string; value: string }> = [
//     { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
//     { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
//     { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
//     { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
//     { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
//     { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
//   ];

//   // صورة الغلاف (Thumbnail) الجديدة المختارة
//   thumbnailFile: File | null = null;
//   thumbnailPreview: string | null = null;

//   // صور المعرض الجديدة المختارة (لسه مش مرفوعة)
//   pendingNewImages: { file: File; preview: string }[] = [];

//   // معرفات الصور القديمة اللي المستخدم طلب حذفها
//   imagesToDelete: number[] = [];

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit() {
//     this.dataService.cases$.subscribe((d) => (this.list = d));
//     if (!this.dataService.loaded) this.load();
//   }

//   load() {
//     this.api.getCases().subscribe((d) => this.dataService.cases$.next(d));
//   }

//   resolveUrl(path?: string | null): string {
//     return this.api.resolveImageUrl(path);
//   }

//   edit(item: PortfolioCaseDto | null) {
//     this.thumbnailFile = null;
//     this.thumbnailPreview = null;
//     this.pendingNewImages = [];
//     this.imagesToDelete = [];

//     this.editing = item
//       ? { ...item, images: item.images ? [...item.images] : [] }
//       : ({
//           titleAr: '',
//           titleEn: '',
//           subtitleAr: '',
//           subtitleEn: '',
//           iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
//           thumbnailUrl: '',
//           sortOrder: 0,
//           isActive: true,
//           images: []
//         } as PortfolioCaseDto);
//   }

//   onThumbnailSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];
//     if (!file) return;
//     this.thumbnailFile = file;
//     const reader = new FileReader();
//     reader.onload = () => (this.thumbnailPreview = reader.result as string);
//     reader.readAsDataURL(file);
//   }

//   onNewImagesSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const files = Array.from(input.files || []);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.pendingNewImages.push({ file, preview: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     });
//     input.value = '';
//   }

//   removePendingImage(index: number) {
//     this.pendingNewImages.splice(index, 1);
//   }

//   removeExistingImage(index: number) {
//     if (!this.editing) return;
//     const img = this.editing.images[index];
//     if (img?.id) this.imagesToDelete.push(img.id);
//     this.editing.images.splice(index, 1);
//   }

//   save() {
//     // منع النقر المتعدد
//     if (this.saving || !this.editing) return;

//     // تجهيز الملفات
//     const newFiles = this.thumbnailFile
//       ? [this.thumbnailFile, ...this.pendingNewImages.map((p) => p.file)]
//       : this.pendingNewImages.map((p) => p.file);

//     if (this.thumbnailFile) {
//       this.editing.thumbnailUrl = '';
//     }

//     // تعطيل الزر وتحديث الواجهة فوراً
//     this.saving = true;
//     this.cdr.detectChanges();

//     const obs = this.editing.id
//       ? this.api.updateCase(this.editing.id, this.editing, newFiles, this.imagesToDelete)
//       : this.api.createCase(this.editing, newFiles, this.imagesToDelete);

//     obs.pipe(
//       // finalize يضمن إعادة تمكين الزر بغض النظر عن النتيجة
//       finalize(() => {
//         this.saving = false;
//         this.cdr.detectChanges();
//       })
//     ).subscribe({
//       next: () => {
//         this.toast.show('تم الحفظ بنجاح ✅', 'success');
//         // إغلاق المودال أولاً
//         this.editing = null;
//         this.cdr.detectChanges();
//         // ثم تحديث القائمة
//         this.load();
//       },
//       error: (err) => {
//         this.toast.show('حدث خطأ أثناء الحفظ', 'error');
//         console.error(err);
//         // المودال يبقى مفتوحاً لتصحيح البيانات
//       }
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

//     this.api.deleteCase(this.confirmDeleteId).subscribe({
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
import { PortfolioCaseDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h2>إدارة معرض الأعمال</h2>
        <p>عرض وتعديل ملفات وصور مشاريع وأعمال د. أحمد قنديل</p>
      </div>
      <button class="btn-add" (click)="edit(null)">
        <i class="fas fa-plus"></i> إضافة عمل جديد
      </button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>عنوان العمل (عربي)</th>
            <th>الوصف المختصر (عربي)</th>
            <th style="width: 120px; text-align: center;">عدد الصور</th>
            <th style="width: 120px;">الحالة</th>
            <th style="width: 140px; text-align: center;">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="list.length === 0">
            <td colspan="5" class="empty-state">
              <i class="fas fa-images"></i>
              <span>لا توجد أعمال مضافة حالياً.</span>
            </td>
          </tr>
          <tr *ngFor="let item of list">
            <td><strong>{{ item.titleAr }}</strong></td>
            <td>{{ item.subtitleAr }}</td>
            <td style="text-align: center;">
              <span class="badge">
                <i class="fas fa-image" style="margin-left: 4px;"></i>
                {{ item.images?.length || 0 }}
              </span>
            </td>
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
          <h3>{{ editing.id ? 'تعديل' : 'إضافة' }} عمل</h3>
          <button class="modal-close" (click)="editing=null"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>العنوان (عربي)</label>
              <input [(ngModel)]="editing.titleAr" class="form-control" placeholder="مثال: ابتسامة هوليوود">
            </div>
            <div class="form-group">
              <label>العنوان (إنجليزي)</label>
              <input [(ngModel)]="editing.titleEn" class="form-control" placeholder="Example: Hollywood Smile">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الوصف المختصر (عربي)</label>
              <input [(ngModel)]="editing.subtitleAr" class="form-control" placeholder="تفاصيل سريعة للعمل...">
            </div>
            <div class="form-group">
              <label>الوصف المختصر (إنجليزي)</label>
              <input [(ngModel)]="editing.subtitleEn" class="form-control" placeholder="Quick English subtitle...">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>الأيقونة المميزة (Class)</label>

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
            <div class="form-group">
              <label>الصورة المصغرة الرئيسية (Thumbnail)</label>
              <input type="file" accept="image/*" class="form-control" (change)="onThumbnailSelected($event)">
              <img *ngIf="thumbnailPreview || editing.thumbnailUrl"
                   [src]="thumbnailPreview || resolveUrl(editing.thumbnailUrl)"
                   style="max-width: 120px; margin-top: 0.5rem; border-radius: 6px; display:block;">
            </div>
          </div>

          <div class="form-row" style="align-items: center;">
            <div class="form-group">
              <label>الترتيب</label>
              <input type="number" [(ngModel)]="editing.sortOrder" class="form-control">
            </div>
            <div class="form-group" style="padding-top: 1.5rem;">
              <label class="checkbox-container">
                <input type="checkbox" [(ngModel)]="editing.isActive">
                <span>نشر هذا العمل في المعرض</span>
              </label>
            </div>
          </div>

          <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 style="margin: 0; font-size: 1rem; color: var(--text-dark);">معرض صور هذا العمل</h4>
              <label class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem; cursor:pointer;">
                <i class="fas fa-plus"></i> رفع صور جديدة
                <input type="file" accept="image/*" multiple style="display:none" (change)="onNewImagesSelected($event)">
              </label>
            </div>

            <div *ngIf="editing.images.length === 0 && pendingNewImages.length === 0"
                 style="text-align: center; padding: 1.5rem; color: var(--text-light); border: 2px dashed var(--border-color); border-radius: var(--radius-sm);">
              <i class="fas fa-image" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
              <span>لا توجد صور فرعية مضافة بعد.</span>
            </div>

            <!-- الصور الموجودة بالفعل على السيرفر -->
            <div *ngFor="let img of editing.images; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
              <img [src]="resolveUrl(img.imageUrl)" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
              <span style="flex:1;"></span>
              <button type="button" class="btn-delete" (click)="removeExistingImage(i)" title="حذف الصورة">
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <!-- الصور الجديدة المختارة (لسه مش مرفوعة) -->
            <div *ngFor="let p of pendingNewImages; let i=index" class="form-row" style="align-items: center; margin-bottom: 0.5rem; gap: 0.5rem;">
              <img [src]="p.preview" style="width:56px;height:56px;object-fit:cover;border-radius:6px;">
              <span style="flex:1; color: var(--text-light); font-size: 0.85rem;">{{ p.file.name }} (جديدة)</span>
              <button type="button" class="btn-delete" (click)="removePendingImage(i)" title="إلغاء">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" (click)="editing=null">إلغاء</button>
          <button class="btn-save" (click)="save()" [disabled]="saving">
            <i class="fas fa-save"></i>
            {{ saving ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
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
          هل أنت متأكد من حذف هذا العمل؟
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
      .confirm-body { font-size: 15px; }
      .confirm-footer { flex-direction: column-reverse; }
      .confirm-footer button { width: 100%; }
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
export class PortfolioComponent implements OnInit {
  list: PortfolioCaseDto[] = [];
  editing: PortfolioCaseDto | null = null;

  confirmOpen = false;
  confirmDeleteId: number | null = null;
  deleting = false;
  saving = false;

  iconOptions: Array<{ label: string; value: string }> = [
    { label: 'أسنان (Tooth)', value: 'fas fa-tooth' },
    { label: 'فرشاة الأسنان (Toothbrush)', value: 'fas fa-toothbrush' },
    { label: 'ابتسامة / صحة الفم (Smile)', value: 'fas fa-smile' },
    { label: 'طبيب أسنان (User MD)', value: 'fas fa-user-md' },
    { label: 'قلب / نبض (Heartbeat)', value: 'fas fa-heartbeat' },
    { label: 'طب أسنان (Stethoscope)', value: 'fas fa-stethoscope' }
  ];

  thumbnailFile: File | null = null;
  thumbnailPreview: string | null = null;
  pendingNewImages: { file: File; preview: string }[] = [];
  imagesToDelete: number[] = [];

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.cases$.subscribe((d) => {
      this.list = d;
      this.cdr.detectChanges(); // تحديث الواجهة فوراً
    });
    if (!this.dataService.loaded) this.load();
  }

  load() {
    this.api.getCases().subscribe({
      next: (d) => this.dataService.cases$.next(d),
      error: () => this.toast.show('فشل تحميل البيانات', 'error')
    });
  }

  resolveUrl(path?: string | null): string {
    return this.api.resolveImageUrl(path);
  }

  edit(item: PortfolioCaseDto | null) {
    this.thumbnailFile = null;
    this.thumbnailPreview = null;
    this.pendingNewImages = [];
    this.imagesToDelete = [];

    this.editing = item
      ? { ...item, images: item.images ? [...item.images] : [] }
      : ({
          titleAr: '',
          titleEn: '',
          subtitleAr: '',
          subtitleEn: '',
          iconClass: this.iconOptions[0]?.value || 'fas fa-tooth',
          thumbnailUrl: '',
          sortOrder: 0,
          isActive: true,
          images: []
        } as PortfolioCaseDto);
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.thumbnailFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.thumbnailPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  onNewImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.pendingNewImages.push({ file, preview: reader.result as string });
        this.cdr.detectChanges(); // تحديث المعاينة
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  removePendingImage(index: number) {
    this.pendingNewImages.splice(index, 1);
    this.cdr.detectChanges();
  }

  removeExistingImage(index: number) {
    if (!this.editing) return;
    const img = this.editing.images[index];
    if (img?.id) this.imagesToDelete.push(img.id);
    this.editing.images.splice(index, 1);
    this.cdr.detectChanges();
  }

  save() {
    if (this.saving || !this.editing) return;

    const newFiles = this.thumbnailFile
      ? [this.thumbnailFile, ...this.pendingNewImages.map((p) => p.file)]
      : this.pendingNewImages.map((p) => p.file);

    if (this.thumbnailFile) {
      this.editing.thumbnailUrl = '';
    }

    this.saving = true;
    this.cdr.detectChanges();

    const obs = this.editing.id
      ? this.api.updateCase(this.editing.id, this.editing, newFiles, this.imagesToDelete)
      : this.api.createCase(this.editing, newFiles, this.imagesToDelete);

    obs.pipe(
      finalize(() => {
        this.saving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.toast.show('تم الحفظ بنجاح ✅', 'success');
        // إغلاق المودال
        this.editing = null;
        this.cdr.detectChanges();
        // إعادة تحميل القائمة للحصول على أحدث البيانات من الخادم
        this.load();
        // يمكنك أيضاً استخدام this.dataService.refreshCases() بدلاً من this.load()
        // this.dataService.refreshCases();
      },
      error: (err) => {
        this.toast.show('حدث خطأ أثناء الحفظ', 'error');
        console.error(err);
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

    this.api.deleteCase(this.confirmDeleteId).subscribe({
      next: () => {
        this.toast.show('تم الحذف', 'success');
        this.deleting = false;
        this.confirmOpen = false;
        this.confirmDeleteId = null;
        this.load(); // تحديث القائمة بعد الحذف
      },
      error: () => {
        this.deleting = false;
        this.toast.show('فشل الحذف', 'error');
      }
    });
  }
}