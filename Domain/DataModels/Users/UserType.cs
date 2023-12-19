using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Users
{
    [Table("UserType")]
    public class UserType
    {
        [Column("Type")]
        public string Type { get; set; }

        [Column("user_type_id")]
        [Key]
        public int UserTypeId { get; set; }
    }
}
