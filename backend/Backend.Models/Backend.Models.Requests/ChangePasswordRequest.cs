namespace Backend.models;

public class ChangePasswordRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}