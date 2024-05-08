using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BlogHistory
    {
        public int Id { get; set; } 
        public int UserId { get; set; }
        public string? BlogHistoryImage { get; set; }
        public string BlogTitle { get; set; }

        [Column(TypeName = "text")]
        public string BlogContent { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
