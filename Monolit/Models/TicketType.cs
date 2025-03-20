using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("TicketType", Schema = "Support")]
    public class TicketType
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(250)]
        public string? Title { get; set; }
    }
}