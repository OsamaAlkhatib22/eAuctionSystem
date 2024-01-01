using Domain.DataModels.Services;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Transactions
{
    [Table("TransactionService")]
    public class TransactionService
    {
        [ForeignKey("Service")]
        public int ServiceId { get; set; }

        [Key]
        public int TransactionId{ get; set; }


        public Service Service { get; set; }
    }
}
