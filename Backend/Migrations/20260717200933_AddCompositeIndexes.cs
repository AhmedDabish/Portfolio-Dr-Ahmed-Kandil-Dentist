using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortfolioAdmin.Migrations
{
    /// <inheritdoc />
    public partial class AddCompositeIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Testimonials_Active_Sort",
                table: "Testimonials",
                columns: new[] { "IsActive", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Services_Active_Sort",
                table: "Services",
                columns: new[] { "IsActive", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioCases_Active_Sort",
                table: "PortfolioCases",
                columns: new[] { "IsActive", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_Active_Sort",
                table: "Experiences",
                columns: new[] { "IsActive", "SortOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Testimonials_Active_Sort",
                table: "Testimonials");

            migrationBuilder.DropIndex(
                name: "IX_Services_Active_Sort",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_PortfolioCases_Active_Sort",
                table: "PortfolioCases");

            migrationBuilder.DropIndex(
                name: "IX_Experiences_Active_Sort",
                table: "Experiences");
        }
    }
}
