﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Transaction
{
    public class TransactionDetailsDTO
    {
        public int TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public string FreeLancerUserName { get; set; }
        public string ClientUserName { get; set; }

        public int UserId { get; set; }
        public string Transaction_Type { get; set; }
    }
}
