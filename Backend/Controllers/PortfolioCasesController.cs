using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Models;
using PortfolioAdmin.API.Services;

namespace PortfolioAdmin.API.Controllers;

[ApiController]
[Route("api/admin/cases")]
[Authorize]
public class PortfolioCasesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IImageService _imageService;

    public PortfolioCasesController(AppDbContext db, IImageService imageService)
    {
        _db = db;
        _imageService = imageService;
    }

    private static PortfolioCaseDto ToDto(PortfolioCase c) => new()
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
    };

    [HttpGet]
    public async Task<ActionResult<List<PortfolioCaseDto>>> GetAll()
    {
        var items = await _db.PortfolioCases.Include(c => c.Images).OrderBy(c => c.SortOrder).ToListAsync();
        return Ok(items.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PortfolioCaseDto>> GetById(int id)
    {
        var item = await _db.PortfolioCases.Include(c => c.Images).FirstOrDefaultAsync(c => c.Id == id);
        return item is null ? NotFound() : Ok(ToDto(item));
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<PortfolioCaseDto>> Create([FromForm] PortfolioCaseCreateUpdateDto dto)
    {
        var entity = new PortfolioCase
        {
            TitleAr = dto.TitleAr,
            TitleEn = dto.TitleEn,
            SubtitleAr = dto.SubtitleAr,
            SubtitleEn = dto.SubtitleEn,
            IconClass = dto.IconClass,
            SortOrder = dto.SortOrder,
            IsActive = dto.IsActive,
            Images = new List<PortfolioImage>()
        };

        // معالجة الصور الجديدة
        foreach (var file in dto.NewImages)
        {
            if (file.Length > 0)
            {
                var path = await _imageService.SaveImageAsync(file, "portfolio");
                entity.Images.Add(new PortfolioImage { ImageUrl = path, SortOrder = entity.Images.Count + 1 });
            }
        }

        // تعيين ThumbnailUrl (أول صورة أو الصورة المحددة)
        if (!string.IsNullOrEmpty(dto.ThumbnailUrl))
        {
            entity.ThumbnailUrl = dto.ThumbnailUrl;
        }
        else if (entity.Images.Any())
        {
            entity.ThumbnailUrl = entity.Images.First().ImageUrl;
        }

        _db.PortfolioCases.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, ToDto(entity));
    }

    [HttpPut("{id:int}")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<PortfolioCaseDto>> Update(int id, [FromForm] PortfolioCaseCreateUpdateDto dto)
    {
        var entity = await _db.PortfolioCases.Include(c => c.Images).FirstOrDefaultAsync(c => c.Id == id);
        if (entity is null) return NotFound();

        // تحديث البيانات الأساسية
        entity.TitleAr = dto.TitleAr; entity.TitleEn = dto.TitleEn;
        entity.SubtitleAr = dto.SubtitleAr; entity.SubtitleEn = dto.SubtitleEn;
        entity.IconClass = dto.IconClass;
        entity.SortOrder = dto.SortOrder;
        entity.IsActive = dto.IsActive;

        // حذف الصور المحددة
        if (dto.ImagesToDelete.Any())
        {
            var imagesToDelete = entity.Images.Where(i => dto.ImagesToDelete.Contains(i.Id)).ToList();
            foreach (var img in imagesToDelete)
            {
                _imageService.DeleteImage(img.ImageUrl);
                entity.Images.Remove(img);
            }
        }

        // إضافة الصور الجديدة
        foreach (var file in dto.NewImages)
        {
            if (file.Length > 0)
            {
                var path = await _imageService.SaveImageAsync(file, "portfolio");
                entity.Images.Add(new PortfolioImage { ImageUrl = path, SortOrder = entity.Images.Count + 1 });
            }
        }

        // تحديث ThumbnailUrl
        if (!string.IsNullOrEmpty(dto.ThumbnailUrl))
        {
            entity.ThumbnailUrl = dto.ThumbnailUrl;
        }
        else if (entity.Images.Any())
        {
            entity.ThumbnailUrl = entity.Images.OrderBy(i => i.SortOrder).First().ImageUrl;
        }

        await _db.SaveChangesAsync();
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.PortfolioCases.Include(c => c.Images).FirstOrDefaultAsync(c => c.Id == id);
        if (entity is null) return NotFound();

        // حذف جميع الصور من الملفات
        foreach (var img in entity.Images)
        {
            _imageService.DeleteImage(img.ImageUrl);
        }

        _db.PortfolioCases.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}