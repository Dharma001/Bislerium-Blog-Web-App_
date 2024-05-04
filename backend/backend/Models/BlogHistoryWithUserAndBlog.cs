using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BlogHistoryWithUserAndBlog
    {
        public int Id { get; set; }

        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Image { get; set; }

        public string BlogTitle { get; set; }

        [Column(TypeName = "text")]
        public string BlogContent { get; set; }
    }
}
