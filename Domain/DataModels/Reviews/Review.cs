using Domain.DataModels.Services;
using Domain.DataModels.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Reviews
{
    [Table("Reviews")]
    public class Review
    {
        [Column("review_id")]
        [Key]
        public int ReviewId { get; set; }

        [Column("service_id")]
        [ForeignKey("Service")]
        public int ServiceId { get; set; }

        [Column("UserId")]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public int Rating { get; set; }

        public string Comment { get; set; }

        [Column("review_date")]
        public DateTime ReviewDate { get; set; }

        public  Service Service { get; set; }

        public  ApplicationUser User { get; set; }
    }
}
