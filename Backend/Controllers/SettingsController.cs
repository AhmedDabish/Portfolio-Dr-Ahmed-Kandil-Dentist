using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Controllers;

[ApiController]
[Route("api/admin/settings")]
[Authorize]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _db;
    public SettingsController(AppDbContext db) => _db = db;

    private static SettingsDto ToDto(SiteSettings s) => new()
    {
        DefaultLanguage = s.DefaultLanguage, DefaultTheme = s.DefaultTheme,
        IsMaintenanceMode = s.IsMaintenanceMode,
        FooterTextAr = s.FooterTextAr, FooterTextEn = s.FooterTextEn
    };

    [HttpGet]
    public async Task<ActionResult<SettingsDto>> Get()
    {
        var settings = await _db.SiteSettings.FirstOrDefaultAsync(s => s.Id == 1);
        return settings is null ? NotFound() : Ok(ToDto(settings));
    }

    [HttpPut]
    public async Task<ActionResult<SettingsDto>> Update(SettingsDto dto)
    {
        var settings = await _db.SiteSettings.FirstOrDefaultAsync(s => s.Id == 1);
        if (settings is null)
        {
            settings = new SiteSettings { Id = 1 };
            _db.SiteSettings.Add(settings);
        }

        settings.DefaultLanguage = dto.DefaultLanguage;
        settings.DefaultTheme = dto.DefaultTheme;
        settings.IsMaintenanceMode = dto.IsMaintenanceMode;
        settings.FooterTextAr = dto.FooterTextAr;
        settings.FooterTextEn = dto.FooterTextEn;

        await _db.SaveChangesAsync();
        return Ok(ToDto(settings));
    }
}
