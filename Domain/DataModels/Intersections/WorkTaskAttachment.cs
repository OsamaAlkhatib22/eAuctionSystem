using Domain.DataModels.Tasks;
using Domain.DataModels.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Intersections
{
    [Table("tasks_attachments")]
    public class WorkTaskAttachment
    {
        [Column("TASK_ID")]
        [ForeignKey("Task")]
        public int intTaskId { get; set; }
        public WorkTask Task { get; set; }

        [Column("MEDIA_REF")]
        [Required]
        public string strMediaRef { get; set; }

        [Column("CREATED_BY")]
        [Required]
        [ForeignKey("CreatedBy")]
        public int intCreatedBy { get; set; }
        ApplicationUser CreatedBy { get; set; }

        [Column("DATE_CREATED")]
        [Required]
        public DateTime dtmDateCreated { get; set; }

        [Column("IS_VIDEO")]
        [Required]
        public Boolean blnIsVideo { get; set; }
    }
}
