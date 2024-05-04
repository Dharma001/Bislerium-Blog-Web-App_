using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;
using backend.Services;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly IHomeService _homeService;
        private readonly IBlogVoteService _blogVoteService;
        private readonly ICommentService _commentService;

        public HomeController(IBlogService blogService, IHomeService homeService, IBlogVoteService blogVoteService, ICommentService commentService)
        {
            _blogService = blogService;
            _homeService = homeService;
            _blogVoteService = blogVoteService;
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            return Ok(blogs);
        }

        [HttpGet("{blogId}/upvotes")]
        public async Task<ActionResult<int>> GetUpvoteCount(int blogId)
        {
            var upvoteCount = await _blogVoteService.GetUpvoteCount(blogId);
            return Ok(upvoteCount);
        }

        [HttpGet("comment/{blogId}")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByBlogId(int blogId)
        {
            var comments = await _commentService.GetCommentsByBlogId(blogId);
            if (comments == null || comments.Count == 0)
            {
                return NotFound("No comments found for this blog.");
            }
            return Ok(comments);
        }
        [HttpGet("{userId}/{blogId}/IsUpvoted")]
        public async Task<IActionResult> IsUpvoted(int userId, int blogId)
        {
            var isUpvoted = await _blogVoteService.IsUpvoted(userId, blogId);
            if (isUpvoted.HasValue)
            {
                return Ok(isUpvoted.Value);
            }
            return NotFound();
        }

        [HttpGet("recent")]
        public async Task<ActionResult<IEnumerable<BlogWithUserRequest>>> GetRecentBlogs()
        {
            var recentBlogs = await _blogService.GetRecentBlogsAsync();
            return Ok(recentBlogs);
        }

        [HttpGet("{userId}/{blogId}/IsDownvoted")]
        public async Task<IActionResult> IsDownvoted(int userId, int blogId)
        {
            var isDownvoted = await _blogVoteService.IsDownvoted(userId, blogId);
            if (isDownvoted.HasValue)
            {
                return Ok(isDownvoted.Value);
            }
            return NotFound();
        }

        [HttpGet("{blogId}/downvotes")]
        public async Task<ActionResult<int>> GetDownvoteCount(int blogId)
        {
            var downvoteCount = await _blogVoteService.GetDownvoteCount(blogId);
            return Ok(downvoteCount);
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