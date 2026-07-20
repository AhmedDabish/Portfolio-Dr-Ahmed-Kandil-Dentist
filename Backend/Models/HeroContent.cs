namespace PortfolioAdmin.API.Models;

public class HeroContent
{
    public int Id { get; set; } = 1;

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

    // ---------- جديد: بادج "متاح للاستشارات" ----------
    public bool ShowAvailabilityBadge { get; set; } = true;
    public string AvailabilityBadgeAr { get; set; } = "متاح للاستشارات";
    public string AvailabilityBadgeEn { get; set; } = "Available for consultations";

    public string TypedPhrasesArJson { get; set; } = "[]";
    public string TypedPhrasesEnJson { get; set; } = "[]";

    public string ProfileImageUrl { get; set; } = string.Empty;

    // ---------- جديد: النصايح الطبية (عدد متغيّر، أيقونة + نص) ----------
    // Serialized JSON list of MedicalTipDto: [{ "iconClass": "fas fa-tooth", "textAr": "...", "textEn": "..." }, ...]
    public string MedicalTipsJson { get; set; } = "[]";

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

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}