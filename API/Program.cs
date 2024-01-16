using Persistence;
using API.Extensions;
using Microsoft.AspNetCore.Identity;
// Remove unused using directives related to authorization

using Domain.DataModels.Users;
using Application.Handlers.Notification;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Remove the authorization policy and filter
// var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
// opt.Filters.Add(new AuthorizeFilter(policy));

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddCorsService(builder.Configuration, builder.Environment);
builder.Services.AddIdentityService(builder.Configuration);
builder.Services.AddTransient<NotificationHandler>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

// Remove the authorization middleware
 app.UseAuthentication();
 app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;




app.Run();