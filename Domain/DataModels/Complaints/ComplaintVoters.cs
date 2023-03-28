using Domain.DataModels.User;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.DataModels.Complaints
{
    [Table("complaint_voters")]
    public class ComplaintVoters
    {
        [ForeignKey("User")]
        [Column("USER_ID")]
        public int intUserId { get; set; }
        public ApplicationUser User { get; set; }

        [Column("COMPLAINT_ID")]
        [ForeignKey("Complaint")]
        public int intComplaintId { get; set; }
        public Complaint Complaint { get; set; }

        [Column("IS_HOST")]
        public Boolean blnIsHost { get; set; }
    }
}
