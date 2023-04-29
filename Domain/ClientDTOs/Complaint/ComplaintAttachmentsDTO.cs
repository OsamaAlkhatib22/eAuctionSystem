using Microsoft.AspNetCore.Http;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintAttachmentsDTO
    {
        public IFormFile fileMedia { get; set; }
        public float decLat { get; set; }
        public float decLng { get; set; }
        public Boolean blnIsVideo { get; set; }
    }
}
