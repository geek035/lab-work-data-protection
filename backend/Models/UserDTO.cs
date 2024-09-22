namespace Backend.models;

public class UserDTO {
    public required string username { get; set; }
    public bool IsAdminLocked { get; set; }
    public bool IsPasswordRestricted {get; set; }
}