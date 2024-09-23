using Backend.models;

namespace Backend.interfaces;

public interface IUserAuthenticationService
{
    AuthenticationResult Authenticate(string username, string password);
}