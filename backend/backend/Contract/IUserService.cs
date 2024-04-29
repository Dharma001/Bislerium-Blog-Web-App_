using backend.Models;
using backend.Models.Requests;

namespace backend.Contract
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> CreateUser(UserRequest userRequest);
        Task<User> UpdateUser(int id, UserRequest userRequest);
        Task<bool> DeleteUser(int id);
    }
}