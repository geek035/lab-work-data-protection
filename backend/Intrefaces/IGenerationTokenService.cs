using Backend.models;

namespace Backend.interfaces;

public interface IGenerationTokenService
{
    string GenerateJwtToken(UserDTO user);
}