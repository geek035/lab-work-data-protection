using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.interfaces;
using Backend.models;
using Microsoft.IdentityModel.Tokens;

namespace Backend.services;

public class GenerationTokenService : IGenerationTokenService
{
    private readonly IConfiguration _configuration;

    public GenerationTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateJwtToken(UserDTO user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = jwtSettings["Key"] ?? "simple_key_large";
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.username), // Преобразуем в строку
            new Claim("IsAdminLocked", user.IsAdminLocked.ToString()),
            new Claim("IsPasswordRestricted", user.IsPasswordRestricted.ToString())
        };

        var lifeTime = jwtSettings["TokenLifetimeMinutes"] ?? "30";
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(double.Parse(lifeTime)),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}