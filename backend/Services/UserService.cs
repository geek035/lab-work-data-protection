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
        var newUser = convertToAPIUserData(user);

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

    public void UpdateUser(UserDTO updatedUser) {
        _userRepository.UpdateUser(convertToAPIUserData(updatedUser));
    }

    public UserDTO? GetUserByUsername(byte[] username) {
        var user =  _userRepository.LoadSpecificUser(username);
        if (user == null) { return null; }
        return convertFromAPIUserData(user);
    }

    private UserModel convertToAPIUserData(UserDTO user) {
        return new UserModel
        {
            Username = Convert.FromBase64String(user.username),
            Password = user.password,
            PasswordLength = user.PasswordLength,
            IsAdminLocked = user.IsAdminLocked,
            IsPasswordRestricted = user.IsPasswordRestricted
        };
    }

    private UserDTO convertFromAPIUserData(UserModel user) {
        return new UserDTO
        {
            username = Encoding.UTF8.GetString(user.Username),
            password = user.Password,
            PasswordLength = user.PasswordLength,
            IsAdminLocked = user.IsAdminLocked,
            IsPasswordRestricted = user.IsPasswordRestricted
        };
    }
}