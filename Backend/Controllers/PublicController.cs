using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Common;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Services;
using PortfolioAdmin.API.Models;   // <-- أضف هذا لاستخدام Testimonial

using PortfolioAdmin.API.Common;
namespace PortfolioAdmin.API.Controllers;

// Public, read-only, anonymous. This is what the static portfolio site (index.html/app.js) calls.
// It never touches AdminUsers and never requires a token.
// IMPORTANT: يرجّع DTOs مش Entities مباشرة، عشان منقعش في Circular Reference
// (PortfolioCase -> Images -> PortfolioCase -> ...) وقت الـ JSON Serialization.
[ApiController]
[Route("api/public")]
[AllowAnonymous]
public class PublicController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _emailService;

    public PublicController(AppDbContext db, IEmailService emailService)
    {
        _db = db;
        _emailService = emailService;
    }
    [HttpGet("portfolio-data")]
    public async Task<ActionResult<PublicPortfolioDataDto>> GetPortfolioData()
    {
        //var heroEntity = await _db.HeroContents.AsNoTracking().FirstOrDefaultAsync(h => h.Id == 1);

        //var services = await _db.Services.AsNoTracking()
        //    .Where(s => s.IsActive)
        //    .OrderBy(s => s.SortOrder)
        //    .Select(s => new ServiceDto
        //    {
        //        Id = s.Id,
        //        IconClass = s.IconClass,
        //        CardNumber = s.CardNumber,
        //        TitleAr = s.TitleAr,
        //        TitleEn = s.TitleEn,
        //        DescriptionAr = s.DescriptionAr,
        //        DescriptionEn = s.DescriptionEn,
        //        SortOrder = s.SortOrder,
        //        IsActive = s.IsActive
        //    })
        //    .ToListAsync();
        var heroEntity = await _db.HeroContents.AsNoTracking().FirstOrDefaultAsync(h => h.Id == 1);
        // استخدم Select بدلاً من جلب الكائنات الكاملة ثم تحويلها
        var services = await _db.Services.AsNoTracking()
            .Where(s => s.IsActive)
            .OrderBy(s => s.SortOrder)
            .Select(s => new ServiceDto
            {
                Id = s.Id,
                IconClass = s.IconClass,
                CardNumber = s.CardNumber,
                TitleAr = s.TitleAr,
                TitleEn = s.TitleEn,
                DescriptionAr = s.DescriptionAr,
                DescriptionEn = s.DescriptionEn,
                SortOrder = s.SortOrder,
                IsActive = s.IsActive
            })
            .ToListAsync();
        var cases = await _db.PortfolioCases.AsNoTracking()
            .Where(p => p.IsActive)
            .OrderBy(p => p.SortOrder)
            .Select(c => new PortfolioCaseDto
            {
                Id = c.Id,
                TitleAr = c.TitleAr,
                TitleEn = c.TitleEn,
                SubtitleAr = c.SubtitleAr,
                SubtitleEn = c.SubtitleEn,
                IconClass = c.IconClass,
                ThumbnailUrl = c.ThumbnailUrl,
                SortOrder = c.SortOrder,
                IsActive = c.IsActive,
                Images = c.Images.OrderBy(i => i.SortOrder)
                    .Select(i => new PortfolioImageDto { Id = i.Id, ImageUrl = i.ImageUrl, SortOrder = i.SortOrder })
                    .ToList()
            })
            .ToListAsync();

        var experiences = await _db.Experiences.AsNoTracking()
            .Where(e => e.IsActive)
            .OrderBy(e => e.SortOrder)
            .Select(e => new ExperienceDto
            {
                Id = e.Id,
                DateRange = e.DateRange,
                IconClass = e.IconClass,
                TitleAr = e.TitleAr,
                TitleEn = e.TitleEn,
                OrgAr = e.OrgAr,
                OrgEn = e.OrgEn,
                DescriptionAr = e.DescriptionAr,
                DescriptionEn = e.DescriptionEn,
                BadgeAr = e.BadgeAr,
                BadgeEn = e.BadgeEn,
                SortOrder = e.SortOrder,
                IsActive = e.IsActive
            })
            .ToListAsync();

        var testimonials = await _db.Testimonials.AsNoTracking()
            .Where(t => t.IsActive)
            .OrderBy(t => t.SortOrder)
            .Select(t => new TestimonialDto
            {
                Id = t.Id,
                TextAr = t.TextAr,
                TextEn = t.TextEn,
                AuthorAr = t.AuthorAr,
                AuthorEn = t.AuthorEn,
                SortOrder = t.SortOrder,
                IsActive = t.IsActive
            })
            .ToListAsync();

        var contactEntity = await _db.ContactInfos.AsNoTracking()
            .Include(c => c.WorkingHours)
            .FirstOrDefaultAsync(c => c.Id == 1);

        var settingsEntity = await _db.SiteSettings.AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == 1);

        var result = new PublicPortfolioDataDto
        {
            Hero = heroEntity is null ? new HeroDto() : new HeroDto
            {
                NameAr = heroEntity.NameAr,
                NameEn = heroEntity.NameEn,
                TitleAr = heroEntity.TitleAr,
                TitleEn = heroEntity.TitleEn,
                Credential1Ar = heroEntity.Credential1Ar,
                Credential1En = heroEntity.Credential1En,
                Credential2Ar = heroEntity.Credential2Ar,
                Credential2En = heroEntity.Credential2En,
                DescriptionAr = heroEntity.DescriptionAr,
                DescriptionEn = heroEntity.DescriptionEn,
                BadgeExpAr = heroEntity.BadgeExpAr,
                BadgeExpEn = heroEntity.BadgeExpEn,
                TypedPhrasesAr = System.Text.Json.JsonSerializer.Deserialize<List<string>>(heroEntity.TypedPhrasesArJson) ?? new(),
                TypedPhrasesEn = System.Text.Json.JsonSerializer.Deserialize<List<string>>(heroEntity.TypedPhrasesEnJson) ?? new(),
                ProfileImageUrl = heroEntity.ProfileImageUrl,
                Stat1Value = heroEntity.Stat1Value,
                Stat1LabelAr = heroEntity.Stat1LabelAr,
                Stat1LabelEn = heroEntity.Stat1LabelEn,
                Stat2Value = heroEntity.Stat2Value,
                Stat2LabelAr = heroEntity.Stat2LabelAr,
                Stat2LabelEn = heroEntity.Stat2LabelEn,
                Stat3Value = heroEntity.Stat3Value,
                Stat3LabelAr = heroEntity.Stat3LabelAr,
                Stat3LabelEn = heroEntity.Stat3LabelEn,
                Stat4Value = heroEntity.Stat4Value,
                Stat4LabelAr = heroEntity.Stat4LabelAr,
                Stat4LabelEn = heroEntity.Stat4LabelEn
            },
            Services = services,
            Cases = cases,
            Experiences = experiences,
            Testimonials = testimonials,
            Contact = contactEntity is null ? new ContactDto() : new ContactDto
            {
                Phone = contactEntity.Phone,
                Email = contactEntity.Email,
                AddressAr = contactEntity.AddressAr,
                AddressEn = contactEntity.AddressEn,
                LinkedInUrl = contactEntity.LinkedInUrl,
                InstagramUrl = contactEntity.InstagramUrl,
                FacebookUrl = contactEntity.FacebookUrl,
                WhatsAppUrl = contactEntity.WhatsAppUrl,
                WorkingHours = contactEntity.WorkingHours.OrderBy(h => h.SortOrder)
                    .Select(h => new WorkingHourDto
                    {
                        Id = h.Id,
                        DayLabelAr = h.DayLabelAr,
                        DayLabelEn = h.DayLabelEn,
                        HoursText = h.HoursText,
                        SortOrder = h.SortOrder
                    }).ToList()
            },
            Settings = settingsEntity is null ? new SettingsDto() : new SettingsDto
            {
                DefaultLanguage = settingsEntity.DefaultLanguage,
                DefaultTheme = settingsEntity.DefaultTheme,
                IsMaintenanceMode = settingsEntity.IsMaintenanceMode,
                FooterTextAr = settingsEntity.FooterTextAr,
                FooterTextEn = settingsEntity.FooterTextEn
            }
        };
        Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
        Response.Headers.Add("Pragma", "no-cache");
        Response.Headers.Add("Expires", "0");

        return Ok(result);
    }
    // Contact form submission from the public site (kept separate from the CV/portfolio content endpoints).
   

    [HttpPost("contact-message")]
    public async Task<IActionResult> SubmitContactMessage([FromBody] ContactMessageDto message)
    {
        if (string.IsNullOrWhiteSpace(message.Name) ||
            string.IsNullOrWhiteSpace(message.Email) ||
            string.IsNullOrWhiteSpace(message.Message))
        {
            return BadRequest(ApiResponse<object>.Fail("من فضلك املأ كل الحقول المطلوبة."));
        }

        try
        {
            await _emailService.SendContactMessageAsync(message.Name, message.Email, message.Phone, message.Message);
        }
        catch
        {
            return StatusCode(500, ApiResponse<object>.Fail("حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى لاحقًا."));
        }

        return Ok(ApiResponse<object>.Ok(null, "تم الإرسال بنجاح."));
    }





    [HttpPost("testimonials")]
    public async Task<IActionResult> AddTestimonial([FromBody] AddTestimonialRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Author) || string.IsNullOrWhiteSpace(dto.Text))
            return BadRequest(ApiResponse<object>.Fail("الاسم والنص مطلوبان."));

        var testimonial = new Testimonial
        {
            TextAr = dto.Text,
            TextEn = dto.Text, // يمكنك ترجمة النص تلقائياً إذا أردت
            AuthorAr = dto.Author,
            AuthorEn = dto.Author,
            SortOrder = 0,
            IsActive = false // يحتاج موافقة المشرف
        };

        // حساب الترتيب التالي (اختياري)
        var maxOrder = await _db.Testimonials.MaxAsync(t => (int?)t.SortOrder) ?? 0;
        testimonial.SortOrder = maxOrder + 1;

        _db.Testimonials.Add(testimonial);
        await _db.SaveChangesAsync();

        return Ok(ApiResponse<object>.Ok(null, "تم إضافة رأيك بنجاح، سيكون مرئياً بعد المراجعة."));
    }
}

public class ContactMessageDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Message { get; set; } = string.Empty;
}