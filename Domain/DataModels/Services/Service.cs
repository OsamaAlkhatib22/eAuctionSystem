using Domain.DataModels.Categories;
using Domain.DataModels.Transactions;
using Domain.DataModels.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Services
{
    [Table("Services")]
    public class Service
    {
        [Column("service_id")]
        [Key]
        public int ServiceId { get; set; }

        [Column("UserId")]
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        [Required]
        public string Title { get; set; }


        [Column("Description")]
        public string Description { get; set; }

        [Column("starting_bid")]
        public string starting_bid { get; set; }


        [Column("bid_duration")]
        public TimeSpan BidDuration { get; set; }


        [Column("category_id")]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        

        [Column("creation_date")]
        public DateTime CreationDate { get; set; }


        //Intersection
        public ApplicationUser User { get; set; }
        public Transaction Transaction { get; set; }
        public Category Category { get; set; }

        public ICollection<TaskAttachment> TaskAttachments { get; set; }

    }
}
