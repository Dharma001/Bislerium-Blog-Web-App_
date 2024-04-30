using backend.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

public class Blog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }

    [Column(TypeName = "text")]
    public string Content { get; set; }
    public string Image { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public User User { get; set; }
    public ICollection<BlogVote> BlogVotes { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<CommentVote> CommentVotes { get; set; }

    public Blog()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }
}
