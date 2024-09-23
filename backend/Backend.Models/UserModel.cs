namespace Backend.models;

public class UserModel {
    public required byte[] Username { get; set; }
    public required byte[] Password { get; set; }
    public int PasswordLength { get; set; }
    public bool IsAdminLocked { get; set; }
    public bool IsPasswordRestricted {get; set; }
}