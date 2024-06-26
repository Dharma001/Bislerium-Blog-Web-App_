﻿using backend.Contract;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;
using backend.appDbContext;
using Microsoft.CodeAnalysis.Scripting;
using backend.Models.Requests;
using backend.Models.Requests.Users;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly applicationContext _context;

        public UserService(applicationContext context)
        {
            _context = context;
        }

        public async Task<List<UserWithRole>> GetAllUsers()
        {
            var usersWithRoles = await _context.Users
                .Select(user => new UserWithRole
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    Status = user.Status,
                    RoleName = user.Role.Name
                })
                .ToListAsync();

            return usersWithRoles;
        }


        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> CreateUser(UserRequest userRequest)
        {
            var user = new User
            {
                FirstName = userRequest.FirstName,
                LastName = userRequest.LastName,
                Email = userRequest.Email,
                Phone = userRequest.Phone,
                RoleId = userRequest.RoleId,
                Address = userRequest.Address,
                Password = BCrypt.Net.BCrypt.HashPassword(userRequest.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(int id, UpdateUserRequest userRequest)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                existingUser.FirstName = userRequest.FirstName ?? existingUser.FirstName;
                existingUser.LastName = userRequest.LastName ?? existingUser.LastName;
                existingUser.Email = userRequest.Email ?? existingUser.Email;
                existingUser.Phone = userRequest.Phone ?? existingUser.Phone;
                existingUser.RoleId = userRequest.RoleId;
                existingUser.Address = userRequest.Address ?? existingUser.Address;

                if (!string.IsNullOrWhiteSpace(userRequest.Password))
                {
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userRequest.Password);
                    existingUser.Password = hashedPassword;
                }

                await _context.SaveChangesAsync();
                return existingUser;
            }
            return null;
        }
        public async Task<User> UpdateUserProfile(int id, UpdateProfileRequest userRequest)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                existingUser.FirstName = userRequest.FirstName ?? existingUser.FirstName;
                existingUser.LastName = userRequest.LastName ?? existingUser.LastName;
                existingUser.Email = userRequest.Email ?? existingUser.Email;
                existingUser.Phone = userRequest.Phone ?? existingUser.Phone;
                existingUser.Address = userRequest.Address ?? existingUser.Address;

                await _context.SaveChangesAsync();
                return existingUser;
            }
            return null;
        }

        public async Task<User> UpdateUserProfilePassword(int id, UpdateProfilePasswordRequest request)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                if (BCrypt.Net.BCrypt.Verify(request.CurrentPassword, existingUser.Password))
                {
                    string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                    existingUser.Password = hashedNewPassword;

                    await _context.SaveChangesAsync();
                    return existingUser;
                }
                else
                {
                    throw new Exception("Current password is incorrect.");
                }
            }
            return null;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                _context.Users.Remove(existingUser);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> RemoveUser(int id)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                existingUser.Status = false;

                _context.Users.Update(existingUser);

                await _context.SaveChangesAsync();

                return true;
            }
            return false;
        }
        public async Task<User> UpdateUserStatus(int id, bool status)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                existingUser.Status = !existingUser.Status;
                await _context.SaveChangesAsync();
                return existingUser;
            }
            return null;
        }

    }
}
