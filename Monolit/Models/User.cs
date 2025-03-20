using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("User", Schema = "Support")]
    public class User
    {
        [Key]
        [MaxLength(50)]
        [Column("OID")]
        public string  Id { get; set; }

        [MaxLength(50)]
        public string? DisplayName { get; set; }

        [MaxLength(50)]
        public string? Email { get; set; }

        [MaxLength(50)]
        public string? FullName { get; set; }

        public DateTime? LastScannedUtc { get; set; }
    }
}