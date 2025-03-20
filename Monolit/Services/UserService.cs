using Monolit.Data.Repository;
using Monolit.Interfaces;
using Monolit.Interfaces.Repository;

namespace Monolit.Services;

public class UserService: IUserService
{
    private readonly IUsersRepository _usersRepository;
    
    public UserService(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }
    
    public async Task<string> GetRandomUserId()
    {
        var user = await _usersRepository.GetRandomUser();
        return user.Id;
    }
}