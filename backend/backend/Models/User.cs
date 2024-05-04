namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; } 
        public int RoleId { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public Role Role { get; set; }
        public ICollection<Blog> Blogs { get; set; }
        public ICollection<BlogHistory> BlogHistory { get; set; }
        public ICollection<BlogVote> BlogVotes { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<CommentVote> CommentVotes { get; set; }

    }
}
