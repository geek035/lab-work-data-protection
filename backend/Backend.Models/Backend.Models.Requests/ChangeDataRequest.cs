namespace Backend.modelsl;

public class ChangeDataRequest
{
    public required string Username { get; set; }
    public bool? IsAdminLocked { get; set; }
    public bool? IsPasswordRestricted { get; set; }
    
}