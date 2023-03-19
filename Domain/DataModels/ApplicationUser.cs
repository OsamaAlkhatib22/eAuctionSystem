using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels
{
    public class ApplicationUser : IdentityUser<int>
    {
        // Add as ForeignKey to group table once created
        [Column("GROUP_ID")]
        public int intGroupId { get; set; }

        [Column("IS_VERIFIED")]
        public Boolean blnIsVerified { get; set; }

        [Column("IS_BLOCKED")]
        public Boolean blnIsBlocked { get; set; }

        [Column("IS_BLACKLISTED")]
        public Boolean blnIsBlacklisted { get; set; }

        [Column("IS_ACTIVE")]
        public Boolean blnIsActive { get; set; }

        [Column("USER_TYPE")]
        [Required]
        [ForeignKey("UserType")]
        public int intUserType { get; set; }
        public UserType UserType { get; set; }

        [Column("USER_INFO")]
        [Required]
        [ForeignKey("UserInfo")]
        public int intUserInfo { get; set; }
        public UserInfo UserInfo { get; set; }
    }
}
