using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial_Creation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Complaints",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    USER_ID = table.Column<int>(type: "int", nullable: false),
                    TYPE = table.Column<int>(type: "int", nullable: false),
                    STATUS = table.Column<int>(type: "int", nullable: false),
                    IMAGE_REF = table.Column<string>(type: "longtext", nullable: false),
                    LAT = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    LNG = table.Column<decimal>(type: "decimal(8,6)", precision: 8, scale: 6, nullable: false),
                    ADDRESS = table.Column<string>(type: "longtext", nullable: true),
                    COMMENT = table.Column<string>(type: "longtext", nullable: true),
                    REMINDER = table.Column<int>(type: "int", nullable: false),
                    PRIORITY = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DATE_SUBMITTED = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DATE_LAST_REMINDED = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LAST_MODIFIED_BY = table.Column<int>(type: "int", nullable: false),
                    DATE_LAST_MODIFIED = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Complaints");
        }
    }
}
