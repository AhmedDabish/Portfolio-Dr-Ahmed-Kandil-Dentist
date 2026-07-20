export interface HeroData {
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
  stat1Value: number; stat1LabelAr: string; stat1LabelEn: string;
  stat2Value: number; stat2LabelAr: string; stat2LabelEn: string;
  stat3Value: number; stat3LabelAr: string; stat3LabelEn: string;
  stat4Value: number; stat4LabelAr: string; stat4LabelEn: string;
}

export interface ServiceItem {
  id: number;
  iconClass: string;
  cardNumber: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PortfolioImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PortfolioCase {
  id: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconClass: string;
  thumbnailUrl: string;
  sortOrder: number;
  isActive: boolean;
  images: PortfolioImage[];
}

export interface ExperienceItem {
  id: number;
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

export interface TestimonialItem {
  id: number;
  textAr: string;
  textEn: string;
  authorAr: string;
  authorEn: string;
  sortOrder: number;
  isActive: boolean;
}

export interface WorkingHour {
  id: number;
  dayLabelAr: string;
  dayLabelEn: string;
  hoursText: string;
  sortOrder: number;
}

export interface ContactData {
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  linkedInUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsAppUrl: string;
  workingHours: WorkingHour[];
}

export interface SiteSettings {
  defaultLanguage: string;
  defaultTheme: string;
  isMaintenanceMode: boolean;
  footerTextAr: string;
  footerTextEn: string;
}

export interface PublicPortfolioData {
  hero: HeroData;
  services: ServiceItem[];
  cases: PortfolioCase[];
  experiences: ExperienceItem[];
  testimonials: TestimonialItem[];
  contact: ContactData;
  settings: SiteSettings;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
