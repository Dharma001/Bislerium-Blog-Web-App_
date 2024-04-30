namespace backend.Models
{
    public class CommentVote
    {
        public int UserId { get; set; }
        public int BlogId { get; set; }
        public int CommentId { get; set; }
        public Comment Comment { get; set; }
        public Blog Blog { get; set; }
        public bool IsUpvote { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
