namespace PortfolioAdmin.API.Models;

public class PortfolioCase
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string SubtitleAr { get; set; } = string.Empty;
    public string SubtitleEn { get; set; } = string.Empty;
    public string IconClass { get; set; } = "fas fa-tooth";
    public string ThumbnailUrl { get; set; } = string.Empty; // used in the small grid card
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;

    public List<PortfolioImage> Images { get; set; } = new();
}
