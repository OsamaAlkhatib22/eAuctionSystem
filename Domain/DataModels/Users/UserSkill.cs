using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Users
{
    [Table("UserSkills")]
    public class UserSkill
    {
        [Column("Skills")]
        public string Skills { get; set; }

        [Column("UserId")]
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }


        public ApplicationUser User { get; set; }
    }
}
