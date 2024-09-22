namespace Backend.models;

using System.Text;
using Backend.interfaces;

public class UserAuthenticationService : IUserAuthenticationService
{
    private readonly IUserRepository _userRepository;

    public UserAuthenticationService(
        IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public AuthenticationResult Authenticate(string username, string password)
    {
        var user = _userRepository.LoadSpecificUser(Encoding.UTF8.GetBytes(username));

        if (user == null)
        {
            return new AuthenticationResult { IsSuccessful = false, ErrorMessage = "User not found" };
        }

        if (!user.Password.SequenceEqual(Encoding.UTF8.GetBytes(password)))
        {
            return new AuthenticationResult { IsSuccessful = false, ErrorMessage = "Invalid password" };
        }

        return new AuthenticationResult { IsSuccessful = true };
    }
}