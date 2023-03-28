using Domain.DataModels.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Domain.DataModels.Complaints
{
    [Table("complaint_types")]
    public class ComplaintType
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Column("DEPARTMENT")]
        [Required]
        public int intDepartment { get; set; }

        [Column("NAME_AR")]
        [Required]
        public string strNameAr { get; set; }

        [Column("NAME_EN")]
        [Required]
        public string strNameEn { get; set; }

        [Column("GRADE")]
        [Required]
        public decimal decGrade { get; set; }

        [Column("PRIVACY")]
        [Required]
        [ForeignKey("Privacy")]
        public int intPrivacy { get; set; }
        public ComplaintPrivacy Privacy { get; set; }

        [Column("CREATED_BY")]
        [Required]
        [ForeignKey("CreatedBy")]
        public int intCreatedBy { get; set; }
        ApplicationUser CreatedBy { get; set; }

        [Column("DATE_CREATED")]
        [Required]
        public DateTime dtmDateCreated { get; set; }

        [Column("LAST_MODIFIED_BY")]
        [Required]
        [ForeignKey("ModifiedBy")]
        public int intLastModifiedBy { get; set; }
        ApplicationUser ModifiedBy { get; set; }

        [Column("DATE_LAST_MODIFIED")]
        [AllowNull]
        public DateTime dtmDateLastModified { get; set; }

        [Column("IS_DELETED")]
        public Boolean blnIsDeleted { get; set; }

        // Relations
        public ICollection<Complaint> Complaints { get; set; }
    }
}
