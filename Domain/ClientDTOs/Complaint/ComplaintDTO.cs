using System.Text.Json.Serialization;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintDTO
    {
        [JsonIgnore]
        public string strUserName { get; set; }
        public int intTypeId { get; set; }
        public int intPrivacyId { get; set; }
        public ICollection<ComplaintAttachmentsDTO> lstMedia { get; set; }
        public string strComment { get; set; }
    }
}
