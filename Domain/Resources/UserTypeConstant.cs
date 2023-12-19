namespace Domain.Resources
{
    public static class UserTypeConstant
    {
        public enum UserTypes
        {
            Admin = 1,
            Client = 2,
            Freelancer = 3
        }

        public static string GetUserTypeName(int userTypeNumber)
        {
            string userTypeName = Enum.GetName(typeof(UserTypes), userTypeNumber);
            return userTypeName?.Replace("_", " ");
        }
    }
}
