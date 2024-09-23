namespace Backend.models;

public class AuthenticationResult
{
    public bool IsSuccessful { get; set; }
    public string? Token { get; set; }
    public string? ErrorMessage { get; set; }
}