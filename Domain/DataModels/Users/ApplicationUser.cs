using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Users
{
    [Table("Users")]
    public class ApplicationUser : IdentityUser<int>
    {

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("registration_date")]
        public DateTime RegistrationDate { get; set; }

        [Column("bio")]
        public string Bio { get; set; }

        [Column("Field_of_work")]
        public string FieldOfWork { get; set; }

        [Column("Job_title")]
        public string JobTitle { get; set; }

        [Column("user_type_id")]
        [ForeignKey("UserType")]
        public int UserTypeId { get; set; }

        [Column("profile_media_ref")]
        public string ProfileMediaRef { get; set; }


        public UserType UserType { get; set; }

        

        //relation
        public ICollection<UserRating.UserRating> Ratings { get; set; }
        //public ICollection<UserType> userTypes { get; set; }

        public ICollection<UserSkill> Skills { get; set; }

    }
}