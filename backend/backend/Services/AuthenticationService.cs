using backend.Contract;
using backend.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.appDbContext;

namespace backend.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration _configuration;
        private readonly applicationContext _context;

        public AuthenticationService(IConfiguration configuration, applicationContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<(string token, int? roleId ,int? Id)> Authenticate(string email, string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null || !VerifyPasswordHash(password, user.Password))
                    return (null, null ,null);

                var token = GenerateJwtToken(user);
                return (token, user.RoleId , user.Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = _configuration["ApplicationSettings:JWT_Secret"];
            var key = Encoding.ASCII.GetBytes(secret);

            var claims = new List<Claim>
    {
        new Claim("id", user.Id.ToString()), 
        new Claim("role_id", user.RoleId.ToString()) 

    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }
}

