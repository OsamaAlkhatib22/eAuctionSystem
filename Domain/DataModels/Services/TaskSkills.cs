using Domain.DataModels.Skills;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Services
{
    [Table("TaskSkills")]
    public class TaskSkills
    {

        [Column("service_id")]
        [Key]
        [ForeignKey("Service")]
        public int ServiceId { get; set; }


        [Column("skill_id")]
        [ForeignKey("Skills")]
        public int skillId { get; set; }

        public Skills.Skills Skills { get; set; }

        

    }
}
