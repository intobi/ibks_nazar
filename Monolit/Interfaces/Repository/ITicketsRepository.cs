using Monolit.Models;

namespace Monolit.Interfaces.Repository
{
    public interface ITicketsRepository : IGenericRepository<Ticket>
    {
        Task<IEnumerable<Ticket>> GetTicketsWithDetailsAsync(int page, int limit);
        Task<Ticket?> GetTicketById(long id);
    }
}