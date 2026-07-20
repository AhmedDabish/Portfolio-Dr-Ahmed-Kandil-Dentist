//using Microsoft.EntityFrameworkCore;
//using PortfolioAdmin.API.Models;

//namespace PortfolioAdmin.API.Data;

//public class AppDbContext : DbContext
//{
//    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
//    public DbSet<HeroContent> HeroContents => Set<HeroContent>();
//    public DbSet<ServiceItem> Services => Set<ServiceItem>();
//    public DbSet<PortfolioCase> PortfolioCases => Set<PortfolioCase>();
//    public DbSet<PortfolioImage> PortfolioImages => Set<PortfolioImage>();
//    public DbSet<Experience> Experiences => Set<Experience>();
//    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
//    public DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
//    public DbSet<WorkingHour> WorkingHours => Set<WorkingHour>();
//    public DbSet<SiteSettings> SiteSettings => Set<SiteSettings>();

//    protected override void OnModelCreating(ModelBuilder modelBuilder)
//    {
//        base.OnModelCreating(modelBuilder);

//        modelBuilder.Entity<AdminUser>().HasIndex(u => u.Username).IsUnique();

//        modelBuilder.Entity<PortfolioCase>()
//            .HasMany(c => c.Images)
//            .WithOne(i => i.PortfolioCase)
//            .HasForeignKey(i => i.PortfolioCaseId)
//            .OnDelete(DeleteBehavior.Cascade);

//        modelBuilder.Entity<ContactInfo>()
//            .HasMany(c => c.WorkingHours)
//            .WithOne(h => h.ContactInfo)
//            .HasForeignKey(h => h.ContactInfoId)
//            .OnDelete(DeleteBehavior.Cascade);

//        // جداول Single-row: منمنع الـ auto increment على الـ Id
//        modelBuilder.Entity<HeroContent>().Property(h => h.Id).ValueGeneratedNever();
//        modelBuilder.Entity<SiteSettings>().Property(s => s.Id).ValueGeneratedNever();
//        modelBuilder.Entity<ContactInfo>().Property(c => c.Id).ValueGeneratedNever();

//        // Indexes مفيدة للأداء
//        modelBuilder.Entity<ServiceItem>().HasIndex(s => s.SortOrder);
//        modelBuilder.Entity<PortfolioCase>().HasIndex(c => c.SortOrder);
//        modelBuilder.Entity<Experience>().HasIndex(e => e.SortOrder);
//        modelBuilder.Entity<Testimonial>().HasIndex(t => t.SortOrder);
//    }
//}
using Microsoft.EntityFrameworkCore;
using PortfolioAdmin.API.Models;

namespace PortfolioAdmin.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<HeroContent> HeroContents => Set<HeroContent>();
    public DbSet<ServiceItem> Services => Set<ServiceItem>();
    public DbSet<PortfolioCase> PortfolioCases => Set<PortfolioCase>();
    public DbSet<PortfolioImage> PortfolioImages => Set<PortfolioImage>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
    public DbSet<WorkingHour> WorkingHours => Set<WorkingHour>();
    public DbSet<SiteSettings> SiteSettings => Set<SiteSettings>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // فهرس فريد لاسم المستخدم
        modelBuilder.Entity<AdminUser>()
            .HasIndex(u => u.Username)
            .IsUnique();

        // علاقة PortfolioCase مع الصور (حذف متتالي)
        modelBuilder.Entity<PortfolioCase>()
            .HasMany(c => c.Images)
            .WithOne(i => i.PortfolioCase)
            .HasForeignKey(i => i.PortfolioCaseId)
            .OnDelete(DeleteBehavior.Cascade);

        // علاقة ContactInfo مع ساعات العمل (حذف متتالي)
        modelBuilder.Entity<ContactInfo>()
            .HasMany(c => c.WorkingHours)
            .WithOne(h => h.ContactInfo)
            .HasForeignKey(h => h.ContactInfoId)
            .OnDelete(DeleteBehavior.Cascade);

        // منع التوليد التلقائي للمعرف في الجداول ذات الصف الواحد
        modelBuilder.Entity<HeroContent>()
            .Property(h => h.Id)
            .ValueGeneratedNever();

        modelBuilder.Entity<SiteSettings>()
            .Property(s => s.Id)
            .ValueGeneratedNever();

        modelBuilder.Entity<ContactInfo>()
            .Property(c => c.Id)
            .ValueGeneratedNever();

        // فهارس لتحسين سرعة الترتيب والتصفية
        modelBuilder.Entity<ServiceItem>()
            .HasIndex(s => s.SortOrder);

        modelBuilder.Entity<PortfolioCase>()
            .HasIndex(c => c.SortOrder);

        modelBuilder.Entity<Experience>()
            .HasIndex(e => e.SortOrder);

        modelBuilder.Entity<Testimonial>()
            .HasIndex(t => t.SortOrder);

        modelBuilder.Entity<ServiceItem>()
            .HasIndex(s => new { s.IsActive, s.SortOrder })
            .HasDatabaseName("IX_Services_Active_Sort");

        modelBuilder.Entity<PortfolioCase>()
            .HasIndex(c => new { c.IsActive, c.SortOrder })
            .HasDatabaseName("IX_PortfolioCases_Active_Sort");

        modelBuilder.Entity<Experience>()
            .HasIndex(e => new { e.IsActive, e.SortOrder })
            .HasDatabaseName("IX_Experiences_Active_Sort");

        modelBuilder.Entity<Testimonial>()
            .HasIndex(t => new { t.IsActive, t.SortOrder })
            .HasDatabaseName("IX_Testimonials_Active_Sort");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        base.OnConfiguring(optionsBuilder);
    }
}