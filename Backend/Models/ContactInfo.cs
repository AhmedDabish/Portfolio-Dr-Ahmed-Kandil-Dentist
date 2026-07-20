namespace PortfolioAdmin.API.Models;

// Single-row table (Id = 1)
public class ContactInfo
{
    public int Id { get; set; } = 1;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string AddressAr { get; set; } = string.Empty;
    public string AddressEn { get; set; } = string.Empty;

    public string LinkedInUrl { get; set; } = "#";
    public string InstagramUrl { get; set; } = "#";
    public string FacebookUrl { get; set; } = "#";
    public string WhatsAppUrl { get; set; } = "#";

    public List<WorkingHour> WorkingHours { get; set; } = new();

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class WorkingHour
{
    public int Id { get; set; }
    public int ContactInfoId { get; set; }
    public ContactInfo? ContactInfo { get; set; }
    public string DayLabelAr { get; set; } = string.Empty; // "السبت - الأربعاء"
    public string DayLabelEn { get; set; } = string.Empty;
    public string HoursText { get; set; } = string.Empty; // "10:00 ص - 8:00 م" or "Closed"/"مغلق"
    public int SortOrder { get; set; }
}
