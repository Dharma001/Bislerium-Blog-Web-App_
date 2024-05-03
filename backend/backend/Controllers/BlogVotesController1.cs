using System.Threading.Tasks;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("user/api/[controller]")]
    public class BlogVotesController : ControllerBase
    {
        private readonly IBlogVoteService _blogVoteService;

        public BlogVotesController(IBlogVoteService blogVoteService)
        {
            _blogVoteService = blogVoteService;
        }

        [HttpPost("{userId}/{blogId}/upvote")]
        public async Task<IActionResult> AddUpvote(int userId, int blogId)
        {
            var success = await _blogVoteService.AddUpvote(userId, blogId);
            return success ? Ok() : BadRequest();
        }

        [HttpPost("{userId}/{blogId}/downvote")]
        public async Task<IActionResult> AddDownvote(int userId, int blogId)
        {
            var success = await _blogVoteService.AddDownvote(userId, blogId);
            return success ? Ok() : BadRequest();
        }

        [HttpDelete("{userId}/{blogId}")]
        public async Task<IActionResult> RemoveVote(int userId, int blogId)
        {
            var success = await _blogVoteService.RemoveVote(userId, blogId);
            return success ? Ok() : NotFound();
        }
    }
}
