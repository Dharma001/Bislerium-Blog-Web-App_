using System;
using System.Threading.Tasks;
using backend.appDbContext;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class BlogVoteService : IBlogVoteService
    {
        private readonly applicationContext _context;

        public BlogVoteService(applicationContext context)
        {
            _context = context;
        }

        public async Task<bool> AddVote(int userId, int blogId, bool isUpvote)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);

            if (existingVote != null)
            {
                existingVote.IsUpvote = isUpvote;
                existingVote.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                var newVote = new BlogVote
                {
                    UserId = userId,
                    BlogId = blogId,
                    IsUpvote = isUpvote,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _context.BlogVotes.AddAsync(newVote);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateVote(int userId, int blogId, bool isUpvote)
        {
            var existingVote = await _context.BlogVotes.FindAsync(userId, blogId);

            if (existingVote == null)
                return false;

            existingVote.IsUpvote = isUpvote;
            existingVote.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
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
