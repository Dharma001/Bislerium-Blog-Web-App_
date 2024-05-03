using backend.Models;
using backend.Models.Requests;
using backend.Models.Requests.Users;
using System.Threading.Tasks;

namespace backend.Contract
{
    public interface IUserService
    {
        Task<List<UserWithRole>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> CreateUser(UserRequest userRequest);
        Task<User> UpdateUser(int id, UpdateUserRequest userRequest);
        Task<User> UpdateUserProfile(int id, UpdateProfileRequest userRequest);
        Task<User> UpdateUserProfilePassword(int id, UpdateProfilePasswordRequest request);
        Task<bool> DeleteUser(int id);
    }
}