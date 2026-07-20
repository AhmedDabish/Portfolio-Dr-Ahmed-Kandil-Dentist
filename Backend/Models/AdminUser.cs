namespace PortfolioAdmin.API.Models;

// Isolated admin users table - has nothing to do with the portfolio's public data.
public class AdminUser
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin"; // Admin, Editor, etc. (future use)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
}
