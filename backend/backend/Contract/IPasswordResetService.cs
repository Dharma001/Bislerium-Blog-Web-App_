

namespace backend.Contract
{
    public interface IPasswordResetService
    {
        Task<string> GeneratePasswordResetTokenAsync(string email);
        Task<bool> VerifyPasswordResetTokenAsync(string userId, string resetToken);
        Task<bool> ResetPasswordAsync(string userId, string newPassword);
        Task SendResetPasswordEmailAsync(string email, string resetToken);
    }
}
