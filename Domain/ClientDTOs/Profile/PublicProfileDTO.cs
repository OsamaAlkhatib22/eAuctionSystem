using Domain.ClientDTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Profile
{
    public class PublicProfileDTO
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
       // public string Password { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public decimal Rating { get; set; }
        public string ProfileMediaRef { get; set; } 
        public string UserType { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string FieldOfWork { get; set; }
        public string JobTitle { get; set; }
        public List<string> Skills { get; set; }

    }
}
