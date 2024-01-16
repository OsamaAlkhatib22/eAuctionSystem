using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Profile
{
    public class ProfilePicDTO
    {
        public IFormFile fileMedia { get; set; }

        public Boolean blnIsVideo { get; set; }
    }
}
