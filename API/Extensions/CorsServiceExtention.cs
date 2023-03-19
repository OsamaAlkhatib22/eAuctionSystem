namespace API.Extensions
{
    public static class CorsServiceExtention
    {
        public static IServiceCollection AddCorsService(
            this IServiceCollection services,
            IConfiguration configuration,
            IWebHostEnvironment environment
        )
        {
            if (environment.IsDevelopment())
            {
                services.AddCors(
                    opt =>
                        opt.AddPolicy(
                            "CorsPolicy",
                            policy => policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()
                        )
                );
            }
            else
            {
                services.AddCors(
                    opt =>
                        opt.AddPolicy(
                            "CorsPolicy",
                            policy =>
                                policy
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .WithOrigins(
                                        configuration.GetSection("CorsOrigins")["ReactApp"],
                                        configuration.GetSection("CorsOrigins")["FlutterApp"]
                                    )
                        )
                );
            }

            return services;
        }
    }
}
