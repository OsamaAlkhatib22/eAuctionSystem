using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Transactions
{
    [Table("Wallet")]
    public class Wallet
    {
        [Column("UserId")]
        [Key]
        [ForeignKey("UserId")]//table name
        public int UserId { get; set; }

        [Column("Balance")]
        public decimal Balance { get; set; }
    }
}
