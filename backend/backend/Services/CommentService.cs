using System;
using System.Threading.Tasks;
using backend.Models;
using backend.appDbContext;
using Microsoft.EntityFrameworkCore;
using backend.Models.Requests;
using NuGet.Protocol.Plugins;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace backend.Services
{
    public class CommentService : ICommentService
    {
        private readonly applicationContext _context;

        public CommentService(applicationContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddComment(int userId, int blogId, string content)
        {
            var comment = new Comment
            {
                UserId = userId,
                BlogId = blogId,
                Content = content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);

            var updateHistoryEntry = new CommentHistory
            {
                UserId = userId,
                BlogId = blogId,
                Content = content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.CommentHistory.Add(updateHistoryEntry);

            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> UpdateComment(int commentId, int userId, int blogId, CommentRequest commentRequest)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null || comment.UserId != userId || comment.BlogId != blogId)
                return null;

            if (commentRequest.Content != null)
            {
                comment.Content = commentRequest.Content;
            }

            var updateHistoryEntry = new CommentHistory
            {
                UserId = userId,
                BlogId = blogId,
                Content = commentRequest.Content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.CommentHistory.Add(updateHistoryEntry);

            comment.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return comment;
        }
        public async Task<List<Comment>> GetCommentsByBlogId(int blogId)
        {
            return await _context.Comments
                .Where(c => c.BlogId == blogId)
                .ToListAsync();
        }
        public async Task<Comment> GetComment(int commentId, int userId, int blogId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return null;
            }

            if (comment.UserId != userId || comment.BlogId != blogId)
            {
                return null;
            }

            return comment;
        }


        public async Task<Comment> DeleteComment(int commentId, int userId, int blogId)
        {
            var commentToDelete = await _context.Comments.FindAsync(commentId);

            if (commentToDelete == null || commentToDelete.UserId != userId || commentToDelete.BlogId != blogId)
            {
                return null;
            }

            _context.Comments.Remove(commentToDelete);
            await _context.SaveChangesAsync();

            return commentToDelete;
        }
    }
}
