using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Role
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
