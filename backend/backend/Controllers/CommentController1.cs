using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using backend.Models.Requests;
using backend.Contract;
using backend.Models;

namespace backend.Controllers
{
    [Route("user/api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly ICommentHistoryService _commentHistoryService;

        public CommentController(ICommentService commentService, ICommentHistoryService commentHistoryService)
        {
            _commentService = commentService;
            _commentHistoryService = commentHistoryService;
        }

        [HttpPost("{userId}/{blogId}")]
        public async Task<IActionResult> AddComment(int userId, int blogId, string content)
        {
            var comment = await _commentService.AddComment(userId, blogId, content);
            return Ok(comment);
        }

        [HttpPatch("{commentId}/{userId}/{blogId}")]
        public async Task<IActionResult> PatchComment(int commentId, int userId, int blogId, [FromBody] CommentRequest commentRequest)
        {
            if (commentRequest == null)
            {
                return BadRequest();
            }

            var existingComment = await _commentService.GetComment(commentId, userId, blogId);
            if (existingComment == null)
            {
                return NotFound();
            }

            var updatedComment = await _commentService.UpdateComment(commentId, userId, blogId, commentRequest);
            if (updatedComment == null)
            {
                return NotFound();
            }

            return Ok(updatedComment);
        }


        [HttpDelete("{commentId}/{userId}/{blogId}")]
        public async Task<IActionResult> DeleteComment(int commentId, int userId, int blogId)
        {
            var deletedComment = await _commentService.DeleteComment(commentId, userId, blogId);
            if (deletedComment == null)
            {
                return NotFound();
            }

            return Ok(deletedComment);
        }
        [HttpGet("CommentHistory/{userId}")]
        public async Task<IActionResult> GetCommentHistoryByUserId(int userId)
        {
            try
            {
                var comments = await _commentHistoryService.GetCommentHistoryWithUserAndBlogByUserId(userId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
