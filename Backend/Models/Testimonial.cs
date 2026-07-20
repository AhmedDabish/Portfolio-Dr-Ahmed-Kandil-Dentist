namespace PortfolioAdmin.API.Models;

public class Testimonial
{
    public int Id { get; set; }
    public string TextAr { get; set; } = string.Empty;
    public string TextEn { get; set; } = string.Empty;
    public string AuthorAr { get; set; } = string.Empty;
    public string AuthorEn { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
