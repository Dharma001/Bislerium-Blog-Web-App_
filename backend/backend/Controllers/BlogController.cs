using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly IBlogHistoryService _blogHistoryService;

        public BlogController(IBlogService blogService, IBlogHistoryService blogHistoryService)
        {
            _blogService = blogService;
            _blogHistoryService = blogHistoryService;
            _blogHistoryService = blogHistoryService;
        }

        [HttpGet("api/[controller]")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            return Ok(blogs);
        }

        [HttpGet("api/[controller]/{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return Ok(blog);
        }

        [HttpPost("user/api/[controller]")]
        public async Task<ActionResult<Blog>> CreateBlog([FromForm] BlogRequest blogRequest, [FromForm] IFormFile imageFile)
        {
            var blog = await _blogService.CreateBlogAsync(blogRequest, imageFile);
            return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
        }

        [HttpPut("user/api/[controller]/{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogRequest blogRequest, [FromForm] IFormFile imageFile)
        {
            await _blogService.UpdateBlogAsync(id, blogRequest, imageFile);
            return NoContent();
        }

        [HttpDelete("user/api/[controller]/{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            await _blogService.DeleteBlogAsync(id);
            return NoContent();
        }

        [HttpGet("api/history/{userId}")]
        public async Task<ActionResult<List<BlogHistory>>> GetBlogHistory(int userId)
        {
            try
            {
                var blogHistory = await _blogHistoryService.GetBlogHistoryWithUserAndBlogByUserId(userId);
                return Ok(blogHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
