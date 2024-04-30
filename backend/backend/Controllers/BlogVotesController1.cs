using System.Threading.Tasks;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogVotesController : ControllerBase
    {
        private readonly IBlogVoteService _blogVoteService;

        public BlogVotesController(IBlogVoteService blogVoteService)
        {
            _blogVoteService = blogVoteService;
        }

        [HttpPost("{userId}/{blogId}/{isUpvote}")]
        public async Task<IActionResult> AddOrUpdateVote(int userId, int blogId, bool isUpvote)
        {
            var success = await _blogVoteService.AddVote(userId, blogId, isUpvote);
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
