using Microsoft.AspNetCore.Http;

namespace Domain.ClientDTOs.Complaint
{
        public class ComplaintViewDTO
        {
            public int intComplaintId { get; set; }
            public string strUserName { get; set; }
            public DateTime dtmDateCreated { get; set; }
            public string strComplaintTypeEn { get; set; }
            public string strComplaintTypeAr { get; set; }
            public List<String> lstMedia { get; set; }
            public Boolean blnIsVideo { get; set; }

    }
}
