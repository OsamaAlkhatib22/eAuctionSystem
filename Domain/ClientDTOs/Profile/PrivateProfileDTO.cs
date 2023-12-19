using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Profile
{
    public class PrivateProfileDTO
    {
        public string user_name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
