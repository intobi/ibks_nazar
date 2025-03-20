namespace Monolit.DTOs;

public class TicketViewDto
{
    public string Id { get; set; }
    public int PriorityLvlId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string ModuleId { get; set; }
    public string TypeId { get; set; }
    public string StatusId { get; set; }
}