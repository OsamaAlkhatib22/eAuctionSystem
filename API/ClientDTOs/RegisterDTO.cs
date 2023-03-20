using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace API.ClientDTOs
{
    public class RegisterDTO
    {
        [Required]
        public string strUsername { get; set; }

        [Required]
        public string strPhonenumber { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$" ErrorMessage = "Password not valid")]
        public string strPassword { get; set; }

        [Required]
        public string strFirstName { get; set; }

        [Required]
        public string strLastName { get; set; }

        [AllowNull]
        [EmailAddress]
        public string strEmail { get; set; }

        [AllowNull]
        public string strNationalId { get; set; }

        [AllowNull]
        public string strPassportNumber { get; set; }

        [AllowNull]
        public string strRegistrationNumber { get; set; }

        [AllowNull]
        public string strNationalIdNumber { get; set; }
    }
}
