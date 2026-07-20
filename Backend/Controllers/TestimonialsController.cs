using Microsoft.AspNetCore.Mvc;
using PortfolioAdmin.API.Controllers.Base;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Controllers;

[Route("api/admin/testimonials")]
public class TestimonialsController : CrudControllerBase<Testimonial, TestimonialDto>
{
    public TestimonialsController(AppDbContext db) : base(db,
        toDto: t => new TestimonialDto
        {
            Id = t.Id,
            TextAr = t.TextAr,
            TextEn = t.TextEn,
            AuthorAr = t.AuthorAr,
            AuthorEn = t.AuthorEn,
            SortOrder = t.SortOrder,
            IsActive = t.IsActive
        },
        applyDto: (t, dto) =>
        {
            t.TextAr = dto.TextAr; t.TextEn = dto.TextEn;
            t.AuthorAr = dto.AuthorAr; t.AuthorEn = dto.AuthorEn;
            t.SortOrder = dto.SortOrder; t.IsActive = dto.IsActive;
        },
        getId: t => t.Id,
        setId: (t, id) => t.Id = id,
        getSortOrder: t => t.SortOrder)
    { }
}