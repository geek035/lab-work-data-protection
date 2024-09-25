using Backend.models;
using Backend.modelsl;

namespace Backend.interfaces;

public interface IUserService {
    void RegisterUser(string user);
    List<UserDTO> GetAllUsers();
    UserDTO? GetUserByUsername(string username);
    public void UpdateUser(ChangeDataRequest data);
    public void UpdatePassword(ChangePasswordRequest data);
    public bool checkPassword(string username, string password);
}