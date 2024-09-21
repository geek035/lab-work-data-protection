namespace Backend.models;

public class UserDTO {
    public required string username { get; set; }
    public required byte[] password { get; set; }
    public int PasswordLength { get; set; }
    public bool IsAdminLocked { get; set; }
    public bool IsPasswordRestricted {get; set; }
}