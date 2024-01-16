using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Profile
{
    public class ProfileUpdateDTO
    {
        [AllowNull]
        public string strOldPassword { get; set; }
        [AllowNull]
        public string strNewPassword { get; set; }
        [AllowNull]
        public string strNewEmail { get; set; }
        [AllowNull]
        public string strNewBio { get; set; }

       // public string ProfileMediaRef { get; set; }

        [AllowNull]
        public string strNewFieldOfWork { get; set; }
        [AllowNull]
        public string strNewJobTitle { get; set; }
        [AllowNull]
        public List<int> strNewSkills { get; set; }

        
       // public ICollection<ProfilePicDTO> ProfileMediaRef { get; set; }
    }
}
