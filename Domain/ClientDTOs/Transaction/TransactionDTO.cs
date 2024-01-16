using System.Text.Json.Serialization;

namespace Domain.ClientDTOs.Transaction
{
    public class TransactionDTO
    {
        
        public int TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public int ServiceId { get; set; }

        public string ClientUserName { get; set; }

        public int UserId { get; set; }
        public string Transaction_Type { get; set; }

       
    }
}
