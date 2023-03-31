using Microsoft.AspNetCore.Http;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintDTO
    {
        public int intUserId { get; set; }
        public int intTypeId { get; set; }
        public IFormFile fileImage { get; set; }
        public float decLat { get; set; }
        public float decLng { get; set; }
        public string strComment { get; set; }
    }
}
