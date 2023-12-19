using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain.DataModels.Categories
{

    [Table("Categories")]
    public class Category
    {
        [Column("category_id")]
        [Key]
        public int intId { get; set; }

        [Column("category_name")]
        [Required]
        public string strCategoryName { get; set; }

       
    }
}
