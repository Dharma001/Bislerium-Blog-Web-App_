namespace backend.Models.Requests
{
    public class BlogVoteRequest
    {
            public int Id { get; set; }
            public int UserId { get; set; }
            public int BlogId { get; set; }
            public Blog Blog { get; set; }
            public bool IsUpvote { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
        }
}
