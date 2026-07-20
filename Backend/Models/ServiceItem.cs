namespace PortfolioAdmin.API.Models;

public class ServiceItem
{
    public int Id { get; set; }
    public string IconClass { get; set; } = "fas fa-tooth"; // font-awesome class, kept editable
    public string CardNumber { get; set; } = "01";
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
