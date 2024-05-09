using backend.Contract;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace backend.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly Dictionary<string, string> _passwordResetTokens;

        public PasswordResetService()
        {
            _passwordResetTokens = new Dictionary<string, string>();
        }

        public async Task<string> GeneratePasswordResetTokenAsync(string email)
        {
            string userId = GenerateUserIdFromEmail(email);
            string resetToken = Guid.NewGuid().ToString();
            _passwordResetTokens[userId] = resetToken;
            return resetToken;
        }

        public async Task<bool> VerifyPasswordResetTokenAsync(string userId, string resetToken)
        {
            if (_passwordResetTokens.TryGetValue(userId, out string storedToken) && storedToken == resetToken)
            {
                _passwordResetTokens.Remove(userId);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> ResetPasswordAsync(string userId, string newPassword)
        {
            Console.WriteLine($"Resetting password for user ID: {userId} to {newPassword}");
            return true;
        }

        public async Task SendResetPasswordEmailAsync(string email, string resetToken)

        {
            try
            {
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 465))
                {
                    smtp.Credentials = new NetworkCredential("fabricvr411@gmail.com", "dzpailqdkiuhouty");
                    smtp.EnableSsl = true;

                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress("fabricvr411@gmail.com");
                    mail.To.Add(email);
                    mail.Subject = "Password Reset";
                    mail.Body = $"To reset your password, click on the following link: /reset-password/{resetToken}?email={email}";

                    await smtp.SendMailAsync(mail);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending reset password email: {ex.Message}");
            }
        }

        private string GenerateUserIdFromEmail(string email)
        {
            return email.Replace("@", "_").Replace(".", "_");
        }
    }
}
