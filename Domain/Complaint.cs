using Microsoft.AspNetCore.Http;
using System.ComponentModel;
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
        [Required]
        [Column("TYPE")]
        public int intType { get; set; }
        [Column("CLASSIFICATION")]
        public string strCategory { get; set; }
        [Column("ADDRESS")]
        [AllowNull]
        public string strAddress { get; set; }
        [Required]
        [Column("LAT")]
        public decimal decLat { get; set; }
        [Required]
        [Column("LNG")]
        public decimal decLng { get; set; }
        //[Required]
        [Column("IMAGE")]
        public byte[] bytImage { get; set; }
        [Column("USER_ID")]
        public int intUserID { get; set; }
        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        //[Column("DATE_SUBMITTED")]
        public DateTime dtmSubmissionDate { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }


    }
}
