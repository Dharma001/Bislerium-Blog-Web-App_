using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.appDbContext;
using backend.Models;
using backend.Models.Requests;
using backend.Contract;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BlogHistoryService : IBlogHistoryService
    {
        private readonly applicationContext _context;

        public BlogHistoryService(applicationContext context)
        {
            _context = context;
        }

        public async Task<List<BlogHistoryWithUserAndBlog>> GetBlogHistoryWithUserAndBlogByUserId(int userId)
        {
            return await _context.BlogHistory
                .Where(history => history.UserId == userId)
                .Include(history => history.User)
                .Select(history => new BlogHistoryWithUserAndBlog
                {
                    Id = history.Id,
                    UserFirstName = history.User.FirstName,
                    UserLastName = history.User.LastName,
                    Image = history.BlogHistoryImage,
                    BlogTitle=history.BlogTitle,
                    BlogContent=history.BlogContent,
                })
                .ToListAsync();
        }
    }
}
