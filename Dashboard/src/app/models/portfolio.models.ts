// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  expiresAt: Date;
}

// Hero
export interface HeroDto {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  credential1Ar: string;
  credential1En: string;
  credential2Ar: string;
  credential2En: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeExpAr: string;
  badgeExpEn: string;
  typedPhrasesAr: string[];
  typedPhrasesEn: string[];
  profileImageUrl: string;
  stat1Value: number;
  stat1LabelAr: string;
  stat1LabelEn: string;
  stat2Value: number;
  stat2LabelAr: string;
  stat2LabelEn: string;
  stat3Value: number;
  stat3LabelAr: string;
  stat3LabelEn: string;
  stat4Value: number;
  stat4LabelAr: string;
  stat4LabelEn: string;
}

// Service
export interface ServiceDto {
  id?: number;
  iconClass: string;
  cardNumber: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Portfolio
export interface PortfolioImageDto {
  id?: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PortfolioCaseDto {
  id?: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconClass: string;
  thumbnailUrl: string;
  sortOrder: number;
  isActive: boolean;
  images: PortfolioImageDto[];
}

// Experience
export interface ExperienceDto {
  id?: number;
  dateRange: string;
  iconClass: string;
  titleAr: string;
  titleEn: string;
  orgAr: string;
  orgEn: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeAr: string;
  badgeEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Testimonial
export interface TestimonialDto {
  id?: number;
  textAr: string;
  textEn: string;
  authorAr: string;
  authorEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Contact
export interface WorkingHourDto {
  id?: number;
  dayLabelAr: string;
  dayLabelEn: string;
  hoursText: string;
  sortOrder: number;
}

export interface ContactDto {
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  linkedInUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsAppUrl: string;
  workingHours: WorkingHourDto[];
}

// Settings
export interface SettingsDto {
  defaultLanguage: string;
  defaultTheme: string;
  isMaintenanceMode: boolean;
  footerTextAr: string;
  footerTextEn: string;
}

// ---------- Generic API Response wrapper (يطابق شكل الباك اند الجديد) ----------
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  expiresAt: Date;
}

// جديد: النصيحة الطبية
export interface MedicalTipDto {
  iconClass: string;
  textAr: string;
  textEn: string;
}

// Hero
export interface HeroDto {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  credential1Ar: string;
  credential1En: string;
  credential2Ar: string;
  credential2En: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeExpAr: string;
  badgeExpEn: string;

  // جديد: بادج "متاح للاستشارات" + النصايح الطبية
  showAvailabilityBadge: boolean;
  availabilityBadgeAr: string;
  availabilityBadgeEn: string;
  medicalTips: MedicalTipDto[];

  typedPhrasesAr: string[];
  typedPhrasesEn: string[];
  profileImageUrl: string;
  stat1Value: number;
  stat1LabelAr: string;
  stat1LabelEn: string;
  stat2Value: number;
  stat2LabelAr: string;
  stat2LabelEn: string;
  stat3Value: number;
  stat3LabelAr: string;
  stat3LabelEn: string;
  stat4Value: number;
  stat4LabelAr: string;
  stat4LabelEn: string;
}

// Service
export interface ServiceDto {
  id?: number;
  iconClass: string;
  cardNumber: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Portfolio
export interface PortfolioImageDto {
  id?: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PortfolioCaseDto {
  id?: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconClass: string;
  thumbnailUrl: string;
  sortOrder: number;
  isActive: boolean;
  images: PortfolioImageDto[];
}

// Experience
export interface ExperienceDto {
  id?: number;
  dateRange: string;
  iconClass: string;
  titleAr: string;
  titleEn: string;
  orgAr: string;
  orgEn: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeAr: string;
  badgeEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Testimonial
export interface TestimonialDto {
  id?: number;
  textAr: string;
  textEn: string;
  authorAr: string;
  authorEn: string;
  sortOrder: number;
  isActive: boolean;
}

// Contact
export interface WorkingHourDto {
  id?: number;
  dayLabelAr: string;
  dayLabelEn: string;
  hoursText: string;
  sortOrder: number;
}

export interface ContactDto {
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  linkedInUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsAppUrl: string;
  workingHours: WorkingHourDto[];
}

// Settings
export interface SettingsDto {
  defaultLanguage: string;
  defaultTheme: string;
  isMaintenanceMode: boolean;
  footerTextAr: string;
  footerTextEn: string;
}