using backend.Contract;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Requests.Users;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordResetController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;

        public PasswordResetController(IPasswordResetService passwordResetService)
        {
            _passwordResetService = passwordResetService;
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
        {
            string resetToken = await _passwordResetService.GeneratePasswordResetTokenAsync(request.Email);
            await _passwordResetService.SendResetPasswordEmailAsync(request.Email, resetToken);
            return Ok(new { Message = "Password reset email sent successfully" });
        }

        [HttpPatch("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            bool tokenVerified = await _passwordResetService.VerifyPasswordResetTokenAsync(request.UserId, request.ResetToken);
            if (!tokenVerified)
            {
                return BadRequest("Invalid reset token");
            }

            bool passwordReset = await _passwordResetService.ResetPasswordAsync(request.UserId, request.NewPassword);
            if (!passwordReset)
            {
                return StatusCode(500, "Failed to reset password");
            }

            return Ok("Password reset successfully");
        }
    }
}
