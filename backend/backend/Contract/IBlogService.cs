 using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace backend.Contract
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogWithUserRequest>> GetAllBlogsAsync();
        Task<Blog> GetBlogByIdAsync(int id);
        Task<Blog> CreateBlogAsync(BlogRequest blogRequest, IFormFile imageFile);
        Task UpdateBlogAsync(int id, BlogRequest blogRequest, IFormFile imageFile);
        Task DeleteBlogAsync(int id);
    }
}
