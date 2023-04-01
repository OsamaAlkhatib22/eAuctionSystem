using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintDTO
    {
        [JsonIgnore]
        public string strUserName { get; set; }
        public int intTypeId { get; set; }
        public IFormFileCollection lstMedia { get; set; }
        public float decLat { get; set; }
        public float decLng { get; set; }
        public string strComment { get; set; }
        public Boolean blnIsVideo { get; set; }
    }
}
