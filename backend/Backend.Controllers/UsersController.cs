using Backend.models;
using Backend.interfaces;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using Backend.validators;
using Backend.modelsl;
namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController: ControllerBase
{
    private readonly IUserService _userService;
    private readonly IValidator<LoginRequest> _loginRequestValidator;
    private readonly IUserAuthenticationService _authenticationService;
    private readonly IGenerationTokenService _generationTokenService;
    private readonly IChangeDataRequestValidator<ChangeDataRequest> _changeDataRequestValidator;

    public UsersController(
        IUserService userService, 
        IValidator<LoginRequest> loginRequestValidator,
        IUserAuthenticationService userAuthenticationService,
        IGenerationTokenService generationTokenService,
        IChangeDataRequestValidator<ChangeDataRequest> changeDataRequestValidator)
    {
        _userService = userService;
        _loginRequestValidator = loginRequestValidator;
        _authenticationService = userAuthenticationService;
        _generationTokenService = generationTokenService;
        _changeDataRequestValidator = changeDataRequestValidator;
    }

    [AdminOnly]
    [HttpGet]
    public ActionResult<IEnumerable<UserDTO>> GetAllUser()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }

    [AdminOnly]
    [HttpPut]
    [Route(UsersRoutes.AddUser)]
    public ActionResult<UserDTO> Add([FromBody] string username)
    {
        if (username == null || username.Length == 0)
        {
            return BadRequest("Invalid username");
        }

        _userService.RegisterUser(username);

        return Ok(_userService.GetUserByUsername(username));
    }

    [AdminOnly]
    [HttpPost]
    [Route(UsersRoutes.UpdateUser)]
    public ActionResult<UserDTO> Update([FromBody] ChangeDataRequest changeDataRequest)
    {
        var validationResult = _changeDataRequestValidator.Validate(changeDataRequest);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var user = _userService.GetUserByUsername(changeDataRequest.Username);

        if (user == null) { return NotFound("User not found at repository"); }

        if (changeDataRequest.Password != null && user.IsPasswordRestricted)
        {
            var canUpdate = _changeDataRequestValidator
                .isSatisfactoryCondition(changeDataRequest.Password);

            if (!canUpdate) 
            {
                return BadRequest("Incorrect password to change");
            }
        }

        _userService.UpdateUser(changeDataRequest);

        user = _userService.GetUserByUsername(changeDataRequest.Username);
        
        if (user == null) { return BadRequest("Can't add user"); }
        
        return Ok(user);
    }
    
    [HttpPost]
    [Route(UsersRoutes.LoginUser)]
    public ActionResult<HttpBodyResponse> Login([FromBody] LoginRequest loginRequest )
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

            return Ok(new HttpBodyResponse
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
