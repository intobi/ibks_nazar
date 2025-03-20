namespace Monolit.DTOs;

public class TicketUpdateDto
{
    public long Id { get; set; }
    public string? Description { get; set; }
    public string? Title { get; set; }
    public int? TypeId { get; set; }
    public int? StatusId { get; set; }
    public int? PriorityLvlId { get; set; }
    public int? ModuleId { get; set; }
}