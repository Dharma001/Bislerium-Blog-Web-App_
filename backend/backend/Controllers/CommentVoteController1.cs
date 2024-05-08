using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Contract;

namespace backend.Controllers
{
    [ApiController]
    [Route("user/api/[controller]")]
    public class CommentVoteController : ControllerBase
    {
        private readonly ICommentVoteService _commentVoteService;

        public CommentVoteController(ICommentVoteService commentVoteService)
        {
            _commentVoteService = commentVoteService;
        }

        [HttpPost("{userId}/{commentId}/{blogId}/upvote")]

        public async Task<IActionResult> Upvote(int userId, int commentId, int blogId)
        {
            var success = await _commentVoteService.AddUpvote(userId, commentId, blogId);
            if (success)
                return Ok();
            else
                return BadRequest("Failed to upvote comment.");
        }

        [HttpPost("{userId}/{commentId}/{blogId}/downvote")]
        public async Task<IActionResult> Downvote(int userId, int commentId, int blogId)
        {
            var success = await _commentVoteService.AddDownvote(userId, commentId, blogId);
            if (success)
                return Ok();
            else
                return BadRequest("Failed to downvote comment.");
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveVote(int userId, int commentId, int blogId)
        {
            var success = await _commentVoteService.RemoveVote(userId, commentId, blogId);
            if (success)
                return Ok();
            else
                return BadRequest("Failed to remove vote.");
        }
    }
}
