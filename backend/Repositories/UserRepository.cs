namespace Backend.repositories;
using Backend.interfaces;
using Backend.models;
using System.IO;
using System.Text;

public class FileUserRepository : IUserRepository
{
    private readonly string _filepath;

    public FileUserRepository(string filepath)
    {
        _filepath = filepath;
    }

    public void SaveUser(UserModel user)
    {
        using (FileStream fs = new FileStream(_filepath, FileMode.Append, FileAccess.Write))
        using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
        {
            string userData = $"{Convert.ToBase64String(user.Username)},{Convert.ToBase64String(user.Password)},{user.PasswordLength},{user.IsAdminLocked},{user.IsPasswordRestricted}";
            writer.WriteLine(userData);
        }

    }

    public List<UserModel> LoadUsers()
    {
        var users = new List<UserModel>();

        if (!File.Exists(_filepath))
            return users;

        using (FileStream fs = new FileStream(_filepath, FileMode.Open, FileAccess.Read))
        using (StreamReader reader = new StreamReader(fs, Encoding.UTF8))
        {
            string? line;
            while ((line = reader.ReadLine()) != null)
            {
                var data = line.Split(',');
                var user = new UserModel 
                {
                    Username = Convert.FromBase64String(data[0]),
                    Password = Convert.FromBase64String(data[1]),
                    PasswordLength = int.Parse(data[2]),
                    IsAdminLocked = bool.Parse(data[3]),
                    IsPasswordRestricted = bool.Parse(data[4])
                };
                users.Add(user);
            }
        }

        return users;
    }

    public void UpdateUser(UserModel updatedUser)
    {
        var users = LoadUsers();

        for (int i = 0; i < users.Count; i++)
        {
            if (users[i].Username.SequenceEqual(updatedUser.Username))
            {
                users[i] = updatedUser;
                break;
            }
        }

        // Перезаписываем файл со всеми обновленными пользователями
        using (FileStream fs = new FileStream(_filepath, FileMode.Create, FileAccess.Write))
        using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
        {
            foreach (var user in users)
            {
                string userData = $"{Convert.ToBase64String(user.Username)},{Convert.ToBase64String(user.Password)},{user.PasswordLength},{user.IsAdminLocked},{user.IsPasswordRestricted}";
                writer.WriteLine(userData);
            }
        }
    }

    public UserModel?  LoadSpecificUser(byte[] username) {
        return LoadUsers().FirstOrDefault(u => u.Username.SequenceEqual(username));
    }
}