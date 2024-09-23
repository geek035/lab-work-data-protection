namespace Backend.interfaces;

public interface IGenerationKeyService
{
    string GenerateSecureKey(int length = 32);
}