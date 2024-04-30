using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly IHomeService _homeService;

        public HomeController(IBlogService blogService, IHomeService homeService)
        {
            _blogService = blogService;
            _homeService = homeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            return Ok(blogs);
        }
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _homeService.GetUserById(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPatch("users/{id}")]
        public async Task<IActionResult> UpdateUserProfile(int id, ProfileUserRequest profileUserRequest)
        {
            var updatedUser = await _homeService.UpdateUserProfile(id, profileUserRequest);

            if (updatedUser == null)
                return NotFound();

            return Ok(updatedUser);
        }
    }
}