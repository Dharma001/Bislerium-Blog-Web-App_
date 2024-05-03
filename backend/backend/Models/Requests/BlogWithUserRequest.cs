namespace backend.Models.Requests
{
    public class BlogWithUserRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string Image { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }
}
