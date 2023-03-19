using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels
{
    [Table("users_types")]
    public class UserType
    {
        [Column("ID")]
        [Key]
        public int intId { get; set; }

        [Column("NAME")]
        public string strName { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }
    }
}
