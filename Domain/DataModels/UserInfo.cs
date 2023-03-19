using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels
{
    [Table("users_info")]
    public class UserInfo
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Column("NATIONAL_ID")]
        public string strNationalId { get; set; }

        [Column("PASSPORT_NUMBER")]
        public string strPassportNumber { get; set; }

        [Column("REGISTRATION_NUMBER")]
        public string strRegistrationNumber { get; set; }

        [Column("NATIONAL_ID_NUMBER")]
        public string strNationalIdNumber { get; set; }

        [Column("IS_JORDAINIAN")]
        public Boolean isJordainian { get; set; }

        public ApplicationUser User { get; set; }
    }
}
