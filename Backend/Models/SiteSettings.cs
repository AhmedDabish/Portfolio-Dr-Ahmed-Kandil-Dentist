namespace PortfolioAdmin.API.Models;

// Single-row table (Id = 1) - global site behavior, not visual design.
public class SiteSettings
{
    public int Id { get; set; } = 1;
    public string DefaultLanguage { get; set; } = "ar"; // "ar" | "en"
    public string DefaultTheme { get; set; } = "dark";  // dark | light | blue | royal | midnight | emerald
    public bool IsMaintenanceMode { get; set; } = false;
    public string FooterTextAr { get; set; } = string.Empty;
    public string FooterTextEn { get; set; } = string.Empty;
}
