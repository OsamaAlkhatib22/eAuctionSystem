using System.ComponentModel.DataAnnotations;

namespace Domain.ClientDTOs
{
    public class LoginDTO
    {
        [Required]
        public string strLogin { get; set; }

        [Required]
        public string strPassword { get; set; }
    }
}
