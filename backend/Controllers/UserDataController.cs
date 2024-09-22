using Backend.models;
using Backend.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using FluentValidation;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController: ControllerBase
{
    private readonly IUserService _userService;
    private readonly IValidator<LoginRequest> _loginRequestValidator;
    private readonly IUserAuthenticationService _authenticationService;
    private readonly IGenerationTokenService _generationTokenService;

    public UsersController(
        IUserService userService, 
        IValidator<LoginRequest> loginRequestValidator,
        IUserAuthenticationService userAuthenticationService,
        IGenerationTokenService generationTokenService)
    {
        _userService = userService;
        _loginRequestValidator = loginRequestValidator;
        _authenticationService = userAuthenticationService;
        _generationTokenService = generationTokenService;
    }

    // GET: api/users
    [HttpGet]
    public ActionResult<IEnumerable<UserDTO>> GetAllUser()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest loginRequest )
    {
        var validationResult = _loginRequestValidator.Validate(loginRequest);
        
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var result = _authenticationService.Authenticate(loginRequest.Username, loginRequest.Password);

        if (result.IsSuccessful)
        {
            var user = _userService.GetUserByUsername(loginRequest.Username);

            if (user == null) { return NotFound("User not found"); }

            var token = _generationTokenService.GenerateJwtToken(user);

            return Ok(new LoginResponse
            {
                User = user,
                Token = token
            });
        }

        return result.ErrorMessage switch
        {
            "User not found" => NotFound(result.ErrorMessage),
            "Invalid password" => Unauthorized(result.ErrorMessage),
            _ => BadRequest("An error occurred"),
        };
    }
}
