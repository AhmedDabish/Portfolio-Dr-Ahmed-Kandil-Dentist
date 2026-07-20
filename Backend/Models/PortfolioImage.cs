namespace PortfolioAdmin.API.Models;

public class PortfolioImage
{
    public int Id { get; set; }
    public int PortfolioCaseId { get; set; }
    public PortfolioCase? PortfolioCase { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}
