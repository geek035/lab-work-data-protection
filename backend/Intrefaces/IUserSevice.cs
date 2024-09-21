using Backend.models;

namespace Backend.interfaces;

public interface IUserService {
    void RegisterUser(UserDTO user);
    List<UserDTO> GetAllUsers();
    UserDTO? GetUserByUsername(byte[] username);
    void UpdateUser(UserDTO updatedUser);
}