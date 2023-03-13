using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Domain
{
    [Table("Complaints")]
    public class Complaint
    {
        [Key]
        [Column("ID")]
        public int intId { get; set; }

        [Column("USER_ID")]
        [Required]
        public int intUserID { get; set; }

        [Required]
        [Column("TYPE")]
        public int intType { get; set; }

        [Required]
        [Column("STATUS")]
        public int intStatus { get; set; }

        // Change according to image table PK
        [Required]
        [Column("IMAGE_REF")]
        public string strImageRef { get; set; }

        [Required]
        [Column("LAT")]
        public decimal decLat { get; set; }

        [Required]
        [Column("LNG")]
        public decimal decLng { get; set; }

        [Column("ADDRESS")]
        [AllowNull]
        public string strAddress { get; set; }

        [Column("COMMENT")]
        [AllowNull]
        public string strComment { get; set; }

        [Required]
        [Column("REMINDER")]
        public int intReminder { get; set; }

        [Required]
        [Column("PRIORITY")]
        public decimal decPriority { get; set; }

        [Required]
        [Column("DATE_SUBMITTED")]
        public DateTime dtmDateSubmitted { get; set; }

        [AllowNull]
        [Column("DATE_LAST_REMINDED")]
        public DateTime dtmDateLastReminded { get; set; }

        [Column("LAST_MODIFIED_BY")]
        [Required]
        public int intLastModifiedBy { get; set; }

        [AllowNull]
        [Column("DATE_LAST_MODIFIED")]
        public DateTime dtmDateLastModified { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

    }
}
