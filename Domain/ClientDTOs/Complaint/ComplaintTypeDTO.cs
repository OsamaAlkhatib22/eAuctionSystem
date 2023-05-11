using System.Text.Json.Serialization;

namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintTypeDTO
    {
        [JsonIgnore]
        public string strUserName { get; set; }
        public decimal decGrade { get; set; }
        public int intPrivacyId { get; set; }
        public int intDepartmentId { get; set; }
        public string strNameAr { get; set; }
        public string strNameEn { get; set; }
        public int intPrivacyId { get; set; }
    }
}
