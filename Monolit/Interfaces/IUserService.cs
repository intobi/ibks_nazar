namespace Monolit.Interfaces;

public interface IUserService
{
    Task<string> GetRandomUserId();
}