namespace Backend.models;

using System.Text;
using Backend.interfaces;

public class UserAuthenticationService : IUserAuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly IUserService _userService;

    public UserAuthenticationService(
        IUserRepository userRepository,
        IUserService userService)
    {
        _userRepository = userRepository;
        _userService = userService;
    }

    public AuthenticationResult Authenticate(string username, string password)
    {
        var user = _userRepository.LoadSpecificUser(Encoding.UTF8.GetBytes(username));

        if (user == null)
        {
            return new AuthenticationResult { IsSuccessful = false, ErrorMessage = "User not found" };
        }

        if(user.IsAdminLocked)
        {
            return new AuthenticationResult { IsSuccessful = false, ErrorMessage = "Blocked by admin" };
        }

        if (!_userService.checkPassword(username, password))
        {
            return new AuthenticationResult { IsSuccessful = false, ErrorMessage = "Invalid password" };
        }

        return new AuthenticationResult { IsSuccessful = true };
    }
}