using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("Ticket", Schema = "Support")]
    public class Ticket
    {
        [Key]
        public long Id { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; } = string.Empty;

        
        public string? Description { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public bool? Deleted { get; set; }
        public int UserId { get; set; }


        // Посилання на таблицю користувача
        [Required]
        [MaxLength(50)]
        [ForeignKey("User")]
        public string UserOID { get; set; }
        public virtual User? User { get; set; }
        public string? CreatedByOID { get; set; }

        // Посилання на пріоритет
        public int PriorityId { get; set; }
        public virtual Priority? Priority { get; set; }
        
        public int ApplicationId { get; set; }

        // Додаємо навігаційну властивість
        [ForeignKey(nameof(ApplicationId))]
        public virtual Application Application { get; set; }

        // Посилання на статус
        public int StatusId { get; set; }
        public virtual Status? Status { get; set; }

        // Посилання на тип тикета
        public int TicketTypeId { get; set; }
        public virtual TicketType? TicketType { get; set; }

        // Нове посилання на InstalledEnvironment
        public int InstalledEnvironmentId { get; set; }
        public virtual InstalledEnvironment? InstalledEnvironment { get; set; }
    }
}