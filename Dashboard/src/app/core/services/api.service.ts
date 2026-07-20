// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { environment } from '../../../environments/environment';
// import * as Models from '../../models/portfolio.models';
// import { ApiResponse } from '../../models/portfolio.models';

// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   private base = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   get imageBaseUrl(): string {
//     return this.base.replace(/\/api\/?$/, '');
//   }

//   resolveImageUrl(path?: string | null): string {
//     if (!path) return '';
//     return path.startsWith('http') ? path : `${this.imageBaseUrl}${path}`;
//   }

//   // Public (بدون توكن) - الرد بييجي مباشرة من غير ApiResponse wrapper (شكله ثابت لموقع العرض العام)
//   getPublicPortfolioData(): Observable<any> {
//     return this.http.get<any>(`${this.base}/public/portfolio-data`);
//   }

//   // ---------- Auth (ملفوفة في ApiResponse) ----------
//   login(body: Models.LoginRequest): Observable<Models.LoginResponse> {
//     return this.http
//       .post<ApiResponse<Models.LoginResponse>>(`${this.base}/auth/login`, body)
//       .pipe(map((res) => res.data));
//   }

//   changePassword(body: any): Observable<any> {
//     return this.http
//       .post<ApiResponse<any>>(`${this.base}/auth/change-password`, body)
//       .pipe(map((res) => res.data));
//   }

//   // ---------- Hero ----------
//   getHero(): Observable<Models.HeroDto> {
//     return this.http.get<Models.HeroDto>(`${this.base}/admin/hero`);
//     // ملحوظة: HeroController ما اتلفش في ApiResponse، بيرجع HeroDto مباشرة (شوف رد Update() بتاعه)
//   }

//   private buildHeroFormData(data: Models.HeroDto, imageFile?: File | null): FormData {
//     const fd = new FormData();
//     fd.append('NameAr', data.nameAr || '');
//     fd.append('NameEn', data.nameEn || '');
//     fd.append('TitleAr', data.titleAr || '');
//     fd.append('TitleEn', data.titleEn || '');
//     fd.append('Credential1Ar', data.credential1Ar || '');
//     fd.append('Credential1En', data.credential1En || '');
//     fd.append('Credential2Ar', data.credential2Ar || '');
//     fd.append('Credential2En', data.credential2En || '');
//     fd.append('DescriptionAr', data.descriptionAr || '');
//     fd.append('DescriptionEn', data.descriptionEn || '');
//     fd.append('BadgeExpAr', data.badgeExpAr || '');
//     fd.append('BadgeExpEn', data.badgeExpEn || '');

//     // جديد: بادج "متاح للاستشارات"
//     fd.append('ShowAvailabilityBadge', String(!!data.showAvailabilityBadge));
//     fd.append('AvailabilityBadgeAr', data.availabilityBadgeAr || '');
//     fd.append('AvailabilityBadgeEn', data.availabilityBadgeEn || '');

//     // جديد: النصايح الطبية - بتتبعت كـ JSON string واحد (MedicalTipsJson في الـ DTO)
//     fd.append('MedicalTipsJson', JSON.stringify(data.medicalTips || []));

//     (data.typedPhrasesAr || []).forEach((p) => fd.append('TypedPhrasesAr', p));
//     (data.typedPhrasesEn || []).forEach((p) => fd.append('TypedPhrasesEn', p));

//     fd.append('Stat1Value', String(data.stat1Value ?? 0));
//     fd.append('Stat1LabelAr', data.stat1LabelAr || '');
//     fd.append('Stat1LabelEn', data.stat1LabelEn || '');
//     fd.append('Stat2Value', String(data.stat2Value ?? 0));
//     fd.append('Stat2LabelAr', data.stat2LabelAr || '');
//     fd.append('Stat2LabelEn', data.stat2LabelEn || '');
//     fd.append('Stat3Value', String(data.stat3Value ?? 0));
//     fd.append('Stat3LabelAr', data.stat3LabelAr || '');
//     fd.append('Stat3LabelEn', data.stat3LabelEn || '');
//     fd.append('Stat4Value', String(data.stat4Value ?? 0));
//     fd.append('Stat4LabelAr', data.stat4LabelAr || '');
//     fd.append('Stat4LabelEn', data.stat4LabelEn || '');

//     if (imageFile) {
//       fd.append('ProfileImage', imageFile, imageFile.name);
//     } else {
//       fd.append('ExistingProfileImageUrl', data.profileImageUrl || '');
//     }

//     return fd;
//   }

//   updateHero(data: Models.HeroDto, imageFile?: File | null): Observable<Models.HeroDto> {
//     const fd = this.buildHeroFormData(data, imageFile);
//     return this.http.put<Models.HeroDto>(`${this.base}/admin/hero`, fd);
//   }

//   // ---------- Services (ملفوفة في ApiResponse) ----------
//   getServices(): Observable<Models.ServiceDto[]> {
//     return this.http
//       .get<ApiResponse<Models.ServiceDto[]>>(`${this.base}/admin/services`)
//       .pipe(map((res) => res.data));
//   }

//   createService(data: Models.ServiceDto): Observable<Models.ServiceDto> {
//     return this.http
//       .post<ApiResponse<Models.ServiceDto>>(`${this.base}/admin/services`, data)
//       .pipe(map((res) => res.data));
//   }

//   updateService(id: number, data: Models.ServiceDto): Observable<Models.ServiceDto> {
//     return this.http
//       .put<ApiResponse<Models.ServiceDto>>(`${this.base}/admin/services/${id}`, data)
//       .pipe(map((res) => res.data));
//   }

//   deleteService(id: number): Observable<any> {
//     return this.http.delete(`${this.base}/admin/services/${id}`);
//   }

//   // ---------- Portfolio Cases (غير ملفوفة - PortfolioCasesController يرجّع مباشرة) ----------
//   getCases(): Observable<Models.PortfolioCaseDto[]> {
//     return this.http.get<Models.PortfolioCaseDto[]>(`${this.base}/admin/cases`);
//   }

//   private buildCaseFormData(
//     data: Models.PortfolioCaseDto,
//     newFiles: File[],
//     imagesToDelete: number[]
//   ): FormData {
//     const fd = new FormData();
//     fd.append('TitleAr', data.titleAr || '');
//     fd.append('TitleEn', data.titleEn || '');
//     fd.append('SubtitleAr', data.subtitleAr || '');
//     fd.append('SubtitleEn', data.subtitleEn || '');
//     fd.append('IconClass', data.iconClass || '');
//     fd.append('ThumbnailUrl', data.thumbnailUrl || '');
//     fd.append('SortOrder', String(data.sortOrder ?? 0));
//     fd.append('IsActive', String(!!data.isActive));

//     (data.images || [])
//       .filter((img) => img.id)
//       .forEach((img, i) => {
//         fd.append(`ExistingImages[${i}].Id`, String(img.id));
//         fd.append(`ExistingImages[${i}].ImageUrl`, img.imageUrl || '');
//         fd.append(`ExistingImages[${i}].SortOrder`, String(img.sortOrder ?? 0));
//       });

//     newFiles.forEach((file) => fd.append('NewImages', file, file.name));

//     imagesToDelete.forEach((id, i) => fd.append(`ImagesToDelete[${i}]`, String(id)));

//     return fd;
//   }

//   createCase(
//     data: Models.PortfolioCaseDto,
//     newFiles: File[] = [],
//     imagesToDelete: number[] = []
//   ): Observable<Models.PortfolioCaseDto> {
//     const fd = this.buildCaseFormData(data, newFiles, imagesToDelete);
//     return this.http.post<Models.PortfolioCaseDto>(`${this.base}/admin/cases`, fd);
//   }

//   updateCase(
//     id: number,
//     data: Models.PortfolioCaseDto,
//     newFiles: File[] = [],
//     imagesToDelete: number[] = []
//   ): Observable<Models.PortfolioCaseDto> {
//     const fd = this.buildCaseFormData(data, newFiles, imagesToDelete);
//     return this.http.put<Models.PortfolioCaseDto>(`${this.base}/admin/cases/${id}`, fd);
//   }

//   deleteCase(id: number): Observable<any> {
//     return this.http.delete(`${this.base}/admin/cases/${id}`);
//   }

//   // ---------- Experiences (ملفوفة في ApiResponse - CrudControllerBase) ----------
//   getExperiences(): Observable<Models.ExperienceDto[]> {
//     return this.http
//       .get<ApiResponse<Models.ExperienceDto[]>>(`${this.base}/admin/experiences`)
//       .pipe(map((res) => res.data));
//   }

//   createExperience(data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
//     return this.http
//       .post<ApiResponse<Models.ExperienceDto>>(`${this.base}/admin/experiences`, data)
//       .pipe(map((res) => res.data));
//   }

//   updateExperience(id: number, data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
//     return this.http
//       .put<ApiResponse<Models.ExperienceDto>>(`${this.base}/admin/experiences/${id}`, data)
//       .pipe(map((res) => res.data));
//   }

//   deleteExperience(id: number): Observable<any> {
//     return this.http.delete(`${this.base}/admin/experiences/${id}`);
//   }

//   // ---------- Testimonials (ملفوفة في ApiResponse - CrudControllerBase) ----------
//   getTestimonials(): Observable<Models.TestimonialDto[]> {
//     return this.http
//       .get<ApiResponse<Models.TestimonialDto[]>>(`${this.base}/admin/testimonials`)
//       .pipe(map((res) => res.data));
//   }

//   createTestimonial(data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
//     return this.http
//       .post<ApiResponse<Models.TestimonialDto>>(`${this.base}/admin/testimonials`, data)
//       .pipe(map((res) => res.data));
//   }

//   updateTestimonial(id: number, data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
//     return this.http
//       .put<ApiResponse<Models.TestimonialDto>>(`${this.base}/admin/testimonials/${id}`, data)
//       .pipe(map((res) => res.data));
//   }

//   deleteTestimonial(id: number): Observable<any> {
//     return this.http.delete(`${this.base}/admin/testimonials/${id}`);
//   }

//   // ---------- Contact (غير ملفوفة - ContactController يرجّع مباشرة) ----------
//   getContact(): Observable<Models.ContactDto> {
//     return this.http.get<Models.ContactDto>(`${this.base}/admin/contact`);
//   }

//   updateContact(data: Models.ContactDto): Observable<Models.ContactDto> {
//     return this.http.put<Models.ContactDto>(`${this.base}/admin/contact`, data);
//   }

//   // ---------- Settings (غير ملفوفة - SettingsController يرجّع مباشرة) ----------
//   getSettings(): Observable<Models.SettingsDto> {
//     return this.http.get<Models.SettingsDto>(`${this.base}/admin/settings`);
//   }

//   updateSettings(data: Models.SettingsDto): Observable<Models.SettingsDto> {
//     return this.http.put<Models.SettingsDto>(`${this.base}/admin/settings`, data);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import * as Models from '../../models/portfolio.models';
import { ApiResponse, SettingsDto } from '../../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get imageBaseUrl(): string {
    return this.base.replace(/\/api\/?$/, '');
  }

  resolveImageUrl(path?: string | null): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `${this.imageBaseUrl}${path}`;
  }

  // Public (بدون توكن) - الرد بييجي مباشرة من غير ApiResponse wrapper
  getPublicPortfolioData(): Observable<any> {
    return this.http.get<any>(`${this.base}/public/portfolio-data`);
  }

  // ---------- Auth (ملفوفة في ApiResponse) ----------
  login(body: Models.LoginRequest): Observable<Models.LoginResponse> {
    return this.http
      .post<ApiResponse<Models.LoginResponse>>(`${this.base}/auth/login`, body)
      .pipe(map((res) => res.data));
  }

  changePassword(body: any): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(`${this.base}/auth/change-password`, body)
      .pipe(map((res) => res.data));
  }

  // ---------- Hero ----------
  getHero(): Observable<Models.HeroDto> {
    return this.http.get<Models.HeroDto>(`${this.base}/admin/hero`);
  }

  private buildHeroFormData(data: Models.HeroDto, imageFile?: File | null): FormData {
    const fd = new FormData();
    fd.append('NameAr', data.nameAr || '');
    fd.append('NameEn', data.nameEn || '');
    fd.append('TitleAr', data.titleAr || '');
    fd.append('TitleEn', data.titleEn || '');
    fd.append('Credential1Ar', data.credential1Ar || '');
    fd.append('Credential1En', data.credential1En || '');
    fd.append('Credential2Ar', data.credential2Ar || '');
    fd.append('Credential2En', data.credential2En || '');
    fd.append('DescriptionAr', data.descriptionAr || '');
    fd.append('DescriptionEn', data.descriptionEn || '');
    fd.append('BadgeExpAr', data.badgeExpAr || '');
    fd.append('BadgeExpEn', data.badgeExpEn || '');
    fd.append('ShowAvailabilityBadge', String(!!data.showAvailabilityBadge));
    fd.append('AvailabilityBadgeAr', data.availabilityBadgeAr || '');
    fd.append('AvailabilityBadgeEn', data.availabilityBadgeEn || '');
    fd.append('MedicalTipsJson', JSON.stringify(data.medicalTips || []));
    (data.typedPhrasesAr || []).forEach((p) => fd.append('TypedPhrasesAr', p));
    (data.typedPhrasesEn || []).forEach((p) => fd.append('TypedPhrasesEn', p));
    fd.append('Stat1Value', String(data.stat1Value ?? 0));
    fd.append('Stat1LabelAr', data.stat1LabelAr || '');
    fd.append('Stat1LabelEn', data.stat1LabelEn || '');
    fd.append('Stat2Value', String(data.stat2Value ?? 0));
    fd.append('Stat2LabelAr', data.stat2LabelAr || '');
    fd.append('Stat2LabelEn', data.stat2LabelEn || '');
    fd.append('Stat3Value', String(data.stat3Value ?? 0));
    fd.append('Stat3LabelAr', data.stat3LabelAr || '');
    fd.append('Stat3LabelEn', data.stat3LabelEn || '');
    fd.append('Stat4Value', String(data.stat4Value ?? 0));
    fd.append('Stat4LabelAr', data.stat4LabelAr || '');
    fd.append('Stat4LabelEn', data.stat4LabelEn || '');
    if (imageFile) {
      fd.append('ProfileImage', imageFile, imageFile.name);
    } else {
      fd.append('ExistingProfileImageUrl', data.profileImageUrl || '');
    }
    return fd;
  }

  updateHero(data: Models.HeroDto, imageFile?: File | null): Observable<Models.HeroDto> {
    const fd = this.buildHeroFormData(data, imageFile);
    return this.http.put<Models.HeroDto>(`${this.base}/admin/hero`, fd);
  }

  // ---------- Services (ملفوفة في ApiResponse) ----------
  getServices(): Observable<Models.ServiceDto[]> {
    return this.http
      .get<ApiResponse<Models.ServiceDto[]>>(`${this.base}/admin/services`)
      .pipe(map((res) => res.data));
  }

  createService(data: Models.ServiceDto): Observable<Models.ServiceDto> {
    return this.http
      .post<ApiResponse<Models.ServiceDto>>(`${this.base}/admin/services`, data)
      .pipe(map((res) => res.data));
  }

  updateService(id: number, data: Models.ServiceDto): Observable<Models.ServiceDto> {
    return this.http
      .put<ApiResponse<Models.ServiceDto>>(`${this.base}/admin/services/${id}`, data)
      .pipe(map((res) => res.data));
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/services/${id}`);
  }

  // ---------- Portfolio Cases (غير ملفوفة) ----------
  getCases(): Observable<Models.PortfolioCaseDto[]> {
    return this.http.get<Models.PortfolioCaseDto[]>(`${this.base}/admin/cases`);
  }

  private buildCaseFormData(
    data: Models.PortfolioCaseDto,
    newFiles: File[],
    imagesToDelete: number[]
  ): FormData {
    const fd = new FormData();
    fd.append('TitleAr', data.titleAr || '');
    fd.append('TitleEn', data.titleEn || '');
    fd.append('SubtitleAr', data.subtitleAr || '');
    fd.append('SubtitleEn', data.subtitleEn || '');
    fd.append('IconClass', data.iconClass || '');
    fd.append('ThumbnailUrl', data.thumbnailUrl || '');
    fd.append('SortOrder', String(data.sortOrder ?? 0));
    fd.append('IsActive', String(!!data.isActive));

    (data.images || [])
      .filter((img) => img.id)
      .forEach((img, i) => {
        fd.append(`ExistingImages[${i}].Id`, String(img.id));
        fd.append(`ExistingImages[${i}].ImageUrl`, img.imageUrl || '');
        fd.append(`ExistingImages[${i}].SortOrder`, String(img.sortOrder ?? 0));
      });

    newFiles.forEach((file) => fd.append('NewImages', file, file.name));
    imagesToDelete.forEach((id, i) => fd.append(`ImagesToDelete[${i}]`, String(id)));

    return fd;
  }

  createCase(
    data: Models.PortfolioCaseDto,
    newFiles: File[] = [],
    imagesToDelete: number[] = []
  ): Observable<Models.PortfolioCaseDto> {
    const fd = this.buildCaseFormData(data, newFiles, imagesToDelete);
    return this.http.post<Models.PortfolioCaseDto>(`${this.base}/admin/cases`, fd);
  }

  updateCase(
    id: number,
    data: Models.PortfolioCaseDto,
    newFiles: File[] = [],
    imagesToDelete: number[] = []
  ): Observable<Models.PortfolioCaseDto> {
    const fd = this.buildCaseFormData(data, newFiles, imagesToDelete);
    return this.http.put<Models.PortfolioCaseDto>(`${this.base}/admin/cases/${id}`, fd);
  }

  deleteCase(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/cases/${id}`);
  }

  // ---------- Experiences (ملفوفة في ApiResponse) ----------
  getExperiences(): Observable<Models.ExperienceDto[]> {
    return this.http
      .get<ApiResponse<Models.ExperienceDto[]>>(`${this.base}/admin/experiences`)
      .pipe(map((res) => res.data));
  }

  createExperience(data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
    return this.http
      .post<ApiResponse<Models.ExperienceDto>>(`${this.base}/admin/experiences`, data)
      .pipe(map((res) => res.data));
  }

  updateExperience(id: number, data: Models.ExperienceDto): Observable<Models.ExperienceDto> {
    return this.http
      .put<ApiResponse<Models.ExperienceDto>>(`${this.base}/admin/experiences/${id}`, data)
      .pipe(map((res) => res.data));
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/experiences/${id}`);
  }

  // ---------- Testimonials (ملفوفة في ApiResponse) ----------
  getTestimonials(): Observable<Models.TestimonialDto[]> {
    return this.http
      .get<ApiResponse<Models.TestimonialDto[]>>(`${this.base}/admin/testimonials`)
      .pipe(map((res) => res.data));
  }

  createTestimonial(data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
    return this.http
      .post<ApiResponse<Models.TestimonialDto>>(`${this.base}/admin/testimonials`, data)
      .pipe(map((res) => res.data));
  }

  updateTestimonial(id: number, data: Models.TestimonialDto): Observable<Models.TestimonialDto> {
    return this.http
      .put<ApiResponse<Models.TestimonialDto>>(`${this.base}/admin/testimonials/${id}`, data)
      .pipe(map((res) => res.data));
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.base}/admin/testimonials/${id}`);
  }

  // ---------- Contact (غير ملفوفة) ----------
  getContact(): Observable<Models.ContactDto> {
    return this.http.get<Models.ContactDto>(`${this.base}/admin/contact`);
  }

  updateContact(data: Models.ContactDto): Observable<Models.ContactDto> {
    return this.http.put<Models.ContactDto>(`${this.base}/admin/contact`, data);
  }

  // ---------- Settings (غير ملفوفة) ----------
  getSettings(): Observable<SettingsDto> {
    return this.http.get<SettingsDto>(`${this.base}/admin/settings`);
  }

  updateSettings(data: SettingsDto): Observable<SettingsDto> {
    return this.http.put<SettingsDto>(`${this.base}/admin/settings`, data);
  }
}