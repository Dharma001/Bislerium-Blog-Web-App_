using backend.Models;
using backend.Models.Requests;

namespace backend.Contract
{
    public interface IRoleService
    {
        Task<List<Role>> GetAllRoles();
        Task<Role> GetRoleById(int id);
        Task<Role> CreateRole(RoleRequest roleRequest);
        Task<Role> UpdateRole(int id, RoleRequest roleRequest);
        Task<bool> DeleteRole(int id);
    }
}
