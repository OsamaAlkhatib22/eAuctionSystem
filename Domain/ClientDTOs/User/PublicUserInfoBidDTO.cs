using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.User
{
    public class PublicUserInfoBidDTO
    {
        
        public int BidderId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

       public decimal Rating { get; set; }
       
      
    }
}
