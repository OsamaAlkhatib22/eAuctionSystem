using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintListDTO
    {
        public int intComplaintId { get; set; }
        public string strUserName { get; set; }
        public DateTime dateCreated { get; set; }
        public string complaintTypeEn { get; set; }
        public string complaintTypeAr { get; set; }

    }
}
