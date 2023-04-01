using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Tasks
{
    [Table("tasks_status")]
    public class WorkTaskStatus
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Column("NAME")]
        [Required]
        public string strName { get; set; }
    }
}
