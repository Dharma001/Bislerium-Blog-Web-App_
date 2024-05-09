using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;
using backend.Services;
using backend.Contract;

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
        private readonly ICommentVoteService _commentVoteService;

        public HomeController(IBlogService blogService, ICommentVoteService commentVoteService , IHomeService homeService, IBlogVoteService blogVoteService, ICommentService commentService)
        {
            _blogService = blogService;
            _homeService = homeService;
            _blogVoteService = blogVoteService;
            _commentService = commentService;
            _commentVoteService = commentVoteService;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs(string? sortBy = null, string? order = null, string? searchQuery = null, int page = 1, int pageSize = 10)
        {
            try
            {
                var blogs = await _blogService.GetAllBlogsAsync(sortBy, order, searchQuery, page, pageSize);
                return Ok(blogs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
        [HttpGet("{blogId}/{commentId}/upvotes")]
        public async Task<IActionResult> GetCommentUpvoteCount(int commentId, int blogId)
        {
            var count = await _commentVoteService.GetUpvoteCount(commentId, blogId);
            return Ok(count);
        }

        [HttpGet("{blogId}/{commentId}/downvotes")]
        public async Task<IActionResult> GetCommentDownvoteCount(int commentId, int blogId)
        {
            var count = await _commentVoteService.GetDownvoteCount(commentId, blogId);
            return Ok(count);
        }

        [HttpGet("{userId}/{commentId}/{blogId}/IsDownvoted")]
        public async Task<IActionResult> IsUpvoted(int userId, int commentId, int blogId)
        {
            var isUpvoted = await _commentVoteService.IsUpvoted(userId, commentId, blogId);
            return Ok(isUpvoted);
        }

        [HttpGet("{userId}/{commentId}/{blogId}/IsUpvoted")]
        public async Task<IActionResult> IsDownvoted(int userId, int commentId, int blogId)
        {
            var isDownvoted = await _commentVoteService.IsDownvoted(userId, commentId, blogId);
            return Ok(isDownvoted);
        }
        [HttpGet("{blogId}/comment/count")]
        public async Task<IActionResult> GetTotalCommentCount(int blogId)
        {
            var count = await _commentVoteService.GetTotalCommentCount(blogId);
            return Ok(count);
        }
    }
}