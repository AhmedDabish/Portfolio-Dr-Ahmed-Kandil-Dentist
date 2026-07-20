using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortfolioAdmin.Migrations
{
    /// <inheritdoc />
    public partial class AddAvailabilityBadgeAndMedicalTips : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkedInUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstagramUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FacebookUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WhatsAppUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Experiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateRange = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IconClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrgAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrgEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experiences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HeroContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    NameAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credential1Ar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credential1En = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credential2Ar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credential2En = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeExpAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeExpEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShowAvailabilityBadge = table.Column<bool>(type: "bit", nullable: false),
                    AvailabilityBadgeAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvailabilityBadgeEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypedPhrasesArJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypedPhrasesEnJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedicalTipsJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat1Value = table.Column<int>(type: "int", nullable: false),
                    Stat1LabelAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat1LabelEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat2Value = table.Column<int>(type: "int", nullable: false),
                    Stat2LabelAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat2LabelEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat3Value = table.Column<int>(type: "int", nullable: false),
                    Stat3LabelAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat3LabelEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat4Value = table.Column<int>(type: "int", nullable: false),
                    Stat4LabelAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat4LabelEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioCases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubtitleAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubtitleEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IconClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThumbnailUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioCases", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IconClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DefaultLanguage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DefaultTheme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsMaintenanceMode = table.Column<bool>(type: "bit", nullable: false),
                    FooterTextAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FooterTextEn = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Testimonials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TextAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuthorAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuthorEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Testimonials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkingHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactInfoId = table.Column<int>(type: "int", nullable: false),
                    DayLabelAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DayLabelEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoursText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingHours_ContactInfos_ContactInfoId",
                        column: x => x.ContactInfoId,
                        principalTable: "ContactInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PortfolioCaseId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PortfolioImages_PortfolioCases_PortfolioCaseId",
                        column: x => x.PortfolioCaseId,
                        principalTable: "PortfolioCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminUsers_Username",
                table: "AdminUsers",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_SortOrder",
                table: "Experiences",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioCases_SortOrder",
                table: "PortfolioCases",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioImages_PortfolioCaseId",
                table: "PortfolioImages",
                column: "PortfolioCaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_SortOrder",
                table: "Services",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Testimonials_SortOrder",
                table: "Testimonials",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingHours_ContactInfoId",
                table: "WorkingHours",
                column: "ContactInfoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "Experiences");

            migrationBuilder.DropTable(
                name: "HeroContents");

            migrationBuilder.DropTable(
                name: "PortfolioImages");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "SiteSettings");

            migrationBuilder.DropTable(
                name: "Testimonials");

            migrationBuilder.DropTable(
                name: "WorkingHours");

            migrationBuilder.DropTable(
                name: "PortfolioCases");

            migrationBuilder.DropTable(
                name: "ContactInfos");
        }
    }
}
