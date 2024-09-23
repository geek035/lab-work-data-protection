namespace Backend.repositories;
using Backend.interfaces;
using Backend.models;
using System.IO;
using System.Text;

internal class FileUserRepository : IUserRepository
{
    private readonly string _filepath;

    public FileUserRepository(string filepath)
    {
        _filepath = filepath;
        InitializeFile();
    }

    private void InitializeFile()
    {

        if (File.Exists(_filepath))
        {
            File.Delete(_filepath);
        }

        try
        {
            using FileStream fs = new FileStream(_filepath, FileMode.CreateNew, FileAccess.Write);
            using StreamWriter writer = new StreamWriter(fs, Encoding.UTF8);

            // Создаем объект администратора с пустым паролем
            var adminUser = new UserModel
            {
                Username = Encoding.UTF8.GetBytes("admin"),
                Password = new byte[0], // Пустой пароль
                PasswordLength = 0,
                IsAdminLocked = false,
                IsPasswordRestricted = false
            };

            // Записываем данные в файл
            string userData = $"{Encoding.UTF8.GetString(adminUser.Username)},"
                            + $"{Encoding.UTF8.GetString(adminUser.Password)},"
                            + $"{adminUser.PasswordLength},"
                            + $"{adminUser.IsAdminLocked},"
                            + $"{adminUser.IsPasswordRestricted}";
            
            writer.WriteLine(userData);
            writer.Flush(); // Явная запись данных на диск
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error writing to file: {ex.Message}");
        }
    }

    public void SaveUser(UserModel user)
    {
        using (FileStream fs = new FileStream(_filepath, FileMode.Append, FileAccess.Write))
        using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
        {
            string userData = $"{Encoding.UTF8.GetString(user.Username)},"
                            + $"{Encoding.UTF8.GetString(user.Password)},"
                            + $"{user.PasswordLength},"
                            + $"{user.IsAdminLocked},"
                            + $"{user.IsPasswordRestricted}";
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
                    Username = Encoding.UTF8.GetBytes(data[0]),
                    Password = Encoding.UTF8.GetBytes(data[1]),
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
                string userData = $"{Encoding.UTF8.GetString(user.Username)},"
                            + $"{Encoding.UTF8.GetString(user.Password)},"
                            + $"{user.PasswordLength},"
                            + $"{user.IsAdminLocked},"
                            + $"{user.IsPasswordRestricted}";

                writer.WriteLine(userData);
            }
        }
    }

    public UserModel?  LoadSpecificUser(byte[] username) {
        return LoadUsers().FirstOrDefault(u => u.Username.SequenceEqual(username));
    }
}