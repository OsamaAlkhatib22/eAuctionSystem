using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DATE_SUBMITTED",
                table: "Complaints",
                newName: "dtmSubmissionDate");

            migrationBuilder.AlterColumn<byte[]>(
                name: "IMAGE",
                table: "Complaints",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "dtmSubmissionDate",
                table: "Complaints",
                newName: "DATE_SUBMITTED");

            migrationBuilder.AlterColumn<byte[]>(
                name: "IMAGE",
                table: "Complaints",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);
        }
    }
}
