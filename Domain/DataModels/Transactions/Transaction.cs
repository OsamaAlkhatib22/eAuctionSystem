using Domain.ClientDTOs.User;
using Domain.DataModels.Services;
using Domain.DataModels.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Transactions
{
    [Table("Transactions")]
    public class Transaction
    {
        [Column("transaction_id")]
        [Key]
        public int TransactionId { get; set; }

        [Column("UserId")]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Column("TransactionType")]
        public string TransactionType { get; set; }

        [Column("transaction_date")]
        public DateTime TransactionDate { get; set; }

        [Column("Amount")]
        public decimal Amount { get; set; }


        public ApplicationUser User { get; set; }

        
    }
}
