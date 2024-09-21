namespace Backend.repositories;
using Backend.interfaces;
using Backend.models;
using System.IO;
using System.Text;

public class MockUserRepository : IUserRepository
{
    private readonly List<UserModel> _users;

    public MockUserRepository()
    {
        _users = new List<UserModel>
        {
            new UserModel
            {
                Username = Encoding.UTF8.GetBytes("user1"),
                Password = Convert.FromBase64String("cGFzc3dvcmQx"), // "password1" в Base64
                PasswordLength = 10,
                IsAdminLocked = false,
                IsPasswordRestricted = true
            },
            new UserModel
            {
                Username = Encoding.UTF8.GetBytes("user2"),
                Password = Convert.FromBase64String("cGFzc3dvcmQy"), // "password2" в Base64
                PasswordLength = 10,
                IsAdminLocked = true,
                IsPasswordRestricted = false
            },
            new UserModel
            {
                Username = Encoding.UTF8.GetBytes("user3"),
                Password = Convert.FromBase64String("cGFzc3dvcmQz"), // "password3" в Base64
                PasswordLength = 10,
                IsAdminLocked = false,
                IsPasswordRestricted = true
            }
        };
    }

    public void SaveUser(UserModel user)
    {
        // Логика сохранения пользователя (можно оставить пустым для мок-данных)
    }

    public List<UserModel> LoadUsers()
    {
        return _users;
    }

    public void UpdateUser(UserModel updatedUser)
    {
        // Логика обновления пользователя (можно оставить пустым для мок-данных)
    }

    public UserModel LoadSpecificUser(byte[] username)
    {
        return _users[0];
    } 
}
