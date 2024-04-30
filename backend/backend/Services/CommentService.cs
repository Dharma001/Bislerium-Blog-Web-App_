using System;
using System.Threading.Tasks;
using backend.Models;
using backend.appDbContext;
using Microsoft.EntityFrameworkCore;
using backend.Models.Requests;
using backend.Migrations;

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

            comment.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return comment;
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
