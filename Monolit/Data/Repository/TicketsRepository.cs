using Microsoft.EntityFrameworkCore;
using Monolit.Models;
using Monolit.Interfaces.Repository;

namespace Monolit.Data.Repository
{
    public class TicketsRepository : GenericRepository<Ticket>, ITicketsRepository
    {
        public TicketsRepository(ApplicationDbContext context)
            : base(context)
        {
        }

        public async Task<IEnumerable<Ticket>> GetTicketsWithDetailsAsync(int page, int limit)
        {
            return await DbSet
                .Include(t => t.Priority)
                .Include(t => t.TicketType)
                .Include(t => t.Application)
                .Include(t => t.Status)
                .AsNoTracking()
                .OrderBy(t => t.Id)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();
        }
        
        public async Task<Ticket?> GetTicketById(long id)
        {
            return await DbSet
                .Include(t => t.Priority)
                .Include(t => t.TicketType)
                .Include(t => t.Application)
                .Include(t => t.Status)
                .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}