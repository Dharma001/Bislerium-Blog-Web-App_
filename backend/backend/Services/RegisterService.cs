using backend.Contract;
using backend.Models.Requests;
using backend.Models;
using backend.appDbContext;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BCrypt.Net;

namespace backend.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly applicationContext _context;

        public RegisterService(applicationContext context)
        {
            _context = context;
        }

        public async Task<bool> Register(RegisterRequest request)
        {

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone,
                Address = request.Address,
                Password = hashedPassword,
                RoleId = 2,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
