namespace backend.Models.Requests.Users
{
    public class ResetPasswordRequest
    {
        public string UserId { get; set; }
        public string ResetToken { get; set; }
        public string NewPassword { get; set; }
    }
}
