using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Requests
{
    public class BlogRequest
    {
        public int UserId { get; set; }
        public string Title { get; set; }

        [Column(TypeName = "text")]
        public string Content { get; set; }
        public string Image { get; set; }
    }
}
