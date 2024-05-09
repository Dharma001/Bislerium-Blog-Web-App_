using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.appDbContext;
using backend.Contract;
using backend.Models;
using backend.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AdminService : IAdminService
    {
        private readonly applicationContext _context;

        public AdminService(applicationContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<DashboardRequests> GetAllTimeCounts()
        {
            // Count total posts, upvotes, downvotes, and comments
            int totalPosts = _context.Blogs.Count();
            int totalUpvotes = _context.BlogVotes.Count(bv => bv.IsUpvote);
            int totalDownvotes = _context.BlogVotes.Count(bv => !bv.IsUpvote);
            int totalComments = _context.Comments.Count();

            // Construct DashboardRequests object
            var dashboardRequests = new DashboardRequests
            {
                BlogCounts = totalPosts,
                BlogUpVoteCounts = totalUpvotes,
                BlogDownVoteCounts = totalDownvotes,
                CommentCounts = totalComments,
            };

            return dashboardRequests;
        }

        public async Task<List<Blog>> GetTopPopularPostsAllTime()
        {
            // Retrieve top 10 most popular blog posts of all time based on popularity score
            var topPosts = _context.Blogs
                .OrderByDescending(blog => (2 * blog.BlogVotes.Count(bv => bv.IsUpvote)) +
                                           (-1 * blog.BlogVotes.Count(bv => !bv.IsUpvote)) +
                                           (1 * blog.Comments.Count))
                .Take(10)
                .ToList();

            return topPosts;
        }

        public async Task<List<Blog>> GetTopPopularPostsByMonth(int year, int month)
        {
            var topPosts = _context.Blogs
                .Where(blog => blog.CreatedAt.Year == year && blog.CreatedAt.Month == month)
                .OrderByDescending(blog => (2 * blog.BlogVotes.Count(bv => bv.IsUpvote)) +
                                           (-1 * blog.BlogVotes.Count(bv => !bv.IsUpvote)) +
                                           (1 * blog.Comments.Count))
                .Take(10)
                .ToList();

            return topPosts;
        }

        public async Task<List<User>> GetTopPopularBloggers()
        {
            var topBloggers = await _context.Users
                .OrderByDescending(user => user.Blogs.Sum(blog =>
                    (2 * blog.BlogVotes.Count(bv => bv.IsUpvote)) +
                    (-1 * blog.BlogVotes.Count(bv => !bv.IsUpvote)) +
                    (1 * blog.Comments.Count)))
                .Take(10)
                .ToListAsync();

            return topBloggers;
        }
    }
}
