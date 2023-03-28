using Domain.DataModels.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Domain.DataModels.Complaints
{
    [Table("complaints")]
    public class Complaint
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Required]
        [Column("USER_ID")]
        public int intUserID { get; set; }

        [Column("TYPE")]
        [Required]
        [ForeignKey("ComplaintType")]
        public int intType { get; set; }
        public ComplaintType ComplaintType { get; set; }

        [Column("STATUS")]
        [Required]
        [ForeignKey("Status")]
        public int intStatus { get; set; }
        public ComplaintStatus Status { get; set; }

        [Column("IMAGE_REF")]
        [Required]
        public string strImageRef { get; set; }

        [Column("LAT")]
        [Required]
        public decimal decLat { get; set; }

        [Column("LNG")]
        [Required]
        public decimal decLng { get; set; }

        [Column("COMMENT")]
        [AllowNull]
        public string strComment { get; set; }

        [Column("REMINDER")]
        [Required]
        public int intReminder { get; set; }

        [Column("DATE_CREATED")]
        [Required]
        public DateTime dtmDateCreated { get; set; }

        [Column("DATE_LAST_REMINDED")]
        [AllowNull]
        public DateTime dtmDateLastReminded { get; set; }

        [Column("LAST_MODIFIED_BY")]
        [Required]
        [ForeignKey("ModifiedBy")]
        public int intLastModifiedBy { get; set; }
        ApplicationUser ModifiedBy { get; set; }

        [Column("DATE_LAST_MODIFIED")]
        [AllowNull]
        public DateTime dtmDateLastModified { get; set; }

        // Relations
        public ICollection<ComplaintVoters> Voters { get; set; }
    }
}
