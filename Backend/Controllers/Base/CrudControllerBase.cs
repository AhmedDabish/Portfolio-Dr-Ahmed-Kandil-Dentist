using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Common;
using PortfolioAdmin.API.Data;

namespace PortfolioAdmin.API.Controllers.Base;

/// <summary>
/// Base generic controller لأي كيان بسيط بيتعامل بنفس نمط CRUD:
/// GetAll / GetById / Create / Update / Delete + ترتيب بـ SortOrder.
/// TEntity: الكيان في الداتابيز. TDto: الشكل اللي بيتراسل بيه الفرونت.
/// </summary>
[ApiController]
[Authorize]
public abstract class CrudControllerBase<TEntity, TDto> : ControllerBase
    where TEntity : class, new()
{
    protected readonly AppDbContext Db;
    private readonly Func<TEntity, TDto> _toDto;
    private readonly Action<TEntity, TDto> _applyDto;
    private readonly Func<TEntity, int> _getId;
    private readonly Action<TEntity, int> _setId;
    private readonly Func<TEntity, int> _getSortOrder;

    protected CrudControllerBase(
        AppDbContext db,
        Func<TEntity, TDto> toDto,
        Action<TEntity, TDto> applyDto,
        Func<TEntity, int> getId,
        Action<TEntity, int> setId,
        Func<TEntity, int> getSortOrder)
    {
        Db = db;
        _toDto = toDto;
        _applyDto = applyDto;
        _getId = getId;
        _setId = setId;
        _getSortOrder = getSortOrder;
    }

    protected virtual DbSet<TEntity> Set => Db.Set<TEntity>();

    [HttpGet]
    public virtual async Task<ActionResult<ApiResponse<List<TDto>>>> GetAll()
    {
        var items = await Set.AsNoTracking().ToListAsync();
        var ordered = items.OrderBy(_getSortOrder).Select(_toDto).ToList();
        return Ok(ApiResponse<List<TDto>>.Ok(ordered));
    }

    [HttpGet("{id:int}")]
    public virtual async Task<ActionResult<ApiResponse<TDto>>> GetById(int id)
    {
        var entity = await Set.FindAsync(id);
        if (entity is null) return NotFound(ApiResponse<TDto>.Fail("العنصر غير موجود."));
        return Ok(ApiResponse<TDto>.Ok(_toDto(entity)));
    }

    [HttpPost]
    public virtual async Task<ActionResult<ApiResponse<TDto>>> Create(TDto dto)
    {
        var entity = new TEntity();
        _applyDto(entity, dto);
        Set.Add(entity);
        await Db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = _getId(entity) },
            ApiResponse<TDto>.Ok(_toDto(entity), "تم الإنشاء بنجاح."));
    }

    [HttpPut("{id:int}")]
    public virtual async Task<ActionResult<ApiResponse<TDto>>> Update(int id, TDto dto)
    {
        var entity = await Set.FindAsync(id);
        if (entity is null) return NotFound(ApiResponse<TDto>.Fail("العنصر غير موجود."));

        _applyDto(entity, dto);
        _setId(entity, id); // نضمن إن الـ Id متغيرش من الـ DTO
        await Db.SaveChangesAsync();
        return Ok(ApiResponse<TDto>.Ok(_toDto(entity), "تم التحديث بنجاح."));
    }

    [HttpDelete("{id:int}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        var entity = await Set.FindAsync(id);
        if (entity is null) return NotFound(ApiResponse<object>.Fail("العنصر غير موجود."));
        Set.Remove(entity);
        await Db.SaveChangesAsync();
        return Ok(ApiResponse<object>.Ok(null, "تم الحذف بنجاح."));
    }
}