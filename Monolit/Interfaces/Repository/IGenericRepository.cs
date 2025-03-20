using System.Linq.Expressions;

namespace Monolit.Interfaces.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> GetAllByConditionAsync(Expression<Func<T, bool>> condition,
            params Expression<Func<T, object>>[] includes);
        Task<T> GetByIdAsync(object id, params Expression<Func<T, object>>[] includes);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task<int> GetAllCountAsync();
    }
}