using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class InitialCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Complaints",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USER_ID = table.Column<int>(type: "int", nullable: false),
                    TYPE = table.Column<int>(type: "int", nullable: false),
                    STATUS = table.Column<int>(type: "int", nullable: false),
                    IMAGE_REF = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LAT = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    LNG = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    ADDRESS = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    COMMENT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    REMINDER = table.Column<int>(type: "int", nullable: false),
                    PRIORITY = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DATE_SUBMITTED = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DATE_LAST_REMINDED = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LAST_MODIFIED_BY = table.Column<int>(type: "int", nullable: false),
                    DATE_LAST_MODIFIED = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Complaints");
        }
    }
}
