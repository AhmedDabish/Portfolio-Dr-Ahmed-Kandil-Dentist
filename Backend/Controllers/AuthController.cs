using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Common;
using PortfolioAdmin.API.Data;
using PortfolioAdmin.API.DTOs;
using PortfolioAdmin.API.Services;
using static BCrypt.Net.BCrypt;

namespace PortfolioAdmin.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;

    public AuthController(AppDbContext db, IJwtService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login(LoginRequestDto dto)
    {
        var user = await _db.AdminUsers.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user is null || !Verify(dto.Password, user.PasswordHash))
            return Unauthorized(ApiResponse<LoginResponseDto>.Fail("اسم المستخدم أو كلمة المرور غير صحيحة."));

        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var (token, expiresAt) = _jwt.GenerateToken(user);

        return Ok(ApiResponse<LoginResponseDto>.Ok(new LoginResponseDto
        {
            Token = token,
            Username = user.Username,
            Role = user.Role,
            ExpiresAt = expiresAt
        }, "تم تسجيل الدخول بنجاح."));
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
    {
        var username = User.Identity?.Name;
        var user = await _db.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
        if (user is null) return Unauthorized();

        if (!Verify(dto.CurrentPassword, user.PasswordHash))
            return BadRequest(ApiResponse<object>.Fail("كلمة المرور الحالية غير صحيحة."));

        user.PasswordHash = HashPassword(dto.NewPassword);
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<object>.Ok(null, "تم تغيير كلمة المرور بنجاح."));
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me() => Ok(ApiResponse<object>.Ok(new
    {
        username = User.Identity?.Name,
        role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value
    }));
}