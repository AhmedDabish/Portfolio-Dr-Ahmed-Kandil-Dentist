namespace PortfolioAdmin.API.Services;

public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile file, string subFolder);
    void DeleteImage(string imageUrl);
}

public class ImageService : IImageService
{
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5MB

    private readonly IWebHostEnvironment _env;

    public ImageService(IWebHostEnvironment env) => _env = env;

    public async Task<string> SaveImageAsync(IFormFile file, string subFolder)
    {
        if (file == null || file.Length == 0)
            return string.Empty;

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
            throw new InvalidOperationException("نوع الملف غير مسموح. يُسمح فقط بـ jpg, jpeg, png, webp.");

        if (file.Length > MaxFileSizeBytes)
            throw new InvalidOperationException("حجم الصورة أكبر من 5 ميجابايت.");

        var uploadsFolder = Path.Combine(_env.WebRootPath, "images", subFolder);
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid():N}{ext}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/images/{subFolder}/{fileName}";
    }

    public void DeleteImage(string imageUrl)
    {
        if (string.IsNullOrEmpty(imageUrl)) return;
        var filePath = Path.Combine(_env.WebRootPath, imageUrl.TrimStart('/'));
        if (File.Exists(filePath)) File.Delete(filePath);
    }
}