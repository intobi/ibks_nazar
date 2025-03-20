using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Monolit.Interfaces.Repository;

namespace Monolit.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        protected readonly DbSet<T> DbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            DbSet = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes)
        {
            var query = DbSet.AsNoTracking();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            
            return await query.ToListAsync();
        }
        
        public async Task<IEnumerable<T>> GetAllByConditionAsync(Expression<Func<T, bool>> condition,
            params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = DbSet;

            query = query.Where(condition);

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public async Task<T> GetByIdAsync(object id, params Expression<Func<T, object>>[] includes)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await DbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            DbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetAllCountAsync()
        {
            return await DbSet.CountAsync();
        }

        public async Task DeleteAsync(object id)
        {
            T entity = await DbSet.FindAsync(id);
            if (entity != null)
            {
                DbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}