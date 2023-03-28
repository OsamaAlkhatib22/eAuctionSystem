using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Complaints
{
    [Table("complaint_privacy")]
    public class ComplaintPrivacy
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Column("NAME")]
        [Required]
        public string strName { get; set; }

        // Relations
        public ICollection<ComplaintType> ComplaintTypes { get; set; }
    }
}
