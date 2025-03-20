using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("Priority", Schema = "Support")]
    public class Priority
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(250)]
        public string? Title { get; set; }
    }
}