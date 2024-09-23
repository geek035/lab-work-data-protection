namespace Backend.models;

public class HttpBodyResponse
{
    public required UserDTO User { get; set; }
    public required string Token { get; set; }

}