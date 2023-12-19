using Domain.ClientDTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Transaction
{
    public class BuyerDTO
    {
        public int BuyerID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
       
    }
}
