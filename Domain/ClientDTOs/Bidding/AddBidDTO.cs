using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Bidding
{
    public class AddBidDTO
    {
        [JsonIgnore]//to ignore username
        public string username {  get; set; }
        public decimal Bid_Amount { get; set; }
    }
}
