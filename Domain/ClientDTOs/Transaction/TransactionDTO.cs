using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Transaction
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }

        public ServiceDTO Service { get; set; }
        public BuyerDTO Buyer { get; set; }
        public BidderDTO Bidder { get; set; }
    }
}
