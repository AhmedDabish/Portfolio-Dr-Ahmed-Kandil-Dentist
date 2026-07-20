using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;
using PortfolioAdmin.API.Services;

namespace PortfolioAdmin.API.Controllers;

[ApiController]
[Route("api/admin/hero")]
[Authorize]
public class HeroController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IImageService _imageService;

    public HeroController(AppDbContext db, IImageService imageService)
    {
        _db = db;
        _imageService = imageService;
    }

    private static HeroDto ToDto(HeroContent h) => new()
    {
        NameAr = h.NameAr,
        NameEn = h.NameEn,
        TitleAr = h.TitleAr,
        TitleEn = h.TitleEn,
        Credential1Ar = h.Credential1Ar,
        Credential1En = h.Credential1En,
        Credential2Ar = h.Credential2Ar,
        Credential2En = h.Credential2En,
        DescriptionAr = h.DescriptionAr,
        DescriptionEn = h.DescriptionEn,
        BadgeExpAr = h.BadgeExpAr,
        BadgeExpEn = h.BadgeExpEn,
        ShowAvailabilityBadge = h.ShowAvailabilityBadge,
        AvailabilityBadgeAr = h.AvailabilityBadgeAr,
        AvailabilityBadgeEn = h.AvailabilityBadgeEn,
        MedicalTips = JsonSerializer.Deserialize<List<MedicalTipDto>>(h.MedicalTipsJson) ?? new(),
        TypedPhrasesAr = JsonSerializer.Deserialize<List<string>>(h.TypedPhrasesArJson) ?? new(),
        TypedPhrasesEn = JsonSerializer.Deserialize<List<string>>(h.TypedPhrasesEnJson) ?? new(),
        ProfileImageUrl = h.ProfileImageUrl,
        Stat1Value = h.Stat1Value,
        Stat1LabelAr = h.Stat1LabelAr,
        Stat1LabelEn = h.Stat1LabelEn,
        Stat2Value = h.Stat2Value,
        Stat2LabelAr = h.Stat2LabelAr,
        Stat2LabelEn = h.Stat2LabelEn,
        Stat3Value = h.Stat3Value,
        Stat3LabelAr = h.Stat3LabelAr,
        Stat3LabelEn = h.Stat3LabelEn,
        Stat4Value = h.Stat4Value,
        Stat4LabelAr = h.Stat4LabelAr,
        Stat4LabelEn = h.Stat4LabelEn
    };

    [HttpGet]
    public async Task<ActionResult<HeroDto>> Get()
    {
        var hero = await _db.HeroContents.FirstOrDefaultAsync(h => h.Id == 1);
        if (hero is null) return NotFound();
        return Ok(ToDto(hero));
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<HeroDto>> Update([FromForm] HeroUpdateDto dto)
    {
        var hero = await _db.HeroContents.FirstOrDefaultAsync(h => h.Id == 1);
        if (hero is null)
        {
            hero = new HeroContent { Id = 1 };
            _db.HeroContents.Add(hero);
        }

        hero.NameAr = dto.NameAr; hero.NameEn = dto.NameEn;
        hero.TitleAr = dto.TitleAr; hero.TitleEn = dto.TitleEn;
        hero.Credential1Ar = dto.Credential1Ar; hero.Credential1En = dto.Credential1En;
        hero.Credential2Ar = dto.Credential2Ar; hero.Credential2En = dto.Credential2En;
        hero.DescriptionAr = dto.DescriptionAr; hero.DescriptionEn = dto.DescriptionEn;
        hero.BadgeExpAr = dto.BadgeExpAr; hero.BadgeExpEn = dto.BadgeExpEn;

        // بادج "متاح للاستشارات"
        hero.ShowAvailabilityBadge = dto.ShowAvailabilityBadge;
        hero.AvailabilityBadgeAr = dto.AvailabilityBadgeAr;
        hero.AvailabilityBadgeEn = dto.AvailabilityBadgeEn;

        // النصايح الطبية - نتحقق إنها JSON سليم قبل الحفظ
        try
        {
            var parsedTips = JsonSerializer.Deserialize<List<MedicalTipDto>>(dto.MedicalTipsJson) ?? new();
            hero.MedicalTipsJson = JsonSerializer.Serialize(parsedTips);
        }
        catch (JsonException)
        {
            return BadRequest(new { message = "صيغة النصايح الطبية غير صحيحة." });
        }

        hero.TypedPhrasesArJson = JsonSerializer.Serialize(dto.TypedPhrasesAr);
        hero.TypedPhrasesEnJson = JsonSerializer.Serialize(dto.TypedPhrasesEn);

        hero.Stat1Value = dto.Stat1Value; hero.Stat1LabelAr = dto.Stat1LabelAr; hero.Stat1LabelEn = dto.Stat1LabelEn;
        hero.Stat2Value = dto.Stat2Value; hero.Stat2LabelAr = dto.Stat2LabelAr; hero.Stat2LabelEn = dto.Stat2LabelEn;
        hero.Stat3Value = dto.Stat3Value; hero.Stat3LabelAr = dto.Stat3LabelAr; hero.Stat3LabelEn = dto.Stat3LabelEn;
        hero.Stat4Value = dto.Stat4Value; hero.Stat4LabelAr = dto.Stat4LabelAr; hero.Stat4LabelEn = dto.Stat4LabelEn;

        if (dto.ProfileImage != null && dto.ProfileImage.Length > 0)
        {
            if (!string.IsNullOrEmpty(hero.ProfileImageUrl))
                _imageService.DeleteImage(hero.ProfileImageUrl);

            hero.ProfileImageUrl = await _imageService.SaveImageAsync(dto.ProfileImage, "hero");
        }
        else if (!string.IsNullOrEmpty(dto.ExistingProfileImageUrl))
        {
            hero.ProfileImageUrl = dto.ExistingProfileImageUrl;
        }

        hero.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(ToDto(hero));
    }
}