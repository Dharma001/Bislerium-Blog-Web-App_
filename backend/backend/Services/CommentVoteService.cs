using System;
using System.Threading.Tasks;
using backend.Contract;
using backend.Models;
using backend.appDbContext;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CommentVoteService : ICommentVoteService
    {
        private readonly applicationContext _context;

        public CommentVoteService(applicationContext context)
        {
            _context = context;
        }

        public async Task<bool> AddUpvote(int userId, int commentId, int blogId)
        {
            var existingVote = await _context.CommentVotes.FindAsync(userId, commentId, blogId);

            if (existingVote != null)
            {
                if (!existingVote.IsUpvote)
                {
                    existingVote.IsUpvote = true;
                    existingVote.UpdatedAt = DateTime.UtcNow;
                }
            }
            else
            {
                var newVote = new CommentVote
                {
                    UserId = userId,
                    CommentId = commentId,
                    BlogId = blogId,
                    IsUpvote = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _context.CommentVotes.AddAsync(newVote);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AddDownvote(int userId, int commentId, int blogId)
        {
            var existingVote = await _context.CommentVotes.FindAsync(userId, commentId, blogId);

            if (existingVote != null)
            {
                if (existingVote.IsUpvote)
                {
                    existingVote.IsUpvote = false;
                    existingVote.UpdatedAt = DateTime.UtcNow;
                }
            }
            else
            {
                var newVote = new CommentVote
                {
                    UserId = userId,
                    CommentId = commentId,
                    BlogId = blogId,
                    IsUpvote = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _context.CommentVotes.AddAsync(newVote);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetTotalCommentCount(int blogId)
        {
            var count = await _context.Comments.CountAsync(c => c.BlogId == blogId);
            return count;
        }
        public async Task<int> GetUpvoteCount(int commentId, int blogId)
        {
            return await _context.CommentVotes.CountAsync(v => v.CommentId == commentId && v.BlogId == blogId && v.IsUpvote);
        }

        public async Task<int> GetDownvoteCount(int commentId, int blogId)
        {
            return await _context.CommentVotes.CountAsync(v => v.CommentId == commentId && v.BlogId == blogId && !v.IsUpvote);
        }

        public async Task<bool?> IsUpvoted(int userId, int commentId, int blogId)
        {
            var existingVote = await _context.CommentVotes.FindAsync(userId, commentId, blogId);
            return existingVote?.IsUpvote;
        }

        public async Task<bool?> IsDownvoted(int userId, int commentId, int blogId)
        {
            var existingVote = await _context.CommentVotes.FindAsync(userId, commentId, blogId);
            return existingVote?.IsUpvote;
        }

        public async Task<bool> RemoveVote(int userId, int commentId, int blogId)
        {
            var existingVote = await _context.CommentVotes.FindAsync(userId, commentId, blogId);

            if (existingVote == null)
                return false;

            _context.CommentVotes.Remove(existingVote);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}