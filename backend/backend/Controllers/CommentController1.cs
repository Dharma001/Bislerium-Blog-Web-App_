﻿using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using backend.Models.Requests;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("{userId}/{blogId}")]
        public async Task<IActionResult> AddComment(int userId, int blogId, string content)
        {
            var comment = await _commentService.AddComment(userId, blogId, content);
            return Ok(comment);
        }

        [HttpPatch("{commentId}/{userId}/{blogId}")]
        [Authorize]
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
        [Authorize]
        public async Task<IActionResult> DeleteComment(int commentId, int userId, int blogId)
        {
            var deletedComment = await _commentService.DeleteComment(commentId, userId, blogId);
            if (deletedComment == null)
            {
                return NotFound();
            }

            return Ok(deletedComment);
        }

    }
}