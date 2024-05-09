using System;
using System.Collections.Generic;
using System.Linq;
using backend.appDbContext;
using backend.Contract;
using backend.Models;

namespace backend.Services
{
    public class AdminService : IAdminService
    {
        private readonly applicationContext _dbContext;

        public AdminService(applicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int GetAllTimeCountOfPosts()
        {
            return _dbContext.Blogs.Count();
        }

        public int GetMonthlyCountOfPosts(int month)
        {
            // Assuming the month is provided in the format MM (e.g., 01 for January)
            return _dbContext.Blogs
                .Where(blog => blog.CreatedAt.Month == month)
                .Count();
        }

       

        public List<User> GetTop10MostActiveBloggers()
        {
            return _dbContext.Users
                .OrderByDescending(user => user.Blogs.Count)
                .Take(10)
                .ToList();
        }

        private int CalculatePopularity(Blog blog, ICollection<BlogVote> blogVotes, ICollection<Comment> comments)
        {
            int upvoteWeightage = 2;
            int downvoteWeightage = -1;
            int commentWeightage = 1;

            int totalUpvotes = blogVotes.Count(bv => bv.BlogId == blog.Id && bv.IsUpvote);
            int totalDownvotes = blogVotes.Count(bv => bv.BlogId == blog.Id && !bv.IsUpvote);
            int totalComments = comments.Count(c => c.BlogId == blog.Id);

            return upvoteWeightage * totalUpvotes + downvoteWeightage * totalDownvotes + commentWeightage * totalComments;
        }


        public List<Blog> GetTop10MostPopularPosts()
        {
            // Assuming _dbContext is correctly initialized and has a Blogs property
            if (_dbContext == null)
            {
                throw new InvalidOperationException("Database context is not initialized.");
            }

            // Fetch blogs from the database context
            var blogs = _dbContext.Blogs.ToList();

            // Assuming BlogVote and Comment entities are correctly related to Blogs
            // Fetch blogVotes and comments from the database context
            var blogVotes = _dbContext.BlogVotes.ToList();
            var comments = _dbContext.Comments.ToList();

            // Calculate popularity for each blog
            var blogsWithPopularity = blogs.Select(blog => new
            {
                Blog = blog,
                Popularity = CalculatePopularity(blog, blogVotes, comments)
            }).ToList();

            // Order by popularity and take the top 10
            var top10Blogs = blogsWithPopularity.OrderByDescending(blog => blog.Popularity)
                                                .Select(blog => blog.Blog)
                                                .Take(10)
                                                .ToList();

            return top10Blogs;
        }

        public int GetAllTimeCumulativeCount()
        {
            throw new NotImplementedException();
        }

        public int GetMonthlyCumulativeCount(int month)
        {
            throw new NotImplementedException();
        }

    }
}
