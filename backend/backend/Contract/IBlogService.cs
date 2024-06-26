﻿ using System.Collections.Generic;
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
        Task<IEnumerable<BlogWithUserRequest>> GetRecentBlogsAsync();
        Task DeleteBlogAsync(int id);
        Task<IEnumerable<BlogWithUserRequest>> GetAllBlogsAsync(string sortBy, string order, string searchQuery, int page, int pageSize);
        Task<IEnumerable<BlogWithUserRequest>> GetBlogsByUserIdAsync(int userId);
    }
}
