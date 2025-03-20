namespace Monolit.DTOs;

public class TicketCreateDto
{
    public string Description { get; set; }
    public string Title { get; set; }
    public int TypeId { get; set; }
    public int StatusId { get; set; }
    public int PriorityLvlId { get; set; }
    public int ModuleId { get; set; }
}