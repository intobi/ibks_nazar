using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models
{
    [Table("InstalledEnvironment", Schema = "Support")]
    public class InstalledEnvironment
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(250)]
        public string? Title { get; set; }
    }
}