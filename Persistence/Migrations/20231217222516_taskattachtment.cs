using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class taskattachtment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskAttachment",
                columns: table => new
                {
                    service_id = table.Column<int>(type: "int", nullable: false),
                    media_ref = table.Column<string>(type: "longtext", nullable: true),
                    date_created = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAttachment", x => x.service_id);
                    table.ForeignKey(
                        name: "FK_TaskAttachment_Services_service_id",
                        column: x => x.service_id,
                        principalTable: "Services",
                        principalColumn: "service_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskAttachment");
        }
    }
}
