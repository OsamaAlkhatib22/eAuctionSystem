using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Domain
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
        public int intType { get; set; }

        [Column("STATUS")]
        [Required]
        public int intStatus { get; set; }

        // Change according to image table PK
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

        [Column("DATE_SUBMITTED")]
        [Required]
        public DateTime dtmDateSubmitted { get; set; }

        [Column("DATE_LAST_REMINDED")]
        [AllowNull]
        public DateTime dtmDateLastReminded { get; set; }

        [Column("LAST_MODIFIED_BY")]
        [Required]
        public int intLastModifiedBy { get; set; }

        [Column("DATE_LAST_MODIFIED")]
        [AllowNull]
        public DateTime dtmDateLastModified { get; set; }
    }
}
