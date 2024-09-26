using Backend.models;

namespace Backend.interfaces;

public interface IUserRepository {
    void SaveUser(UserModel user);
    List<UserModel> LoadUsers();
    void UpdateUser(UserModel user);
    UserModel? LoadSpecificUser(byte[] username);
    public void UpdateAllUsers(List<UserModel> updatedUsers);
}