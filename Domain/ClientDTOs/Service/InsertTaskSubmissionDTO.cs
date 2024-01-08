using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Service
{
    public class InsertTaskSubmissionDTO
    {
        [JsonIgnore]
        public string UserName { get; set; }
        public int ServiceId { get; set; }
        public string Comment { get; set; } 
        public DateTime TaskSubmissionTime { get; set; }

        public ICollection<AttachmentsDTO> lstMedia { get; set; } = new List<AttachmentsDTO>();

    }
}
