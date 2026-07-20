namespace PortfolioAdmin.API.DTOs;

// ---------- Hero ----------
public class HeroDto
{
    public string NameAr { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Credential1Ar { get; set; } = string.Empty;
    public string Credential1En { get; set; } = string.Empty;
    public string Credential2Ar { get; set; } = string.Empty;
    public string Credential2En { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string BadgeExpAr { get; set; } = string.Empty;
    public string BadgeExpEn { get; set; } = string.Empty;

    // جديد
    public bool ShowAvailabilityBadge { get; set; } = true;
    public string AvailabilityBadgeAr { get; set; } = string.Empty;
    public string AvailabilityBadgeEn { get; set; } = string.Empty;
    public List<MedicalTipDto> MedicalTips { get; set; } = new();

    public List<string> TypedPhrasesAr { get; set; } = new();
    public List<string> TypedPhrasesEn { get; set; } = new();
    public string ProfileImageUrl { get; set; } = string.Empty;

    public int Stat1Value { get; set; }
    public string Stat1LabelAr { get; set; } = string.Empty;
    public string Stat1LabelEn { get; set; } = string.Empty;
    public int Stat2Value { get; set; }
    public string Stat2LabelAr { get; set; } = string.Empty;
    public string Stat2LabelEn { get; set; } = string.Empty;
    public int Stat3Value { get; set; }
    public string Stat3LabelAr { get; set; } = string.Empty;
    public string Stat3LabelEn { get; set; } = string.Empty;
    public int Stat4Value { get; set; }
    public string Stat4LabelAr { get; set; } = string.Empty;
    public string Stat4LabelEn { get; set; } = string.Empty;
}
public class MedicalTipDto
{
    public string IconClass { get; set; } = "fas fa-tooth";
    public string TextAr { get; set; } = string.Empty;
    public string TextEn { get; set; } = string.Empty;
}
// ---------- Service ----------
public class ServiceDto
{
    public int Id { get; set; }
    public string IconClass { get; set; } = string.Empty;
    public string CardNumber { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

// ---------- Portfolio case ----------
public class PortfolioImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}

public class PortfolioCaseDto
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string SubtitleAr { get; set; } = string.Empty;
    public string SubtitleEn { get; set; } = string.Empty;
    public string IconClass { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public List<PortfolioImageDto> Images { get; set; } = new();
}

// ---------- Experience ----------
public class ExperienceDto
{
    public int Id { get; set; }
    public string DateRange { get; set; } = string.Empty;
    public string IconClass { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string OrgAr { get; set; } = string.Empty;
    public string OrgEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string BadgeAr { get; set; } = string.Empty;
    public string BadgeEn { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

// ---------- Testimonial ----------
public class TestimonialDto
{
    public int Id { get; set; }
    public string TextAr { get; set; } = string.Empty;
    public string TextEn { get; set; } = string.Empty;
    public string AuthorAr { get; set; } = string.Empty;
    public string AuthorEn { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

// ---------- Contact ----------
public class WorkingHourDto
{
    public int Id { get; set; }
    public string DayLabelAr { get; set; } = string.Empty;
    public string DayLabelEn { get; set; } = string.Empty;
    public string HoursText { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}

public class ContactDto
{
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string AddressAr { get; set; } = string.Empty;
    public string AddressEn { get; set; } = string.Empty;
    public string LinkedInUrl { get; set; } = string.Empty;
    public string InstagramUrl { get; set; } = string.Empty;
    public string FacebookUrl { get; set; } = string.Empty;
    public string WhatsAppUrl { get; set; } = string.Empty;
    public List<WorkingHourDto> WorkingHours { get; set; } = new();
}

// ---------- Settings ----------
public class SettingsDto
{
    public string DefaultLanguage { get; set; } = string.Empty;
    public string DefaultTheme { get; set; } = string.Empty;
    public bool IsMaintenanceMode { get; set; }
    public string FooterTextAr { get; set; } = string.Empty;
    public string FooterTextEn { get; set; } = string.Empty;
}

// ---------- Aggregated public payload (single call for the static portfolio site) ----------
public class PublicPortfolioDataDto
{
    public HeroDto Hero { get; set; } = new();
    public List<ServiceDto> Services { get; set; } = new();
    public List<PortfolioCaseDto> Cases { get; set; } = new();
    public List<ExperienceDto> Experiences { get; set; } = new();
    public List<TestimonialDto> Testimonials { get; set; } = new();
    public ContactDto Contact { get; set; } = new();
    public SettingsDto Settings { get; set; } = new();
}
// ---------- Hero Update with Image ----------
public class HeroUpdateDto
{
    public string NameAr { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Credential1Ar { get; set; } = string.Empty;
    public string Credential1En { get; set; } = string.Empty;
    public string Credential2Ar { get; set; } = string.Empty;
    public string Credential2En { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string BadgeExpAr { get; set; } = string.Empty;
    public string BadgeExpEn { get; set; } = string.Empty;

    // جديد
    public bool ShowAvailabilityBadge { get; set; } = true;
    public string AvailabilityBadgeAr { get; set; } = string.Empty;
    public string AvailabilityBadgeEn { get; set; } = string.Empty;
    // الداشبورد هيبعت الليست دي كـ JSON string جوه الـ FormData (زي TypedPhrases بالظبط)
    public string MedicalTipsJson { get; set; } = "[]";

    public List<string> TypedPhrasesAr { get; set; } = new();
    public List<string> TypedPhrasesEn { get; set; } = new();
    public IFormFile? ProfileImage { get; set; }
    public string? ExistingProfileImageUrl { get; set; }

    public int Stat1Value { get; set; }
    public string Stat1LabelAr { get; set; } = string.Empty;
    public string Stat1LabelEn { get; set; } = string.Empty;
    public int Stat2Value { get; set; }
    public string Stat2LabelAr { get; set; } = string.Empty;
    public string Stat2LabelEn { get; set; } = string.Empty;
    public int Stat3Value { get; set; }
    public string Stat3LabelAr { get; set; } = string.Empty;
    public string Stat3LabelEn { get; set; } = string.Empty;
    public int Stat4Value { get; set; }
    public string Stat4LabelAr { get; set; } = string.Empty;
    public string Stat4LabelEn { get; set; } = string.Empty;
}
// ---------- Portfolio Case with images ----------
public class PortfolioCaseCreateUpdateDto
{
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string SubtitleAr { get; set; } = string.Empty;
    public string SubtitleEn { get; set; } = string.Empty;
    public string IconClass { get; set; } = "fas fa-tooth";
    public string? ThumbnailUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public List<PortfolioImageDto> ExistingImages { get; set; } = new(); // الصور الحالية (مع Id)
    public List<IFormFile> NewImages { get; set; } = new(); // الصور الجديدة
    public List<int> ImagesToDelete { get; set; } = new(); // معرفات الصور المراد حذفها
}
public class AddTestimonialRequestDto
{
    public string Author { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}