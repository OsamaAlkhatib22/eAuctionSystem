using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Service
{
    public class AttachmentsDTO
    {
        public IFormFile fileMedia { get; set; }
       
    }
}
