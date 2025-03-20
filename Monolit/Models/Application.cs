using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolit.Models;

[Table("Applications", Schema = "Support")]
public class Application
{
    [Key]
    public int Id { get; set; }

    [MaxLength(250)]
    public string Name { get; set; }
}