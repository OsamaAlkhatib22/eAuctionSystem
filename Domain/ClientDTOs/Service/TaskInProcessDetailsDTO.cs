using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Service
{
    public class TaskInProcessDetailsDTO
    {

        public int ServiceId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FreeLancerUserName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Accepted_Bid { get; set; } 
        public string Category_name { get; set; }
        public DateTime CreationDate { get; set; }
        public decimal Rating { get; set; }
        public DateTime TaskSubmissionTime { get; set; }

        public List<string> Skills { get; set; }
        public string status {  get; set; }
        public List<String> lstMedia { get; set; }
      

    }
}
