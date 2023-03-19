using API.Services;
using Domain.DataModels;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtension
    {
        public static IServiceCollection AddIdentityService(
            this IServiceCollection services,
            IConfigurationBuilder configuration
        )
        {
            services
                .AddIdentityCore<ApplicationUser>(
                    opt => opt.SignIn.RequireConfirmedPhoneNumber = true
                )
                .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
