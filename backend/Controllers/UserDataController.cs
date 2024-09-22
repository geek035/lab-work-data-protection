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

    public UsersController(
        IUserService userService, 
        IValidator<LoginRequest> loginRequestValidator,
        IUserAuthenticationService userAuthenticationService)
    {
        _userService = userService;
        _loginRequestValidator = loginRequestValidator;
        _authenticationService = userAuthenticationService;
    }

    // GET: api/users
    [HttpGet]
    public ActionResult<IEnumerable<UserDTO>> GetAllUser()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpPost("login")]
    public ActionResult<UserDTO> Login([FromBody] LoginRequest loginRequest )
    {
        var validationResult = _loginRequestValidator.Validate(loginRequest);
        
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var status = _authenticationService.Authenticate(loginRequest.Username, loginRequest.Password);

        if (status == 404)
        {
            return NotFound("User not found");
        }

        if (status == 401)
        {
            return Unauthorized("Invalid credentials");
        }

        return Ok();
    }
}
