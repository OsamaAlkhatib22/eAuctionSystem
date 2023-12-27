using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DataModels.Skills;

namespace Domain.DataModels.Users
{
    [Table("UserSkills")]
    public class UserSkill
    {
        [Column("skill_id")]
        
        [ForeignKey("Skills")]
        public int skillId { get; set; }

        [Column("UserId")]
        
        [ForeignKey("User")]
        public int UserId { get; set; }


        public ApplicationUser User { get; set; }

        public Skills.Skills Skills { get; set; }
    }
}
