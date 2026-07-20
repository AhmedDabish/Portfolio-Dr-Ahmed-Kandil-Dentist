using PortfolioAdmin.API.Models;
using System.Text.Json;

namespace PortfolioAdmin.API.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        db.Database.EnsureCreated();

        // ============================================================
        // 1. Admin User (بيانات الدخول الافتراضية)
        // ============================================================
        if (!db.AdminUsers.Any())
        {
            db.AdminUsers.Add(new AdminUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("ChangeMe123!"),
                Role = "Admin"
            });
        }

        // ============================================================
        // 2. Hero Content (قسم البطل)
        // ============================================================
        if (!db.HeroContents.Any())
        {
            db.HeroContents.Add(new HeroContent
            {
                Id = 1, // مهم: Id = 1 لأننا استخدمنا ValueGeneratedNever()
                NameAr = "أحمد قنديل",
                NameEn = "Ahmed Qandil",
                TitleAr = "استشاري تجميل وزراعة الأسنان",
                TitleEn = "Consultant in Cosmetic & Dental Implantology",
                Credential1Ar = "BDS, MSc",
                Credential1En = "BDS, MSc",
                Credential2Ar = "عضو الجمعية المصرية",
                Credential2En = "Member of Egyptian Society",
                DescriptionAr = "أحول الابتسامات إلى أعمال فنية باستخدام أحدث تقنيات الطب التجميلي مع رعاية شاملة وراحة لا تضاهى.",
                DescriptionEn = "I transform smiles into art using the latest aesthetic dentistry techniques with comprehensive care and unparalleled comfort.",
                BadgeExpAr = "8+ سنوات خبرة",
                BadgeExpEn = "8+ Years Experience",
                TypedPhrasesArJson = JsonSerializer.Serialize(new[] {
                    "🦷 د. أحمد قنديل - استشاري تجميل وزراعة الأسنان",
                    "✨ خبير في ابتسامة هوليود",
                    "📐 متخصص في التقويم الشفاف",
                    "❤️ نصنع الابتسامات معاً"
                }),
                TypedPhrasesEnJson = JsonSerializer.Serialize(new[] {
                    "🦷 Dr. Ahmed Qandil - Consultant in Cosmetic & Dental Implantology",
                    "✨ Expert in Hollywood Smile",
                    "📐 Specialist in Clear Aligners",
                    "❤️ We craft smiles together"
                }),
                ProfileImageUrl = "", // سيتم استبدالها عند رفع صورة
                Stat1Value = 8,
                Stat1LabelAr = "سنوات خبرة",
                Stat1LabelEn = "Years Experience",
                Stat2Value = 1500,
                Stat2LabelAr = "حالة ناجحة",
                Stat2LabelEn = "Successful Cases",
                Stat3Value = 500,
                Stat3LabelAr = "مريض راضٍ",
                Stat3LabelEn = "Happy Patients",
                Stat4Value = 98,
                Stat4LabelAr = "رضا المرضى",
                Stat4LabelEn = "Patient Satisfaction",
                UpdatedAt = DateTime.UtcNow
            });
        }

        // ============================================================
        // 3. Services (الخدمات)
        // ============================================================
        if (!db.Services.Any())
        {
            db.Services.AddRange(
                new ServiceItem
                {
                    CardNumber = "01",
                    IconClass = "fas fa-tooth",
                    TitleAr = "زراعة الأسنان",
                    TitleEn = "Dental Implants",
                    DescriptionAr = "زراعة دائمة وآمنة بتقنيات متطورة تعيد لك الثقة والابتسامة.",
                    DescriptionEn = "Permanent and safe implants with advanced techniques to restore your confidence and smile.",
                    SortOrder = 1,
                    IsActive = true
                },
                new ServiceItem
                {
                    CardNumber = "02",
                    IconClass = "fas fa-star",
                    TitleAr = "تجميل الأسنان",
                    TitleEn = "Cosmetic Dentistry",
                    DescriptionAr = "فينير، عدسات لاصقة، وتبييض احترافي لابتسامة هوليود.",
                    DescriptionEn = "Veneers, crowns, and professional whitening for a Hollywood smile.",
                    SortOrder = 2,
                    IsActive = true
                },
                new ServiceItem
                {
                    CardNumber = "03",
                    IconClass = "fas fa-ruler-combined",
                    TitleAr = "تقويم الأسنان",
                    TitleEn = "Orthodontics",
                    DescriptionAr = "تقويم شفاف وتقليدي لتصحيح الاعوجاج وتحسين المظهر.",
                    DescriptionEn = "Clear aligners and traditional braces to correct misalignment and improve appearance.",
                    SortOrder = 3,
                    IsActive = true
                }
            );
        }

        // ============================================================
        // 4. Portfolio Cases & Images (الأعمال والصورة)
        // ============================================================
        if (!db.PortfolioCases.Any())
        {
            // الحالة 1: زراعة الفك الكامل
            var case1 = new PortfolioCase
            {
                TitleAr = "زراعة الفك الكامل",
                TitleEn = "Full Jaw Implant",
                SubtitleAr = "تقنية All-on-6 - زراعة 6 دعامات للفك العلوي والسفلي",
                SubtitleEn = "All-on-6 Technique - 6 implants for upper and lower jaw",
                IconClass = "fas fa-tooth",
                ThumbnailUrl = "", // سيتم تحديثها عند رفع الصور
                SortOrder = 1,
                IsActive = true
            };
            //case1.Images.AddRange(new[]
            //{
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case1-1.jpg", SortOrder = 1 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case1-2.jpg", SortOrder = 2 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case1-3.jpg", SortOrder = 3 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case1-4.jpg", SortOrder = 4 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case1-5.jpg", SortOrder = 5 }
            //});

            // الحالة 2: ابتسامة هوليود
            var case2 = new PortfolioCase
            {
                TitleAr = "ابتسامة هوليود",
                TitleEn = "Hollywood Smile",
                SubtitleAr = "تركيب 16 فينير تجميلي - تصميم رقمي دقيق",
                SubtitleEn = "16 Cosmetic Veneers - Digital Smile Design",
                IconClass = "fas fa-star",
                ThumbnailUrl = "",
                SortOrder = 2,
                IsActive = true
            };
            //case2.Images.AddRange(new[]
            //{
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case2-1.jpg", SortOrder = 1 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case2-2.jpg", SortOrder = 2 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case2-3.jpg", SortOrder = 3 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case2-4.jpg", SortOrder = 4 }
            //});

            // الحالة 3: تقويم شفاف
            var case3 = new PortfolioCase
            {
                TitleAr = "تقويم شفاف",
                TitleEn = "Clear Aligners",
                SubtitleAr = "علاج تقويم بالإنفزلاين - مدة العلاج 8 أشهر",
                SubtitleEn = "Invisalign Treatment - 8 Months Duration",
                IconClass = "fas fa-ruler-combined",
                ThumbnailUrl = "",
                SortOrder = 3,
                IsActive = true
            };
            //case3.Images.AddRange(new[]
            //{
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case3-1.jpg", SortOrder = 1 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case3-2.jpg", SortOrder = 2 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case3-3.jpg", SortOrder = 3 },
            //    new PortfolioImage { ImageUrl = "/images/portfolio/case3-4.jpg", SortOrder = 4 }
            //});

            // الحالة 4: زراعة العظم
            var case4 = new PortfolioCase
            {
                TitleAr = "زراعة العظم",
                TitleEn = "Bone Grafting",
                SubtitleAr = "جراحة رفع الجيوب الأنفية وزراعة العظم الصناعي",
                SubtitleEn = "Sinus Lift & Bone Graft Surgery",
                IconClass = "fas fa-bone",
                ThumbnailUrl = "",
                SortOrder = 4,
                IsActive = true
            };
/*            case4.Images.AddRange(new[]
            {
                new PortfolioImage { ImageUrl = "/images/portfolio/case4-1.jpg", SortOrder = 1 },
                new PortfolioImage { ImageUrl = "/images/portfolio/case4-2.jpg", SortOrder = 2 },
                new PortfolioImage { ImageUrl = "/images/portfolio/case4-3.jpg", SortOrder = 3 },
                new PortfolioImage { ImageUrl = "/images/portfolio/case4-4.jpg", SortOrder = 4 }
            });
*/
            db.PortfolioCases.AddRange(case1, case2, case3, case4);
        }

        // ============================================================
        // 5. Experiences (الخبرات)
        // ============================================================
        if (!db.Experiences.Any())
        {
            db.Experiences.AddRange(
                new Experience
                {
                    DateRange = "2020 - الآن",
                    IconClass = "fas fa-tooth",
                    TitleAr = "استشاري تجميل وزراعة الأسنان",
                    TitleEn = "Consultant of Cosmetic & Dental Implantology",
                    OrgAr = "عيادات هوليود للابتسامة",
                    OrgEn = "Hollywood Smile Clinics",
                    DescriptionAr = "إجراء عمليات زراعة متقدمة، تركيب الفينير، والإشراف على فريق التجميل.",
                    DescriptionEn = "Performing advanced implant surgeries, veneer placement, and overseeing the cosmetic team.",
                    BadgeAr = "زميل الكلية الملكية للأسنان",
                    BadgeEn = "Fellow of the Royal College of Dentistry",
                    SortOrder = 1,
                    IsActive = true
                },
                new Experience
                {
                    DateRange = "2017 - 2020",
                    IconClass = "fas fa-scalpel",
                    TitleAr = "أخصائي جراحة الفم",
                    TitleEn = "Oral Surgery Specialist",
                    OrgAr = "مستشفى السلام التخصصي",
                    OrgEn = "Al-Salam Specialized Hospital",
                    DescriptionAr = "علاج جراحات الفك والوجه، وخلع الأسنان المدفونة تحت التخدير.",
                    DescriptionEn = "Treating maxillofacial surgeries and extracting impacted teeth under anesthesia.",
                    BadgeAr = "دبلوم جراحة الوجه والفكين",
                    BadgeEn = "Diploma in Maxillofacial Surgery",
                    SortOrder = 2,
                    IsActive = true
                },
                new Experience
                {
                    DateRange = "2010 - 2015",
                    IconClass = "fas fa-graduation-cap",
                    TitleAr = "بكالوريوس طب الأسنان",
                    TitleEn = "Bachelor of Dental Surgery",
                    OrgAr = "جامعة القاهرة - بتقدير امتياز",
                    OrgEn = "Cairo University - with Honors",
                    DescriptionAr = "تخصص في زراعة وتجميل الأسنان مع مشروع تخرج متميز في زراعة الفك الكامل.",
                    DescriptionEn = "Specialized in implantology and cosmetic dentistry with a distinguished graduation project in full jaw implantation.",
                    BadgeAr = "عضوية الجمعية المصرية لتجميل الأسنان",
                    BadgeEn = "Member of the Egyptian Society for Cosmetic Dentistry",
                    SortOrder = 3,
                    IsActive = true
                }
            );
        }

        // ============================================================
        // 6. Testimonials (الشهادات/آراء المرضى)
        // ============================================================
        if (!db.Testimonials.Any())
        {
            db.Testimonials.AddRange(
                new Testimonial
                {
                    TextAr = "تجربة رائعة، الدكتور أحمد قنديل محترف جداً والنتيجة فاقت توقعاتي. ابتسامتي تغيرت تماماً.",
                    TextEn = "Amazing experience! Dr. Ahmed Qandil is very professional and the results exceeded my expectations. My smile has completely changed.",
                    AuthorAr = "محمد ر.",
                    AuthorEn = "Mohamed R.",
                    SortOrder = 1,
                    IsActive = true
                },
                new Testimonial
                {
                    TextAr = "أفضل طبيب تعاملت معه. شرح لي كل خطوة وكان حريص على راحتي طوال فترة العلاج.",
                    TextEn = "The best dentist I have ever dealt with. He explained every step and was very concerned about my comfort throughout the treatment.",
                    AuthorAr = "سارة م.",
                    AuthorEn = "Sara M.",
                    SortOrder = 2,
                    IsActive = true
                }
            );
        }

        // ============================================================
        // 7. Contact Info (معلومات التواصل)
        // ============================================================
        if (!db.ContactInfos.Any())
        {
            var contact = new ContactInfo
            {
                Id = 1,
                Phone = "+20 100 123 4567",
                Email = "ahmed@example.com",
                AddressAr = "القاهرة، مصر - مدينة نصر",
                AddressEn = "Cairo, Egypt - Nasr City",
                LinkedInUrl = "#",
                InstagramUrl = "#",
                FacebookUrl = "#",
                WhatsAppUrl = "#",
                UpdatedAt = DateTime.UtcNow
            };

            contact.WorkingHours.AddRange(new[]
            {
                new WorkingHour
                {
                    DayLabelAr = "السبت - الأربعاء",
                    DayLabelEn = "Sat - Wed",
                    HoursText = "10:00 ص - 8:00 م",
                    SortOrder = 1
                },
                new WorkingHour
                {
                    DayLabelAr = "الخميس",
                    DayLabelEn = "Thursday",
                    HoursText = "10:00 ص - 4:00 م",
                    SortOrder = 2
                },
                new WorkingHour
                {
                    DayLabelAr = "الجمعة",
                    DayLabelEn = "Friday",
                    HoursText = "مغلق",
                    SortOrder = 3
                }
            });

            db.ContactInfos.Add(contact);
        }

        // ============================================================
        // 8. Site Settings (إعدادات الموقع)
        // ============================================================
        if (!db.SiteSettings.Any())
        {
            db.SiteSettings.Add(new SiteSettings
            {
                Id = 1,
                DefaultLanguage = "ar",
                DefaultTheme = "dark",
                IsMaintenanceMode = false,
                FooterTextAr = "أحمد قنديل - جميع الحقوق محفوظة.",
                FooterTextEn = "Ahmed Qandil - All Rights Reserved."
            });
        }

        // حفظ جميع التغييرات
        db.SaveChanges();
    }
}