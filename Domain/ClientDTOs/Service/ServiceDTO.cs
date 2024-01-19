using Domain.ClientDTOs.Category;
using Domain.ClientDTOs.User;

namespace Domain.ClientDTOs.Service
{
    public class ServiceDTO
    {
        public int ServiceId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ClientUserName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal starting_bid { get; set; }
        public TimeSpan BidDuration { get; set; }
        public string Category_name { get; set; }
        public DateTime TaskSubmissionTime { get; set; }
        public DateTime CreationDate { get; set; }
        public decimal Rating { get; set; }
        public List<String> lstMedia { get; set; }

        public string status { get; set; }
        

        public List<string> Skills { get; set; }
    }
}
