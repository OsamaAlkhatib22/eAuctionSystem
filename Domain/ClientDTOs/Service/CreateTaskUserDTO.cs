using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Service
{
    public class CreateTaskUserDTO
    {

        [JsonIgnore]
        public string UserName { get; set; }
        public int ServiceId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TimeSpan bid_duration { get; set; }
        public decimal starting_bid { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreationDate { get; set; }
        



        public ICollection<AttachmentsDTO> lstMedia { get; set; }

    }
}
