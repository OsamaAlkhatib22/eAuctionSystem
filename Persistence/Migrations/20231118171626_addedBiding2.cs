using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedBiding2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_users_SellerId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SellerId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "Transactions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SellerId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SellerId",
                table: "Transactions",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_users_SellerId",
                table: "Transactions",
                column: "SellerId",
                principalTable: "users",
                principalColumn: "UserId");
        }
    }
}
