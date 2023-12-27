using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Domain.ClientDTOs.Transaction
{
    public class TransferDTO
    {
        public string SenderUserName { get; set; }//client
        public string ReceiverUserName { get; set; }//freelancer
        public decimal Amount { get; set; }
    }
}

