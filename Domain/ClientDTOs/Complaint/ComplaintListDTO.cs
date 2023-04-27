namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintListDTO
    {
        public int intComplaintId { get; set; }
        public string strUserName { get; set; }
        public DateTime dtmDateCreated { get; set; }
        public string strComplaintTypeEn { get; set; }
        public string strComplaintTypeAr { get; set; }
        public string strStatus { get; set; }
        public Decimal decPriority { get; set; }
    }
}
