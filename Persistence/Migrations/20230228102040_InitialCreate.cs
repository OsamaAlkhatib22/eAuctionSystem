using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Complaints",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TYPE = table.Column<int>(type: "int", nullable: false),
                    CLASSIFICATION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ADDRESS = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LAT = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    LNG = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    IMAGE = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    USER_ID = table.Column<int>(type: "int", nullable: false),
                    DATE_SUBMITTED = table.Column<DateTime>(type: "datetime2", nullable: false)
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
