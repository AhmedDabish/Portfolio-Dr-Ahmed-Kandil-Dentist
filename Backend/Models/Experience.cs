namespace PortfolioAdmin.API.Models;

public class Experience
{
    public int Id { get; set; }
    public string DateRange { get; set; } = string.Empty; // e.g. "2020 - الآن" (kept as free text, same for both langs)
    public string IconClass { get; set; } = "fas fa-tooth";

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
