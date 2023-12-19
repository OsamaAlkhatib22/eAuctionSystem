using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedUserSkills12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Field_of_work",
                table: "users",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Job_title",
                table: "users",
                type: "longtext",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserSkill",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Skills = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkill", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_UserSkill_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSkill");

            migrationBuilder.DropColumn(
                name: "Field_of_work",
                table: "users");

            migrationBuilder.DropColumn(
                name: "Job_title",
                table: "users");
        }
    }
}
