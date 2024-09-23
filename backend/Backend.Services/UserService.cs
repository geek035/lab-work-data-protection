using System.Text;
using Backend.models;
using Backend.interfaces;
using Backend.modelsl;

namespace Backend.services;

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;
    public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public void RegisterUser(string username) {
        var newUser = convertToAPIUserData(new UserDTO
        {
            username = username,
            IsAdminLocked = false,
            IsPasswordRestricted = false,
        }, null);

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

    public void UpdateUser(ChangeDataRequest data) {
        var user = GetUserByUsername(data.Username);

        if (user == null) { return; }

        _userRepository.UpdateUser(convertToAPIUserData(new UserDTO
        {
           username = data.Username,
           IsAdminLocked = data?.IsAdminLocked ?? user.IsAdminLocked,
           IsPasswordRestricted = data?.IsPasswordRestricted ?? user.IsPasswordRestricted,
        }, data?.Password));
    }

    public UserDTO? GetUserByUsername(string username) {
        var user =  _userRepository.LoadSpecificUser(Encoding.UTF8.GetBytes(username.ToLower()));
        if (user == null) { return null; }
        return convertFromAPIUserData(user);
    }

    private UserModel convertToAPIUserData(UserDTO user, string? password) {
        var pswrd = password != null ? Encoding.UTF8.GetBytes(password) : Array.Empty<byte>();
        return new UserModel
        {
            Username = Encoding.UTF8.GetBytes(user.username.ToLower()),
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