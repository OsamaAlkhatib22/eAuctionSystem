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

        [Column("service_id")]
        [ForeignKey("Service")]
        public int ServiceId { get; set; }

        [Column("buyer_id")]
        [ForeignKey("Buyer")]//userId
        public int BuyerId { get; set; }

        [Column("Bidder_id")]
        [ForeignKey("Bidder")]
        public int BidderId { get; set; }

        [Column("transaction_date")]
        public DateTime TransactionDate { get; set; }

        public decimal Amount { get; set; }

        public  Service Service { get; set; }

        public ApplicationUser Buyer { get; set; }

        
    }
}
