using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Transaction
{
    public class WalletDTO
    {

        public decimal Balance { get; set; }
        public int userId { get; set; }
    }
}
