namespace Backend.interfaces;

public interface IHashingPasswordService
{
    public string HashPassword(string password);
    public bool VerifyPassword(string enteredPassword, string storedPassword);
}