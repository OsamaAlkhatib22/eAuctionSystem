using Domain.ClientDTOs.Transaction;
using Domain.ClientDTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Bidding
{
    public class BidDTO
    {
        public int BidId { get; set; }
        public decimal BidAmount {  get; set; }


        public PublicUserInfoBidDTO Bidder { get; set; }


    }
}
