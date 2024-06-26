﻿using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Contract;
using Microsoft.EntityFrameworkCore;
using backend.appDbContext;
using backend.Models.Requests;
using System.Reflection.Metadata;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace backend.Services
{
    public class BlogService : IBlogService
    {
        private readonly applicationContext _context;
        private readonly IConfiguration _configuration;

        public BlogService(applicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<BlogWithUserRequest>> GetAllBlogsAsync()
        {
            return await _context.Blogs
                .Include(b => b.User)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BlogWithUserRequest
                {
                    Id = b.Id,
                    Title = b.Title,
                    Content = b.Content,
                    CreatedAt = b.CreatedAt,
                    Image = b.Image,
                    UserId = b.UserId,
                    UserFirstName = b.User.FirstName,
                    UserLastName = b.User.LastName
                })
                .ToListAsync();
        }
        public async Task<IEnumerable<BlogWithUserRequest>> GetAllBlogsAsync(string sortBy, string order, string searchQuery, int page, int pageSize)
        {
            IQueryable<Blog> query = _context.Blogs
                .Include(b => b.User)
                .Include(b => b.BlogVotes)
                .Include(b => b.Comments); 

            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(b => b.Title.Contains(searchQuery) || b.Content.Contains(searchQuery));
            }

            switch (sortBy)
            {
                case "popularity":
                    query = order == "asc" ? query.OrderBy(b => b.BlogVotes.Count(v => v.IsUpvote)) : query.OrderByDescending(b => b.BlogVotes.Count(v => v.IsUpvote));
                    break;
                case "recency":
                    query = order == "asc" ? query.OrderBy(b => b.CreatedAt) : query.OrderByDescending(b => b.CreatedAt);
                    break;
                default:
                    query = query.OrderByDescending(b => b.CreatedAt);
                    break;
            }

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            return await query
                .Select(b => new BlogWithUserRequest
                {
                    Id = b.Id,
                    Title = b.Title,
                    Content = b.Content,
                    CreatedAt = b.CreatedAt,
                    Image = b.Image,
                    UserId = b.UserId,
                    UserFirstName = b.User.FirstName,
                    UserLastName = b.User.LastName
                })
                .ToListAsync();
        }
    public async Task<Blog> GetBlogByIdAsync(int id)
        {
            return await _context.Blogs.FindAsync(id);
        }

        private bool ValidateImageFile(IFormFile imageFile)
        {
            if (imageFile == null)
            {
                return true;
            }
            var allowedExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(imageFile.FileName).ToLower();
            if (!allowedExtensions.Contains(extension))
            {
                return false;
            }
            const long maxSize = 5 * 1024 * 1024;
            if (imageFile.Length > maxSize)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<BlogWithUserRequest>> GetBlogsByUserIdAsync(int userId)
        {
            return await _context.Blogs
                .Include(b => b.User)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BlogWithUserRequest
                {
                    Id = b.Id,
                    Title = b.Title,
                    Content = b.Content,
                    CreatedAt = b.CreatedAt,
                    Image = b.Image,
                    UserId = b.UserId,
                    UserFirstName = b.User.FirstName,
                    UserLastName = b.User.LastName
                })
                .ToListAsync();
        }

        public async Task<Blog> CreateBlogAsync(BlogRequest blogRequest, IFormFile? imageFile = null)
        {
            string fileName = null;
            string imageForHistory = null;

            if (imageFile != null && !ValidateImageFile(imageFile))
            {
                throw new ArgumentException("Invalid image file.");
            }

            if (imageFile != null)
            {
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Public", "Blog");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                var uploadsHistoryFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Public", "BlogHistory");
                var fileHistoryName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var fileHistoryPath = Path.Combine(uploadsHistoryFolderPath, fileHistoryName);

                if (!Directory.Exists(uploadsHistoryFolderPath))
                {
                    Directory.CreateDirectory(uploadsHistoryFolderPath);
                }

                using (var stream = new FileStream(fileHistoryPath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                imageForHistory = Path.Combine("Public", "BlogHistory", fileHistoryName);
            }

            var blog = new Blog
            {
                Title = blogRequest.Title,
                Content = blogRequest.Content,
                UserId = blogRequest.UserId,
                CreatedAt = DateTime.UtcNow,
                Image = fileName != null ? Path.Combine("public", "Blog", fileName) : null
            };

            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            if (imageFile != null && imageForHistory != null)
            {
                var createHistoryEntry = new BlogHistory
                {
                    UserId = blogRequest.UserId,
                    BlogTitle = blogRequest.Title,
                    BlogHistoryImage = imageForHistory,
                    BlogContent = blogRequest.Content,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.BlogHistory.Add(createHistoryEntry);
                await _context.SaveChangesAsync();
            }

            return blog;
        }

        public async Task UpdateBlogAsync(int id, BlogRequest blogRequest, IFormFile? newImageFile = null)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                throw new ArgumentException("Blog not found.");

            if (newImageFile != null && !ValidateImageFile(newImageFile))
                throw new ArgumentException("Invalid image file.");

            string currentImagePath = null;
            string imageForHistory = null;

            if (newImageFile != null)
            {
                if (!string.IsNullOrEmpty(blog.Image))
                {
                    currentImagePath = Path.Combine(Directory.GetCurrentDirectory(), blog.Image);
                    if (File.Exists(currentImagePath))
                    {
                        File.Delete(currentImagePath);
                    }
                }

                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Public", "Blog");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(newImageFile.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);


                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await newImageFile.CopyToAsync(stream);
                }
                blog.Image = Path.Combine("Public", "Blog", fileName);

                var uploadsHistoryFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Public", "BlogHistory");
                var fileHistoryName = Guid.NewGuid().ToString() + Path.GetExtension(newImageFile.FileName);
                var fileHistoryPath = Path.Combine(uploadsHistoryFolderPath, fileHistoryName);

                if (!Directory.Exists(uploadsHistoryFolderPath))
                {
                    Directory.CreateDirectory(uploadsHistoryFolderPath);
                }

                using (var stream = new FileStream(fileHistoryPath, FileMode.Create))
                {
                    await newImageFile.CopyToAsync(stream);
                }
                imageForHistory = Path.Combine("Public", "BlogHistory", fileHistoryName);
            }

            var updateHistoryEntry = new BlogHistory
            {
                UserId = blogRequest.UserId,
                BlogTitle = blogRequest.Title,
                BlogHistoryImage = imageForHistory,
                BlogContent = blogRequest.Content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.BlogHistory.Add(updateHistoryEntry);

            blog.Title = blogRequest.Title;
            blog.Content = blogRequest.Content;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BlogWithUserRequest>> GetRecentBlogsAsync()
        {
            DateTime oneWeekAgo = DateTime.UtcNow.AddDays(-7);

            return await _context.Blogs
                .Include(b => b.User)
                .Where(b => b.CreatedAt >= oneWeekAgo)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BlogWithUserRequest
                {
                    Id = b.Id,
                    Title = b.Title,
                    Content = b.Content,
                    CreatedAt = b.CreatedAt,
                    Image = b.Image,
                    UserId = b.UserId,
                    UserFirstName = b.User.FirstName,
                    UserLastName = b.User.LastName
                })
                .ToListAsync();
        }

        public async Task DeleteBlogAsync(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                throw new ArgumentException("Blog not found.");

            if (!string.IsNullOrEmpty(blog.Image))
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), blog.Image);
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                }
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
        }

    }
}
