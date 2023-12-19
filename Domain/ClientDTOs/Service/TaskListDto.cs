using Domain.ClientDTOs.User;


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
        


    }
}
