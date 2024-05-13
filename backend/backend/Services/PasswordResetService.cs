using backend.Contract;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.appDbContext;
using Microsoft.EntityFrameworkCore;


namespace backend.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly Dictionary<string, string> _passwordResetTokens;
        private readonly applicationContext _context;


        public PasswordResetService(applicationContext context)
        {
            _passwordResetTokens = new Dictionary<string, string>();
            _context = context;

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
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user != null)
                {
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential("fabricvr411@gmail.com", "oumwtosxxjlvxmgt");
                        smtp.EnableSsl = true;
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        MailMessage mail = new MailMessage();
                        mail.From = new MailAddress("fabricvr411@gmail.com");
                        mail.To.Add(email);
                        mail.Subject = "Password Reset";
                        mail.Body = $"To reset your password, click on the following link: http://localhost:5173/forgotPassword";

                        await smtp.SendMailAsync(mail);
                    }
                }
                else
                {
                    // User with the email address doesn't exist, handles this scenario
                    Console.WriteLine($"User with email '{email}' does not exist.");
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
