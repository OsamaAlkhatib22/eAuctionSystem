using Domain.DataModels.Users;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Domain.DataModels.Transactions;

namespace Domain.DataModels.Services
{
    [Table("Bids")]
    public class Bids
    {
        [Column("Bid_id")]
        [Key]
        public int BidId { get; set; }

        [Column("service_id")]
        [ForeignKey("Service")]
        public int ServiceId { get; set; }
        [Column("UserId")]
        [ForeignKey("User")]
        public int UserId { get; set; }


        [Column("Bidder_id")]
     //   [ForeignKey("User")]
        public int BidderId { get; set; }

        [Column("Bid_Amount")]
        public decimal BidAmount { get; set; }


        


        //Intersection
        public ApplicationUser User { get; set; }
        
        public Service Service { get; set; }
    }
}
