using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AnotherOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "profile_media_ref",
                table: "users",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "FromFreeLancer",
                table: "TaskAttachment",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profile_media_ref",
                table: "users");

            migrationBuilder.DropColumn(
                name: "FromFreeLancer",
                table: "TaskAttachment");
        }
    }
}
