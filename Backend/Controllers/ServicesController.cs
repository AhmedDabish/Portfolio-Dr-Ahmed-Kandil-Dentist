using Microsoft.AspNetCore.Mvc;
using PortfolioAdmin.API.Controllers.Base;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Controllers;

[Route("api/admin/services")]
public class ServicesController : CrudControllerBase<ServiceItem, ServiceDto>
{
    public ServicesController(AppDbContext db) : base(db,
        toDto: s => new ServiceDto
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
        },
        applyDto: (s, dto) =>
        {
            s.IconClass = dto.IconClass; s.CardNumber = dto.CardNumber;
            s.TitleAr = dto.TitleAr; s.TitleEn = dto.TitleEn;
            s.DescriptionAr = dto.DescriptionAr; s.DescriptionEn = dto.DescriptionEn;
            s.SortOrder = dto.SortOrder; s.IsActive = dto.IsActive;
        },
        getId: s => s.Id,
        setId: (s, id) => s.Id = id,
        getSortOrder: s => s.SortOrder)
    { }
}