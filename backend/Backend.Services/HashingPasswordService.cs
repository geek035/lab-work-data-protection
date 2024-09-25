using System.Text;
using Backend.interfaces;

using System.Security.Cryptography;

namespace Backend.services;

internal class HashingPasswordService : IHashingPasswordService
{
    private const string SaltString = "Sol dlya vann. Ne upotreblyat'"; // Фиксированная соль

    // Метод для хеширования пароля с использованием фиксированной соли
    public string HashPassword(string password)
    {

        // Получаем байты из строки соли
        var salt = Encoding.UTF8.GetBytes(SaltString);

        // Хешируем пароль с солью
        byte[] hash = GenerateSha256Hash(password, salt);

        // Возвращаем хешированный пароль в виде строки Base64
        return Convert.ToBase64String(hash);
    }

    // Метод для проверки пароля
    public bool VerifyPassword(string enteredPassword, string storedPasswordHash)
    {
        // Декодируем сохранённый хеш пароля из Base64 строки в массив байтов
        var storedHashBytes = Convert.FromBase64String(storedPasswordHash);

        // Получаем байты из строки соли
        var salt = Encoding.UTF8.GetBytes(SaltString);

        // Хешируем введённый пароль с той же солью
        byte[] enteredPasswordHash = GenerateSha256Hash(enteredPassword, salt);

        // Сравниваем хеши
        return enteredPasswordHash.SequenceEqual(storedHashBytes);
    }

    // Метод для генерации SHA-256 хеша с солью
    private byte[] GenerateSha256Hash(string password, byte[] salt)
    {
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

        // Комбинируем пароль и соль
        byte[] passwordWithSalt = new byte[passwordBytes.Length + salt.Length];
        Array.Copy(passwordBytes, 0, passwordWithSalt, 0, passwordBytes.Length);
        Array.Copy(salt, 0, passwordWithSalt, passwordBytes.Length, salt.Length);

        // Хешируем с использованием SHA-256
        using var sha256 = SHA256.Create();
        return sha256.ComputeHash(passwordWithSalt);
    }
}