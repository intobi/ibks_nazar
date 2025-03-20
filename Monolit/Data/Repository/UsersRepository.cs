using Microsoft.EntityFrameworkCore;
using Monolit.Interfaces.Repository;
using Monolit.Models;

namespace Monolit.Data.Repository;

public class UsersRepository : GenericRepository<User>, IUsersRepository
{
    public UsersRepository(ApplicationDbContext context)
        : base(context)
    {
    }
    
    public async Task<User> GetRandomUser()
    {
        return await DbSet.FirstAsync();
    }
}