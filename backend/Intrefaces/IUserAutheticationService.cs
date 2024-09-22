namespace Backend.interfaces;
using Backend.models;

public interface IUserAuthenticationService
{
    int Authenticate(string username, string password);
}