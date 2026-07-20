using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Controllers;

[ApiController]
[Route("api/admin/contact")]
[Authorize]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    public ContactController(AppDbContext db) => _db = db;

    private static ContactDto ToDto(ContactInfo c) => new()
    {
        Phone = c.Phone, Email = c.Email,
        AddressAr = c.AddressAr, AddressEn = c.AddressEn,
        LinkedInUrl = c.LinkedInUrl, InstagramUrl = c.InstagramUrl,
        FacebookUrl = c.FacebookUrl, WhatsAppUrl = c.WhatsAppUrl,
        WorkingHours = c.WorkingHours.OrderBy(h => h.SortOrder)
            .Select(h => new WorkingHourDto { Id = h.Id, DayLabelAr = h.DayLabelAr, DayLabelEn = h.DayLabelEn, HoursText = h.HoursText, SortOrder = h.SortOrder })
            .ToList()
    };

    [HttpGet]
    public async Task<ActionResult<ContactDto>> Get()
    {
        var contact = await _db.ContactInfos.Include(c => c.WorkingHours).FirstOrDefaultAsync(c => c.Id == 1);
        return contact is null ? NotFound() : Ok(ToDto(contact));
    }

    [HttpPut]
    public async Task<ActionResult<ContactDto>> Update(ContactDto dto)
    {
        var contact = await _db.ContactInfos.Include(c => c.WorkingHours).FirstOrDefaultAsync(c => c.Id == 1);
        if (contact is null)
        {
            contact = new ContactInfo { Id = 1 };
            _db.ContactInfos.Add(contact);
        }

        contact.Phone = dto.Phone; contact.Email = dto.Email;
        contact.AddressAr = dto.AddressAr; contact.AddressEn = dto.AddressEn;
        contact.LinkedInUrl = dto.LinkedInUrl; contact.InstagramUrl = dto.InstagramUrl;
        contact.FacebookUrl = dto.FacebookUrl; contact.WhatsAppUrl = dto.WhatsAppUrl;

        _db.WorkingHours.RemoveRange(contact.WorkingHours);
        contact.WorkingHours = dto.WorkingHours
            .Select(h => new WorkingHour { DayLabelAr = h.DayLabelAr, DayLabelEn = h.DayLabelEn, HoursText = h.HoursText, SortOrder = h.SortOrder })
            .ToList();
        contact.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(ToDto(contact));
    }
}
