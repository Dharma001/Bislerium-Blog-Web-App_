namespace backend.Models.Requests
{
    public class Top10Blogs
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UpvoteCount { get; set; }
    }
}
