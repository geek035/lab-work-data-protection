namespace Backend.models;

using System.Text;
using Backend.interfaces;

public class UserAuthenticationService : IUserAuthenticationService
{
    private readonly IUserRepository _userRepository;

    public UserAuthenticationService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public int Authenticate(string username, string password)
    {
        var user = _userRepository.LoadSpecificUser(Encoding.UTF8.GetBytes(username));

        if (user == null)
        {
            return 404;
        }

        if (user == null || !user.Password.SequenceEqual(Encoding.UTF8.GetBytes(password)))
        {
            return 401;
        }

        return 200;

    }
}