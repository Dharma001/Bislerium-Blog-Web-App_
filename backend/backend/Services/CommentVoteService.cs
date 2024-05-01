using System;
using System.Threading.Tasks;
using backend.Services.Interfaces;
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

        public async Task<bool> AddVote(int userId, int blogId, int commentId, bool isUpvote)
        {
            try
            {
                var existingVote = await _context.CommentVotes
                    .FirstOrDefaultAsync(cv => cv.UserId == userId && cv.BlogId == blogId && cv.CommentId == commentId);

                if (existingVote != null)
                {
                    existingVote.IsUpvote = isUpvote;
                    existingVote.UpdatedAt = DateTime.Now;
                }
                else
                {
                    var newVote = new CommentVote
                    {
                        UserId = userId,
                        BlogId = blogId,
                        CommentId = commentId,
                        IsUpvote = isUpvote,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    };
                    await _context.CommentVotes.AddAsync(newVote);
                }

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<bool> RemoveVote(int userId, int blogId, int commentId)
        {
            try
            {
                var voteToRemove = await _context.CommentVotes
                    .FirstOrDefaultAsync(cv => cv.UserId == userId && cv.BlogId == blogId && cv.CommentId == commentId);

                if (voteToRemove != null)
                {
                    _context.CommentVotes.Remove(voteToRemove);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
