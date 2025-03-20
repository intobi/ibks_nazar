namespace Monolit.DTOs
{
    public class TicketListItemDto
    {
        public string Id { get; set; }
        public int PriorityLvlId { get; set; }
        public string Title { get; set; }
        public string Module { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}