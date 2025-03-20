using Monolit.Models;

namespace Monolit.Interfaces.Repository;

public interface IUsersRepository
{
    Task<User> GetRandomUser();
}