using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class removeTransactionIdfromBid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Transactions_TransactionId",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_TransactionId",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Bids");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransactionId",
                table: "Bids",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bids_TransactionId",
                table: "Bids",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Transactions_TransactionId",
                table: "Bids",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "transaction_id");
        }
    }
}
