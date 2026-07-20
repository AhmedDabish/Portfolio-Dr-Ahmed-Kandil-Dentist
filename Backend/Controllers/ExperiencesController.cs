using Microsoft.AspNetCore.Mvc;
using PortfolioAdmin.API.Controllers.Base;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Controllers;

[Route("api/admin/experiences")]
public class ExperiencesController : CrudControllerBase<Experience, ExperienceDto>
{
    public ExperiencesController(AppDbContext db) : base(db,
        toDto: e => new ExperienceDto
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
        },
        applyDto: (e, dto) =>
        {
            e.DateRange = dto.DateRange; e.IconClass = dto.IconClass;
            e.TitleAr = dto.TitleAr; e.TitleEn = dto.TitleEn;
            e.OrgAr = dto.OrgAr; e.OrgEn = dto.OrgEn;
            e.DescriptionAr = dto.DescriptionAr; e.DescriptionEn = dto.DescriptionEn;
            e.BadgeAr = dto.BadgeAr; e.BadgeEn = dto.BadgeEn;
            e.SortOrder = dto.SortOrder; e.IsActive = dto.IsActive;
        },
        getId: e => e.Id,
        setId: (e, id) => e.Id = id,
        getSortOrder: e => e.SortOrder)
    { }
}