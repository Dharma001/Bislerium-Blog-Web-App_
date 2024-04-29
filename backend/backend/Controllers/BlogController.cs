using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return Ok(blog);
        }

        [HttpPost]
        public async Task<ActionResult<Blog>> CreateBlog([FromForm] BlogRequest blogRequest, [FromForm] IFormFile imageFile)
        {
            var blog = await _blogService.CreateBlogAsync(blogRequest, imageFile);
            return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogRequest blogRequest, [FromForm] IFormFile imageFile)
        {
            await _blogService.UpdateBlogAsync(id, blogRequest, imageFile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            await _blogService.DeleteBlogAsync(id);
            return NoContent();
        }
    }
}
