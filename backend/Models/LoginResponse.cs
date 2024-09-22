namespace Backend.models;

public class LoginResponse
{
    public required UserDTO User { get; set; }
    public required string Token { get; set; }

}