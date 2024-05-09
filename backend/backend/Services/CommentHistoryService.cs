using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.appDbContext;
using backend.Contract;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CommentHistoryService : ICommentHistoryService
    {
        private readonly applicationContext _context;

        public CommentHistoryService(applicationContext context)
        {
            _context = context;
        }

        public async Task<List<CommentHistoryWithUserAndBlog>> GetCommentHistoryWithUserAndBlogByUserId(int userId)
        {
            return await _context.CommentHistory
                .Where(history => history.UserId == userId)
                .Include(history => history.User)
                .Include(history => history.Blog)
                .Select(history => new CommentHistoryWithUserAndBlog
                {
                    Id = history.Id,
                    UserFirstName = history.User.FirstName,
                    UserLastName = history.User.LastName,
                    BlogTitle = history.Blog.Title,
                    CommentContent = history.Content,
                })
                .ToListAsync();
        }

    }
}
