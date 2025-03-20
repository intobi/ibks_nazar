using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("TicketReply", Schema = "Support")]
    public class Reply
    {
        [Key]
        public int ReplyId { get; set; }

        [ForeignKey("Ticket")]
        [Column("TId")]
        public long TicketId { get; set; }

        public Ticket? Ticket { get; set; }

        [Column("Reply")]
        public string? Content { get; set; }

        public DateTime ReplyDate { get; set; } = DateTime.UtcNow;
    }
}