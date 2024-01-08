using Domain.DataModels.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Notifications
{
    [Table("Notifications")]
    public class Notifications
    {
        [ForeignKey("User")]
        [Column("UserId")]
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        [Column("Notification")]
        [Required]
        public string Notification { get; set; }

        [Column("NotificationDate")]
        public DateTime NotificationDate { get; set; }
       


    }
}
