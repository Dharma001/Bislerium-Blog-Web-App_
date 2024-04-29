using System.Collections.Generic;
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
    public class HomeService : IHomeService
    {
        private readonly applicationContext _context;
        private readonly IConfiguration _configuration;

        public HomeService(applicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Blog>> GetAllBlogsAsync()
        {
            return await _context.Blogs.ToListAsync();
        }

    }
}