namespace Domain.ClientDTOs.Complaint
{
    public class ComplaintViewDTO
    {
        public int intComplaintId { get; set; }
        public string strUserName { get; set; }
        public DateTime dtmDateCreated { get; set; }
        public DateTime dtmDateFinished { get; set; }
        public string strComplaintTypeEn { get; set; }
        public string strComplaintTypeAr { get; set; }
        public string strComment { get; set; }
        public string strStatus { get; set; }
        public int intPrivacyId { get; set; }
        public int intVotersCount { get; set; }
        public decimal decLat { get; set; }
        public decimal decLng { get; set; }
        public Decimal decPriority { get; set; }
        public List<String> lstMedia { get; set; }
        public Boolean blnIsVideo { get; set; }
    }
}
