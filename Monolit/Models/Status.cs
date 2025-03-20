using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("Status", Schema = "Support")]
    public class Status
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(250)]
        public string? Title { get; set; }
    }
}