using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.User
{
    public class RegisterDTO
    {
        public string user_name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Bio { get; set; }
        public int UserTypeId { get; set; }
        public string FieldOfWork {  get; set; }
        public string JobTitle { get; set; }
        public List<int> Skills  { get; set; } //= new List<int>();

    }
}
