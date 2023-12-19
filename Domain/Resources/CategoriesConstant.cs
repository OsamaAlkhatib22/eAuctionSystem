
namespace Domain.Resources
{
    public static class CategoriesConstant
    {
        public enum CategoryNames
        {
            Graphic_Design = 1,
            Writing_And_Translation = 2,
            Digital_Marketing = 3,
            Networking = 4,
            Music_And_Audio = 5,
            General_Tasks = 6,
            Web_Development = 7,
            Frontend_Development = 8,
            Database_Administration = 9,
            Other_Services = 10
        }
        
        public static string GetCategoryName(int categoryNumber)
        {
            string categoryName = Enum.GetName(typeof(CategoryNames), categoryNumber);
            return categoryName?.Replace("_", " ");
        }
    }
}

