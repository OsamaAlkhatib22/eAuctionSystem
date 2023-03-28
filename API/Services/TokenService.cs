using Domain.DataModels.User;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;

        public TokenService(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string CreateToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim("username", user.UserName),
                new Claim("phonenumber", user.PhoneNumber),
                new Claim("usertype", _context.UserTypes.Find(user.intUserTypeId).strName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
