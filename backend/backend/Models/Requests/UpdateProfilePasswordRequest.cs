namespace backend.Models.Requests
{
    public class UpdateProfilePasswordRequest
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

}
