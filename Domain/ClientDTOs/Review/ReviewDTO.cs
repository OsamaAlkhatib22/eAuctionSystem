using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Review
{
    public class ReviewDTO
    {
        public int ReviewId { get; set; }
        public int ServiceId { get; set; }
        public int UserId { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; }

        public ServiceDTO Service { get; set; }
        public UserDTO User { get; set; }
    }
}
