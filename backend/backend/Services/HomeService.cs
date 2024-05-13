using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Contract;
using Microsoft.EntityFrameworkCore;
using backend.appDbContext;
using backend.Models.Requests;
using System.Reflection.Metadata;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace backend.Services
{
    public class HomeService : IHomeService
    {
        private readonly applicationContext _context;
        private readonly IConfiguration _configuration;

        public HomeService(applicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Blog>> GetAllBlogsAsync()
        {
            return await _context.Blogs.ToListAsync();
        }
        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> UpdateUserProfile(int id, ProfileUserRequest userRequest)
        {
            var existingUser = await _context.Users.FindAsync(id);

            if (existingUser != null)
            {
                if (userRequest.FirstName != null)
                    existingUser.FirstName = userRequest.FirstName;

                if (userRequest.LastName != null)
                    existingUser.LastName = userRequest.LastName;

                if (userRequest.Email != null)
                    existingUser.Email = userRequest.Email;

                if (userRequest.Phone != null)
                    existingUser.Phone = userRequest.Phone;

                if (userRequest.Address != null)
                    existingUser.Address = userRequest.Address;

                await _context.SaveChangesAsync();
                return existingUser;
            }

            return null;
        }

        public async Task<bool> ChangeUserPassword(string email, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);

                await _context.SaveChangesAsync();
                return true; 
            }

            return false;
        }
    }
}