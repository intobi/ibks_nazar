using Monolit.DTOs;

namespace Monolit.Interfaces
{
    public interface ITicketsService
    {
        Task<IEnumerable<TicketListItemDto>> GetAllTickets(int page, int limit);
        Task<TicketViewDto?> GetTicketById(long id);
        Task<TicketViewDto> AddNewTicket(TicketCreateDto ticket, string userOID);
        Task<TicketViewDto> UpdateTicket(TicketUpdateDto ticketDto);
        Task<int> GetTotalTicketsCount();
        Task<IEnumerable<DropdownItemDto>> GetModules();
        Task<IEnumerable<DropdownItemDto>> GetStatuses();
        Task<IEnumerable<DropdownItemDto>> GetPriorities();
        Task<IEnumerable<DropdownItemDto>> GetTicketTypes();
    }
}