using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace backend.Contract
{
    public interface IHomeService
    {
        Task<IEnumerable<Blog>> GetAllBlogsAsync();
        Task<User> GetUserById(int id);
        Task<User> UpdateUserProfile(int id, ProfileUserRequest userRequest);
    }
}