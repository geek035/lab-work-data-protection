namespace Backend.models;

public class UserDTO {
    public required string username { get; set; }
    public required bool IsAdminLocked { get; set; }
    public required bool IsPasswordRestricted {get; set; }
}