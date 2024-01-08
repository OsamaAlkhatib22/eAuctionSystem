using Domain.ClientDTOs.User;
using System.Collections.Generic;

namespace Domain.ClientDTOs.Task
{
    public class TaskListDTO
    {
        public string Title { get; set; }

        public int ServiceId { get; set; }
        public string FirstName {  get; set; }
        public string LastName { get; set; }
 
        public DateTime CreationDate { get; set; }
        public string Description { get; set; }

       public DateTime TaskSubmissionTime { get; set; }
        public int intCategoryId {  get; set; }
        public string strCategoryName {  get; set; }

        public decimal Budget {  get; set; }

        public List<int> intSkillIds { get; set; } = new List<int>();

        public List<string> strSkills { get; set; } = new List<string>();
        public string status { get; set; }
        


    }
}
