using System;
using System.Threading.Tasks;
using backend.appDbContext;
using backend.Models;
using backend.Contract;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BlogVoteService : IBlogVoteService
    {
        private readonly applicationContext _context;

        public BlogVoteService(applicationContext context)
        {
            _context = context;
        }

        public async Task<bool> AddUpvote(int userId, int blogId)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);

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
                var newVote = new BlogVote
                {
                    UserId = userId,
                    BlogId = blogId,
                    IsUpvote = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _context.BlogVotes.AddAsync(newVote);
            }

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> AddDownvote(int userId, int blogId)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);

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
                var newVote = new BlogVote
                {
                    UserId = userId,
                    BlogId = blogId,
                    IsUpvote = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _context.BlogVotes.AddAsync(newVote);
            }

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<int> GetUpvoteCount(int blogId)
        {
            return await _context.BlogVotes.CountAsync(v => v.BlogId == blogId && v.IsUpvote);
        }

        public async Task<int> GetDownvoteCount(int blogId)
        {
            return await _context.BlogVotes.CountAsync(v => v.BlogId == blogId && !v.IsUpvote);
        }
        public async Task<bool?> IsUpvoted(int userId, int blogId)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);
            return existingVote?.IsUpvote;
        }
        public async Task<bool?> IsDownvoted(int userId, int blogId)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);
            return existingVote?.IsUpvote;
        }
        public async Task<bool> RemoveVote(int userId, int blogId)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);

            if (existingVote == null)
                return false;

            _context.BlogVotes.Remove(existingVote);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
