// // // import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { FormsModule } from '@angular/forms';
// // // import { timeout, catchError, finalize } from 'rxjs/operators';
// // // import { throwError } from 'rxjs';

// // // import { ApiService } from '../../../core/services/api.service';
// // // import { ToastService } from '../../../core/services/toast.service';
// // // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // // import { HeroDto } from '../../../models/portfolio.models';

// // // @Component({
// // //   selector: 'app-hero',
// // //   standalone: true,
// // //   imports: [CommonModule, FormsModule],
// // //   templateUrl: './hero.component.html',
// // //   styleUrls: ['./hero.component.css']
// // // })
// // // export class HeroComponent implements OnInit {
// // //   data: HeroDto = {} as HeroDto;
// // //   stats = [
// // //     { label: 'الإحصائية 1', value: 0, labelAr: '', labelEn: '' },
// // //     { label: 'الإحصائية 2', value: 0, labelAr: '', labelEn: '' },
// // //     { label: 'الإحصائية 3', value: 0, labelAr: '', labelEn: '' },
// // //     { label: 'الإحصائية 4', value: 0, labelAr: '', labelEn: '' }
// // //   ];
// // //   typedAr = '';
// // //   typedEn = '';
// // //   saving = false;

// // //   selectedImageFile: File | null = null;
// // //   imagePreview: string | null = null;

// // //   constructor(
// // //     private api: ApiService,
// // //     private toast: ToastService,
// // //     private dataService: DashboardDataService,
// // //     private cdr: ChangeDetectorRef,
// // //     private zone: NgZone
// // //   ) {}

// // //   ngOnInit() {
// // //     this.dataService.hero$.subscribe((d) => {
// // //       if (d) {
// // //         this.data = d;
// // //         this.updateStats();
// // //         this.typedAr = (d.typedPhrasesAr || []).join('\n');
// // //         this.typedEn = (d.typedPhrasesEn || []).join('\n');
// // //       }
// // //     });

// // //     if (!this.dataService.hero$.value) {
// // //       this.loadData();
// // //     }
// // //   }

// // //   loadData() {
// // //     this.api.getHero().subscribe({
// // //       next: (d) => this.dataService.hero$.next(d),
// // //       error: () => this.toast.show('فشل تحميل البيانات', 'error')
// // //     });
// // //   }

// // //   updateStats() {
// // //     const d = this.data;
// // //     this.stats[0] = { label: 'سنوات الخبرة', value: d.stat1Value, labelAr: d.stat1LabelAr, labelEn: d.stat1LabelEn };
// // //     this.stats[1] = { label: 'الحالات الناجحة', value: d.stat2Value, labelAr: d.stat2LabelAr, labelEn: d.stat2LabelEn };
// // //     this.stats[2] = { label: 'المرضى الراضين', value: d.stat3Value, labelAr: d.stat3LabelAr, labelEn: d.stat3LabelEn };
// // //     this.stats[3] = { label: 'نسبة الرضا', value: d.stat4Value, labelAr: d.stat4LabelAr, labelEn: d.stat4LabelEn };
// // //   }

// // //   resolveUrl(path?: string | null): string {
// // //     return this.api.resolveImageUrl(path);
// // //   }

// // //   onImageSelected(event: Event) {
// // //     const input = event.target as HTMLInputElement;
// // //     const file = input.files?.[0];
// // //     if (!file) return;

// // //     this.compressImage(file, 900, 900, 0.82).then((compressedFile) => {
// // //       this.selectedImageFile = compressedFile;
// // //       const reader = new FileReader();
// // //       reader.onload = () => (this.imagePreview = reader.result as string);
// // //       reader.readAsDataURL(compressedFile);
// // //     }).catch(() => {
// // //       this.selectedImageFile = file;
// // //       const reader = new FileReader();
// // //       reader.onload = () => (this.imagePreview = reader.result as string);
// // //       reader.readAsDataURL(file);
// // //     });
// // //   }

// // //   private compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> {
// // //     return new Promise((resolve, reject) => {
// // //       if (!file.type.startsWith('image/')) {
// // //         reject('not an image');
// // //         return;
// // //       }
// // //       const img = new Image();
// // //       const reader = new FileReader();

// // //       reader.onload = () => {
// // //         img.onload = () => {
// // //           let { width, height } = img;

// // //           if (width > maxWidth || height > maxHeight) {
// // //             const ratio = Math.min(maxWidth / width, maxHeight / height);
// // //             width = Math.round(width * ratio);
// // //             height = Math.round(height * ratio);
// // //           }

// // //           const canvas = document.createElement('canvas');
// // //           canvas.width = width;
// // //           canvas.height = height;
// // //           const ctx = canvas.getContext('2d');
// // //           if (!ctx) {
// // //             reject('no canvas context');
// // //             return;
// // //           }
// // //           ctx.drawImage(img, 0, 0, width, height);

// // //           canvas.toBlob(
// // //             (blob) => {
// // //               if (!blob) {
// // //                 reject('toBlob failed');
// // //                 return;
// // //               }
// // //               const compressedFile = new File([blob], file.name, {
// // //                 type: 'image/jpeg',
// // //                 lastModified: Date.now()
// // //               });
// // //               resolve(compressedFile);
// // //             },
// // //             'image/jpeg',
// // //             quality
// // //           );
// // //         };
// // //         img.onerror = () => reject('image load error');
// // //         img.src = reader.result as string;
// // //       };
// // //       reader.onerror = () => reject('file read error');
// // //       reader.readAsDataURL(file);
// // //     });
// // //   }

// // //   resetForm() {
// // //     this.selectedImageFile = null;
// // //     this.imagePreview = null;
// // //     this.loadData();
// // //     this.toast.show('تم إعادة تعيين النموذج', 'info');
// // //   }

// // //   save() {
// // //     if (this.saving) return;

// // //     console.log('[save] بدء عملية الحفظ...');

// // //     this.data.typedPhrasesAr = this.typedAr.split('\n').filter(s => s.trim());
// // //     this.data.typedPhrasesEn = this.typedEn.split('\n').filter(s => s.trim());

// // //     const statValueKeys = ['stat1Value', 'stat2Value', 'stat3Value', 'stat4Value'] as const;
// // //     const statLabelArKeys = ['stat1LabelAr', 'stat2LabelAr', 'stat3LabelAr', 'stat4LabelAr'] as const;
// // //     const statLabelEnKeys = ['stat1LabelEn', 'stat2LabelEn', 'stat3LabelEn', 'stat4LabelEn'] as const;

// // //     for (let i = 0; i < 4; i++) {
// // //       this.data[statValueKeys[i]] = this.stats[i].value;
// // //       this.data[statLabelArKeys[i]] = this.stats[i].labelAr;
// // //       this.data[statLabelEnKeys[i]] = this.stats[i].labelEn;
// // //     }

// // //     this.setSaving(true);

// // //     this.api.updateHero(this.data, this.selectedImageFile).pipe(
// // //       // تايم آوت حقيقي على مستوى الـ HTTP: لو الاستجابة اتأخرت أكتر من 20 ثانية
// // //       // بنفشل الطلب صراحة بدل ما نفضل معلقين على "جاري الحفظ" للأبد.
// // //       timeout(20000),
// // //       catchError((err) => {
// // //         console.log('[save] catchError اتنفذ:', err);
// // //         const isTimeout = err?.name === 'TimeoutError';
// // //         this.toast.show(
// // //           isTimeout
// // //             ? 'الاتصال بالسيرفر تأخر كتير. جاري التحقق مما إذا كان الحفظ قد تم فعلاً...'
// // //             : (err?.error?.message || 'حدث خطأ أثناء الحفظ'),
// // //           isTimeout ? 'info' : 'error'
// // //         );
// // //         if (isTimeout) {
// // //           this.loadData();
// // //         }
// // //         return throwError(() => err);
// // //       }),
// // //       finalize(() => {
// // //         console.log('[save] finalize اتنفذ - هنقفل الزرار دلوقتي');
// // //         this.setSaving(false);
// // //       })
// // //     ).subscribe({
// // //       next: (d) => {
// // //         console.log('[save] next - نجح الحفظ');
// // //         this.selectedImageFile = null;
// // //         this.imagePreview = null;
// // //         this.dataService.hero$.next(d);
// // //         this.toast.show('تم حفظ المعلومات الشخصية بنجاح ✅', 'success');
// // //       },
// // //       error: (err) => {
// // //         console.log('[save] error في subscribe:', err);
// // //       }
// // //     });
// // //   }

// // //   /**
// // //    * بنغيّر الحالة ونجبر Angular يحدّث الشاشة فورًا داخل الـ NgZone،
// // //    * عشان نضمن إن الزرار مش هيفضل واقف على "جاري الحفظ" حتى لو الـ
// // //    * Response رجع من خارج نطاق Angular's zone لأي سبب (مشكلة معروفة
// // //    * أحيانًا مع بعض إعدادات HttpClient/interceptors).
// // //    */
// // //   private setSaving(value: boolean) {
// // //     this.zone.run(() => {
// // //       this.saving = value;
// // //       this.cdr.detectChanges();
// // //     });
// // //   }
// // // }
// // import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { timeout, catchError, finalize } from 'rxjs/operators';
// // import { throwError } from 'rxjs';

// // import { ApiService } from '../../../core/services/api.service';
// // import { ToastService } from '../../../core/services/toast.service';
// // import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// // import { HeroDto } from '../../../models/portfolio.models';

// // @Component({
// //   selector: 'app-hero',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './hero.component.html',
// //   styleUrls: ['./hero.component.css']
// // })
// // export class HeroComponent implements OnInit {
// //   data: HeroDto = {} as HeroDto;
// //   stats = [
// //     { label: 'الإحصائية 1', value: 0, labelAr: '', labelEn: '' },
// //     { label: 'الإحصائية 2', value: 0, labelAr: '', labelEn: '' },
// //     { label: 'الإحصائية 3', value: 0, labelAr: '', labelEn: '' },
// //     { label: 'الإحصائية 4', value: 0, labelAr: '', labelEn: '' }
// //   ];
// //   typedAr = '';
// //   typedEn = '';
// //   saving = false;

// //   selectedImageFile: File | null = null;
// //   imagePreview: string | null = null;

// //   constructor(
// //     private api: ApiService,
// //     private toast: ToastService,
// //     private dataService: DashboardDataService,
// //     private cdr: ChangeDetectorRef,
// //     private zone: NgZone
// //   ) {}

// //   ngOnInit() {
// //     this.dataService.hero$.subscribe((d) => {
// //       if (d) {
// //         this.data = d;
// //         this.updateStats();
// //         this.typedAr = (d.typedPhrasesAr || []).join('\n');
// //         this.typedEn = (d.typedPhrasesEn || []).join('\n');
// //         this.cdr.detectChanges(); // تحديث الواجهة فوراً
// //       }
// //     });

// //     if (!this.dataService.hero$.value) {
// //       this.loadData();
// //     }
// //   }

// //   loadData() {
// //     this.api.getHero().subscribe({
// //       next: (d) => {
// //         this.dataService.hero$.next(d);
// //         this.cdr.detectChanges();
// //       },
// //       error: () => this.toast.show('فشل تحميل البيانات', 'error')
// //     });
// //   }

// //   updateStats() {
// //     const d = this.data;
// //     this.stats[0] = { label: 'سنوات الخبرة', value: d.stat1Value, labelAr: d.stat1LabelAr, labelEn: d.stat1LabelEn };
// //     this.stats[1] = { label: 'الحالات الناجحة', value: d.stat2Value, labelAr: d.stat2LabelAr, labelEn: d.stat2LabelEn };
// //     this.stats[2] = { label: 'المرضى الراضين', value: d.stat3Value, labelAr: d.stat3LabelAr, labelEn: d.stat3LabelEn };
// //     this.stats[3] = { label: 'نسبة الرضا', value: d.stat4Value, labelAr: d.stat4LabelAr, labelEn: d.stat4LabelEn };
// //   }

// //   resolveUrl(path?: string | null): string {
// //     return this.api.resolveImageUrl(path);
// //   }

// //   onImageSelected(event: Event) {
// //     const input = event.target as HTMLInputElement;
// //     const file = input.files?.[0];
// //     if (!file) return;

// //     this.compressImage(file, 900, 900, 0.82).then((compressedFile) => {
// //       this.selectedImageFile = compressedFile;
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.imagePreview = reader.result as string;
// //         this.cdr.detectChanges();
// //       };
// //       reader.readAsDataURL(compressedFile);
// //     }).catch(() => {
// //       this.selectedImageFile = file;
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         this.imagePreview = reader.result as string;
// //         this.cdr.detectChanges();
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //   }

// //   private compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> {
// //     return new Promise((resolve, reject) => {
// //       if (!file.type.startsWith('image/')) {
// //         reject('not an image');
// //         return;
// //       }
// //       const img = new Image();
// //       const reader = new FileReader();

// //       reader.onload = () => {
// //         img.onload = () => {
// //           let { width, height } = img;

// //           if (width > maxWidth || height > maxHeight) {
// //             const ratio = Math.min(maxWidth / width, maxHeight / height);
// //             width = Math.round(width * ratio);
// //             height = Math.round(height * ratio);
// //           }

// //           const canvas = document.createElement('canvas');
// //           canvas.width = width;
// //           canvas.height = height;
// //           const ctx = canvas.getContext('2d');
// //           if (!ctx) {
// //             reject('no canvas context');
// //             return;
// //           }
// //           ctx.drawImage(img, 0, 0, width, height);

// //           canvas.toBlob(
// //             (blob) => {
// //               if (!blob) {
// //                 reject('toBlob failed');
// //                 return;
// //               }
// //               const compressedFile = new File([blob], file.name, {
// //                 type: 'image/jpeg',
// //                 lastModified: Date.now()
// //               });
// //               resolve(compressedFile);
// //             },
// //             'image/jpeg',
// //             quality
// //           );
// //         };
// //         img.onerror = () => reject('image load error');
// //         img.src = reader.result as string;
// //       };
// //       reader.onerror = () => reject('file read error');
// //       reader.readAsDataURL(file);
// //     });
// //   }

// //   resetForm() {
// //     this.selectedImageFile = null;
// //     this.imagePreview = null;
// //     this.loadData();
// //     this.toast.show('تم إعادة تعيين النموذج', 'info');
// //   }

// //   save() {
// //     if (this.saving) return;

// //     console.log('[save] بدء عملية الحفظ...');

// //     this.data.typedPhrasesAr = this.typedAr.split('\n').filter(s => s.trim());
// //     this.data.typedPhrasesEn = this.typedEn.split('\n').filter(s => s.trim());

// //     const statValueKeys = ['stat1Value', 'stat2Value', 'stat3Value', 'stat4Value'] as const;
// //     const statLabelArKeys = ['stat1LabelAr', 'stat2LabelAr', 'stat3LabelAr', 'stat4LabelAr'] as const;
// //     const statLabelEnKeys = ['stat1LabelEn', 'stat2LabelEn', 'stat3LabelEn', 'stat4LabelEn'] as const;

// //     for (let i = 0; i < 4; i++) {
// //       this.data[statValueKeys[i]] = this.stats[i].value;
// //       this.data[statLabelArKeys[i]] = this.stats[i].labelAr;
// //       this.data[statLabelEnKeys[i]] = this.stats[i].labelEn;
// //     }

// //     // تعطيل الزر وتحديث الواجهة
// //     this.setSaving(true);

// //     this.api.updateHero(this.data, this.selectedImageFile).pipe(
// //       timeout(20000),
// //       catchError((err) => {
// //         console.log('[save] catchError اتنفذ:', err);
// //         const isTimeout = err?.name === 'TimeoutError';
// //         this.toast.show(
// //           isTimeout
// //             ? 'الاتصال بالسيرفر تأخر كتير. جاري التحقق مما إذا كان الحفظ قد تم فعلاً...'
// //             : (err?.error?.message || 'حدث خطأ أثناء الحفظ'),
// //           isTimeout ? 'info' : 'error'
// //         );
// //         if (isTimeout) {
// //           this.loadData();
// //         }
// //         return throwError(() => err);
// //       }),
// //       finalize(() => {
// //         console.log('[save] finalize اتنفذ - هنقفل الزرار دلوقتي');
// //         this.setSaving(false);
// //       })
// //     ).subscribe({
// //       next: (d) => {
// //         console.log('[save] next - نجح الحفظ');
// //         this.selectedImageFile = null;
// //         this.imagePreview = null;
// //         // تحديث الكاش المحلي
// //         this.dataService.hero$.next(d);
// //         // إعادة تحميل البيانات من الخادم للحصول على أحدث إصدار (مثل مسار الصورة)
// //         this.loadData();
// //         this.toast.show('تم حفظ المعلومات الشخصية بنجاح ✅', 'success');
// //         this.cdr.detectChanges();
// //       },
// //       error: (err) => {
// //         console.log('[save] error في subscribe:', err);
// //         // saving سيتم إعادة تعيينه في finalize
// //       }
// //     });
// //   }

// //   /**
// //    * تغيير الحالة وتحديث الواجهة فوراً داخل NgZone
// //    */
// //   private setSaving(value: boolean) {
// //     this.zone.run(() => {
// //       this.saving = value;
// //       this.cdr.detectChanges();
// //     });
// //   }
// // }
// import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { timeout, catchError, finalize } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// import { ApiService } from '../../../core/services/api.service';
// import { ToastService } from '../../../core/services/toast.service';
// import { DashboardDataService } from '../../../core/services/dashboard-data.service';
// import { HeroDto } from '../../../models/portfolio.models';

// @Component({
//   selector: 'app-hero',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './hero.component.html',
//   styleUrls: ['./hero.component.css']
// })
// export class HeroComponent implements OnInit {
//   data: HeroDto = {} as HeroDto;
//   stats = [
//     { label: 'الإحصائية 1', value: 0, labelAr: '', labelEn: '' },
//     { label: 'الإحصائية 2', value: 0, labelAr: '', labelEn: '' },
//     { label: 'الإحصائية 3', value: 0, labelAr: '', labelEn: '' },
//     { label: 'الإحصائية 4', value: 0, labelAr: '', labelEn: '' }
//   ];
//   typedAr = '';
//   typedEn = '';
//   saving = false;

//   // متغيرات الصورة
//   selectedImageFile: File | null = null;
//   imagePreview: string | null = null;

//   constructor(
//     private api: ApiService,
//     private toast: ToastService,
//     private dataService: DashboardDataService,
//     private cdr: ChangeDetectorRef,
//     private zone: NgZone
//   ) {}

//   ngOnInit() {
//     this.dataService.hero$.subscribe((d) => {
//       if (d) {
//         this.data = d;
//         this.updateStats();
//         this.typedAr = (d.typedPhrasesAr || []).join('\n');
//         this.typedEn = (d.typedPhrasesEn || []).join('\n');
//         this.cdr.detectChanges();
//       }
//     });

//     if (!this.dataService.hero$.value) {
//       this.loadData();
//     }
//   }

//   loadData() {
//     this.api.getHero().subscribe({
//       next: (d) => {
//         this.dataService.hero$.next(d);
//         this.cdr.detectChanges();
//       },
//       error: () => this.toast.show('فشل تحميل البيانات', 'error')
//     });
//   }

//   updateStats() {
//     const d = this.data;
//     this.stats[0] = { label: 'سنوات الخبرة', value: d.stat1Value, labelAr: d.stat1LabelAr, labelEn: d.stat1LabelEn };
//     this.stats[1] = { label: 'الحالات الناجحة', value: d.stat2Value, labelAr: d.stat2LabelAr, labelEn: d.stat2LabelEn };
//     this.stats[2] = { label: 'المرضى الراضين', value: d.stat3Value, labelAr: d.stat3LabelAr, labelEn: d.stat3LabelEn };
//     this.stats[3] = { label: 'نسبة الرضا', value: d.stat4Value, labelAr: d.stat4LabelAr, labelEn: d.stat4LabelEn };
//   }

//   resolveUrl(path?: string | null): string {
//     return this.api.resolveImageUrl(path);
//   }

//   // ================================================================
//   // ✅ 1. دالة اختيار الصورة (تم تحسينها بالكامل)
//   // ================================================================
//   onImageSelected(event: Event) {
//     console.log('🖼️ [onImageSelected] تم استدعاء الدالة');
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];

//     if (!file) {
//       console.warn('⚠️ [onImageSelected] لم يتم اختيار أي ملف');
//       return;
//     }

//     console.log(`📁 [onImageSelected] اسم الملف: ${file.name}, الحجم: ${(file.size / 1024).toFixed(2)} كيلوبايت`);

//     // ✅ الخطوة الأولى: خزن الملف الأصلي فوراً عشان لو حصل أي خطأ في الضغط، نفضل محتفظين بالملف
//     this.selectedImageFile = file;

//     // ✅ اعرض معاينة سريعة للملف الأصلي عشان المستخدم يحس إن الصورة اتحددت
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result as string;
//       this.cdr.detectChanges();
//       console.log('✅ [onImageSelected] تم عرض المعاينة المؤقتة');
//     };
//     reader.readAsDataURL(file);

//     // ✅ الآن حاول تضغط الصورة (لو فشلت، هنفضل محتفظين بالملف الأصلي بفضل السطر اللي فوق)
//     this.compressImage(file, 900, 900, 0.82)
//       .then((compressedFile) => {
//         console.log(`✅ [compressImage] تم الضغط بنجاح، الحجم الجديد: ${(compressedFile.size / 1024).toFixed(2)} كيلوبايت`);
//         // استبدل الملف بالملف المضغوط
//         this.selectedImageFile = compressedFile;
//         // حدّث المعاينة بالملف المضغوط (اختياري)
//         const previewReader = new FileReader();
//         previewReader.onload = () => {
//           this.imagePreview = previewReader.result as string;
//           this.cdr.detectChanges();
//         };
//         previewReader.readAsDataURL(compressedFile);
//       })
//       .catch((err) => {
//         // ✅ لو فشل الضغط، هنفضل شغالين بالملف الأصلي (اللي خزناه فوق)
//         console.warn('⚠️ [compressImage] فشل الضغط، سيتم استخدام الملف الأصلي:', err);
//         this.toast.show('تعذر ضغط الصورة، سيتم رفعها بحجمها الأصلي', 'info');
//         // نتأكد إن الملف الأصلي لسه موجود
//         if (!this.selectedImageFile) {
//           this.selectedImageFile = file;
//         }
//         this.cdr.detectChanges();
//       });
//   }

//   // ================================================================
//   // ✅ 2. دالة الضغط (معدلة بحيث ترجع Promise وفيها fallback)
//   // ================================================================
//   private compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> {
//     return new Promise((resolve, reject) => {
//       // لو الملف أصلاً صغير أو مش صورة، ارجعه بدون ضغط
//       if (!file.type.startsWith('image/')) {
//         console.warn('⚠️ [compressImage] الملف ليس صورة، سيتم إرجاعه كما هو');
//         resolve(file);
//         return;
//       }

//       // لو حجم الملف أقل من 300 كيلوبايت، مش محتاج ضغط (وفر وقت)
//       if (file.size < 300 * 1024) {
//         console.log('ℹ️ [compressImage] الملف صغير الحجم، تخطي الضغط');
//         resolve(file);
//         return;
//       }

//       const img = new Image();
//       const reader = new FileReader();

//       reader.onload = () => {
//         img.onload = () => {
//           try {
//             let { width, height } = img;

//             // حساب الأبعاد الجديدة
//             if (width > maxWidth || height > maxHeight) {
//               const ratio = Math.min(maxWidth / width, maxHeight / height);
//               width = Math.round(width * ratio);
//               height = Math.round(height * ratio);
//             }

//             const canvas = document.createElement('canvas');
//             canvas.width = width;
//             canvas.height = height;
//             const ctx = canvas.getContext('2d');

//             if (!ctx) {
//               console.warn('⚠️ [compressImage] لا يمكن الحصول على Context، سيتم إرجاع الملف الأصلي');
//               resolve(file);
//               return;
//             }

//             // رسم الصورة
//             ctx.drawImage(img, 0, 0, width, height);

//             // تحويل إلى Blob
//             canvas.toBlob(
//               (blob) => {
//                 if (!blob) {
//                   console.warn('⚠️ [compressImage] فشل تحويل canvas إلى blob، سيتم إرجاع الملف الأصلي');
//                   resolve(file);
//                   return;
//                 }

//                 // إنشاء ملف جديد مضغوط
//                 const compressedFile = new File([blob], file.name, {
//                   type: 'image/jpeg',
//                   lastModified: Date.now()
//                 });

//                 console.log(`✅ [compressImage] تم الضغط من ${(file.size / 1024).toFixed(2)}KB إلى ${(compressedFile.size / 1024).toFixed(2)}KB`);
//                 resolve(compressedFile);
//               },
//               'image/jpeg',
//               quality
//             );
//           } catch (error) {
//             console.error('❌ [compressImage] خطأ أثناء المعالجة:', error);
//             // في حالة أي خطأ غير متوقع، نرجع الملف الأصلي عشان الشغل يمشي
//             resolve(file);
//           }
//         };

//         img.onerror = () => {
//           console.error('❌ [compressImage] فشل تحميل الصورة في الذاكرة');
//           resolve(file); // ارجع الأصلي بدل الرفض
//         };

//         img.src = reader.result as string;
//       };

//       reader.onerror = () => {
//         console.error('❌ [compressImage] فشل قراءة الملف');
//         resolve(file); // ارجع الأصلي بدل الرفض
//       };

//       reader.readAsDataURL(file);
//     });
//   }

//   // ================================================================
//   // ✅ 3. إعادة تعيين النموذج
//   // ================================================================
//   resetForm() {
//     this.selectedImageFile = null;
//     this.imagePreview = null;
//     this.loadData();
//     this.toast.show('تم إعادة تعيين النموذج', 'info');
//   }

//   // ================================================================
//   // ✅ 4. دالة الحفظ (مع التأكد من وجود الملف)
//   // ================================================================
//   save() {
//     if (this.saving) return;

//     console.log('💾 [save] بدء عملية الحفظ...');
//     console.log('🖼️ [save] selectedImageFile:', this.selectedImageFile);

//     // تجهيز البيانات النصية
//     this.data.typedPhrasesAr = this.typedAr.split('\n').filter(s => s.trim());
//     this.data.typedPhrasesEn = this.typedEn.split('\n').filter(s => s.trim());

//     const statValueKeys = ['stat1Value', 'stat2Value', 'stat3Value', 'stat4Value'] as const;
//     const statLabelArKeys = ['stat1LabelAr', 'stat2LabelAr', 'stat3LabelAr', 'stat4LabelAr'] as const;
//     const statLabelEnKeys = ['stat1LabelEn', 'stat2LabelEn', 'stat3LabelEn', 'stat4LabelEn'] as const;

//     for (let i = 0; i < 4; i++) {
//       this.data[statValueKeys[i]] = this.stats[i].value;
//       this.data[statLabelArKeys[i]] = this.stats[i].labelAr;
//       this.data[statLabelEnKeys[i]] = this.stats[i].labelEn;
//     }

//     // تعطيل الزر
//     this.setSaving(true);

//     // ✅ اتصل بـ API مع الملف (حتى لو كان null، الـ FormData هتتعامل معاه)
//     this.api.updateHero(this.data, this.selectedImageFile).pipe(
//       timeout(20000),
//       catchError((err) => {
//         console.error('❌ [save] خطأ في الطلب:', err);
//         const isTimeout = err?.name === 'TimeoutError';
//         this.toast.show(
//           isTimeout
//             ? 'الاتصال بالسيرفر تأخر كتير. جاري التحقق...'
//             : (err?.error?.message || 'حدث خطأ أثناء الحفظ'),
//           isTimeout ? 'info' : 'error'
//         );
//         if (isTimeout) {
//           this.loadData();
//         }
//         return throwError(() => err);
//       }),
//       finalize(() => {
//         console.log('🔄 [save] finalize - إعادة تفعيل الزر');
//         this.setSaving(false);
//       })
//     ).subscribe({
//       next: (d) => {
//         console.log('✅ [save] تم الحفظ بنجاح');
//         // تنظيف المتغيرات بعد النجاح
//         this.selectedImageFile = null;
//         this.imagePreview = null;
//         // تحديث الكاش
//         this.dataService.hero$.next(d);
//         // إعادة تحميل البيانات من السيرفر عشان نضمن تحديث المسار
//         this.loadData();
//         this.toast.show('تم حفظ المعلومات الشخصية بنجاح ✅', 'success');
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         console.error('❌ [save] خطأ في الـ subscribe:', err);
//         // saving هيتفعل تاني في finalize
//       }
//     });
//   }

//   // ================================================================
//   // ✅ 5. تغيير حالة الزر وتحديث الواجهة فوراً
//   // ================================================================
//   private setSaving(value: boolean) {
//     this.zone.run(() => {
//       this.saving = value;
//       this.cdr.detectChanges();
//     });
//   }
// }
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { HeroDto } from '../../../models/portfolio.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  data: HeroDto = {} as HeroDto;
  stats = [
    { label: 'الإحصائية 1', value: 0, labelAr: '', labelEn: '' },
    { label: 'الإحصائية 2', value: 0, labelAr: '', labelEn: '' },
    { label: 'الإحصائية 3', value: 0, labelAr: '', labelEn: '' },
    { label: 'الإحصائية 4', value: 0, labelAr: '', labelEn: '' }
  ];
  typedAr = '';
  typedEn = '';
  saving = false;

  // متغيرات الصورة
  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dataService: DashboardDataService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.dataService.hero$.subscribe((d) => {
      if (d) {
        this.data = d;
        this.updateStats();
        this.typedAr = (d.typedPhrasesAr || []).join('\n');
        this.typedEn = (d.typedPhrasesEn || []).join('\n');
        this.cdr.detectChanges();
      }
    });

    if (!this.dataService.hero$.value) {
      this.loadData();
    }
  }

  loadData() {
    this.api.getHero().subscribe({
      next: (d) => {
        this.dataService.hero$.next(d);
        this.cdr.detectChanges();
      },
      error: () => this.toast.show('فشل تحميل البيانات', 'error')
    });
  }

  updateStats() {
    const d = this.data;
    this.stats[0] = { label: 'سنوات الخبرة', value: d.stat1Value, labelAr: d.stat1LabelAr, labelEn: d.stat1LabelEn };
    this.stats[1] = { label: 'الحالات الناجحة', value: d.stat2Value, labelAr: d.stat2LabelAr, labelEn: d.stat2LabelEn };
    this.stats[2] = { label: 'المرضى الراضين', value: d.stat3Value, labelAr: d.stat3LabelAr, labelEn: d.stat3LabelEn };
    this.stats[3] = { label: 'نسبة الرضا', value: d.stat4Value, labelAr: d.stat4LabelAr, labelEn: d.stat4LabelEn };
  }

  resolveUrl(path?: string | null): string {
    return this.api.resolveImageUrl(path);
  }

  // ================================================================
  // ✅ دالة اختيار الصورة (محسنة)
  // ================================================================
  onImageSelected(event: Event) {
    console.log('🖼️ [onImageSelected] تم استدعاء الدالة');
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      console.warn('⚠️ [onImageSelected] لم يتم اختيار أي ملف');
      return;
    }

    console.log(`📁 [onImageSelected] اسم الملف: ${file.name}, الحجم: ${(file.size / 1024).toFixed(2)} كيلوبايت`);

    // تخزين الملف الأصلي فوراً
    this.selectedImageFile = file;

    // معاينة سريعة
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
      console.log('✅ [onImageSelected] تم عرض المعاينة المؤقتة');
    };
    reader.readAsDataURL(file);

    // محاولة الضغط
    this.compressImage(file, 900, 900, 0.82)
      .then((compressedFile) => {
        console.log(`✅ [compressImage] تم الضغط بنجاح، الحجم الجديد: ${(compressedFile.size / 1024).toFixed(2)} كيلوبايت`);
        this.selectedImageFile = compressedFile;
        const previewReader = new FileReader();
        previewReader.onload = () => {
          this.imagePreview = previewReader.result as string;
          this.cdr.detectChanges();
        };
        previewReader.readAsDataURL(compressedFile);
      })
      .catch((err) => {
        console.warn('⚠️ [compressImage] فشل الضغط، سيتم استخدام الملف الأصلي:', err);
        this.toast.show('تعذر ضغط الصورة، سيتم رفعها بحجمها الأصلي', 'info');
        if (!this.selectedImageFile) {
          this.selectedImageFile = file;
        }
        this.cdr.detectChanges();
      });
  }

  // ================================================================
  // ✅ دالة الضغط (مع fallback)
  // ================================================================
  private compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/') || file.size < 300 * 1024) {
        resolve(file);
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          try {
            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(file);
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              },
              'image/jpeg',
              quality
            );
          } catch {
            resolve(file);
          }
        };
        img.onerror = () => resolve(file);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }

  // ================================================================
  // ✅ إعادة تعيين النموذج
  // ================================================================
  resetForm() {
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.loadData();
    this.toast.show('تم إعادة تعيين النموذج', 'info');
  }

  // ================================================================
  // ✅ دالة الحفظ (النسخة النهائية)
  // ================================================================
  save() {
    if (this.saving) return;

    console.log('💾 [save] بدء عملية الحفظ...');

    // تجهيز العبارات المكتوبة
    this.data.typedPhrasesAr = this.typedAr.split('\n').filter(s => s.trim());
    this.data.typedPhrasesEn = this.typedEn.split('\n').filter(s => s.trim());

    // ❌ تم إزالة الحلقة التي كانت تنسخ من this.stats إلى this.data
    // لأن this.data مربوطة بـ ngModel ومحدثة تلقائياً

    // تعطيل الزر
    this.setSaving(true);

    this.api.updateHero(this.data, this.selectedImageFile).pipe(
      timeout(20000),
      catchError((err) => {
        console.error('❌ [save] خطأ في الطلب:', err);
        const isTimeout = err?.name === 'TimeoutError';
        // عرض الـ Toast فوراً عند الخطأ
        this.zone.run(() => {
          this.toast.show(
            isTimeout
              ? 'الاتصال بالسيرفر تأخر كتير. جاري التحقق...'
              : (err?.error?.message || 'حدث خطأ أثناء الحفظ'),
            isTimeout ? 'info' : 'error'
          );
          this.cdr.detectChanges();
        });
        if (isTimeout) {
          this.loadData();
        }
        return throwError(() => err);
      }),
      finalize(() => {
        console.log('🔄 [save] finalize - إعادة تفعيل الزر');
        this.setSaving(false);
      })
    ).subscribe({
      next: (d) => {
        console.log('✅ [save] تم الحفظ بنجاح');

        // ✅ عرض الـ Toast فوراً قبل أي عملية أخرى
        this.zone.run(() => {
          this.toast.show('تم حفظ المعلومات الشخصية بنجاح ✅', 'success');
          this.cdr.detectChanges();
        });

        // تنظيف المتغيرات
        this.selectedImageFile = null;
        this.imagePreview = null;

        // تحديث الكاش المحلي
        this.dataService.hero$.next(d);

        // إعادة تحميل البيانات (بعد الـ Toast عشان ما ياخرش)
        this.loadData();
      },
      error: (err) => {
        console.error('❌ [save] خطأ في الـ subscribe:', err);
        // الـ Toast تم عرضه في catchError
      }
    });
  }

  // ================================================================
  // ✅ تغيير حالة الزر وتحديث الواجهة فوراً
  // ================================================================
  private setSaving(value: boolean) {
    this.zone.run(() => {
      this.saving = value;
      this.cdr.detectChanges();
    });
  }
}