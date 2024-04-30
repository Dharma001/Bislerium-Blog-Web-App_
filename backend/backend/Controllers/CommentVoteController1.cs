using System.Threading.Tasks;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentVotesController : ControllerBase
    {
        private readonly ICommentVoteService _commentVoteService;

        public CommentVotesController(ICommentVoteService commentVoteService)
        {
            _commentVoteService = commentVoteService;
        }

        [HttpPost("{userId}/{blogId}/{commentId}/{isUpvote}")]
        public async Task<IActionResult> AddOrUpdateVote(int userId, int blogId, int commentId, bool isUpvote)
        {
            var success = await _commentVoteService.AddVote(userId, blogId, commentId, isUpvote);
            return success ? Ok() : BadRequest();
        }

        [HttpDelete("{userId}/{blogId}/{commentId}")]
        public async Task<IActionResult> RemoveVote(int userId, int blogId, int commentId)
        {
            var success = await _commentVoteService.RemoveVote(userId, blogId, commentId);
            return success ? Ok() : NotFound();
        }
    }
}
