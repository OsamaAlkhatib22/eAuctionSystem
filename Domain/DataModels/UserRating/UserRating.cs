using Domain.DataModels.Categories;
using Domain.DataModels.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.UserRating
{
    [Table("UserRating")]
    public class UserRating
    {
        [Column("UserId")]
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Column("Rating")]
        public decimal Rating { get; set; }

        //Intersection
        public ApplicationUser User { get; set; }
  

    }
}
