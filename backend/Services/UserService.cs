using System.Text;
using Backend.models;
using Backend.interfaces;

namespace Backend.services;

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;
    public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public void RegisterUser(UserDTO user) {
        var newUser = convertToAPIUserData(user, null);

        _userRepository.SaveUser(newUser);
    }

    public List<UserDTO> GetAllUsers() {
        var users =  _userRepository.LoadUsers();
        List<UserDTO> data = [];

        for (var i = 0; i < users.Count; i++) {
            data.Add(convertFromAPIUserData(users[i]));
        }
        return data;
    }

    public void UpdateUser(UserDTO updatedUser, string? password) {
        _userRepository.UpdateUser(convertToAPIUserData(updatedUser, password));
    }

    public UserDTO? GetUserByUsername(string username) {
        var user =  _userRepository.LoadSpecificUser(Encoding.UTF8.GetBytes(username));
        if (user == null) { return null; }
        return convertFromAPIUserData(user);
    }

    private UserModel convertToAPIUserData(UserDTO user, string? password) {
        var pswrd = password != null ? Encoding.UTF8.GetBytes(password) : Array.Empty<byte>();
        return new UserModel
        {
            Username = Encoding.UTF8.GetBytes(user.username),
            Password = pswrd,
            PasswordLength = password?.Length ?? 0,
            IsAdminLocked = user.IsAdminLocked,
            IsPasswordRestricted = user.IsPasswordRestricted
        };
    }

    private UserDTO convertFromAPIUserData(UserModel user) {
        return new UserDTO
        {
            username = Encoding.UTF8.GetString(user.Username),
            IsAdminLocked = user.IsAdminLocked,
            IsPasswordRestricted = user.IsPasswordRestricted
        };
    }
}