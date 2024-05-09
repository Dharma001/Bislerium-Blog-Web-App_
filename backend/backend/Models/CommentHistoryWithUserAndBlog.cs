using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class CommentHistoryWithUserAndBlog
    {
        public int Id { get; set; }

        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }

        public string BlogTitle { get; set; }

        [Column(TypeName = "text")]
        public string CommentContent { get; set; }
    }
}
