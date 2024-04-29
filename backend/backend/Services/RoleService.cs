using backend.appDbContext;
using backend.Contract;
using backend.Models; 
using backend.Models.Requests;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Services
{
    public class RoleService : IRoleService
    {
        private readonly applicationContext _context;

        public RoleService(applicationContext context)
        {
            _context = context;
        }
        public async Task<List<Role>> GetAllRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetRoleById(int id)
        {
            return await _context.Roles.FindAsync(id);
        }

        public async Task<Role> CreateRole(RoleRequest roleRequest)
        {
            if (roleRequest == null || string.IsNullOrEmpty(roleRequest.Name))
            {
                throw new ArgumentNullException(nameof(roleRequest));
            }

            var existingRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleRequest.Name);
            if (existingRole != null)
            {
                throw new DuplicateNameException("Role name already exists.");
            }

            var newRole = new Role
            {
                Name = roleRequest.Name,
                Description = roleRequest.Description
            };

            _context.Roles.Add(newRole);
            await _context.SaveChangesAsync();

            return await _context.Roles.FindAsync(newRole.Id);
        }

        public async Task<Role> UpdateRole(int id, RoleRequest roleRequest)
        {
            var existingRole = await _context.Roles.FindAsync(id);
            if (existingRole == null)
            {
                throw new KeyNotFoundException("Role not found.");
            }

            existingRole.Name = roleRequest.Name ?? existingRole.Name;
            existingRole.Description = roleRequest.Description ?? existingRole.Description;

            _context.Roles.Update(existingRole);
            await _context.SaveChangesAsync();

            return existingRole;
        }

        public async Task<bool> DeleteRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null)
            {
                return false;
            }
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}
