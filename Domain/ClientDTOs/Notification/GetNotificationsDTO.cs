using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.ClientDTOs.Notification
{
    public class GetNotificationsDTO
    {
        [JsonIgnore]
        public string UserName { get; set; }
        public int UserId { get; set; }
        public string Notification { get; set; }
        public DateTime NotificationDate { get; set; }
    }
}
