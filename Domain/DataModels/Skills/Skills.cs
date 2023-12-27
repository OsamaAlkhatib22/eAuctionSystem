using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Skills
{
    [Table("Skills")]
    public class Skills
    {
        [Column("Skills")]
        [Required]
        public string Skill { get; set; }

        [Column("skill_id")]
        [Key]
        public int skillId { get; set; }
    }
}
