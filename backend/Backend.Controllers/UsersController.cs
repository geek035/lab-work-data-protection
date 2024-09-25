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
    private readonly IChangePasswordRequestValidator<ChangePasswordRequest> _changePasswordRequestValidator;
    private readonly IValidator<ChangeDataRequest> _changeDataRequestValidator;


    public UsersController(
        IUserService userService, 
        IValidator<LoginRequest> loginRequestValidator,
        IUserAuthenticationService userAuthenticationService,
        IGenerationTokenService generationTokenService,
        IChangePasswordRequestValidator<ChangePasswordRequest> changePasswordRequestValidator,
        IValidator<ChangeDataRequest> changeDataRequestValidator)
    {
        _userService = userService;
        _loginRequestValidator = loginRequestValidator;
        _authenticationService = userAuthenticationService;
        _generationTokenService = generationTokenService;
        _changePasswordRequestValidator = changePasswordRequestValidator;
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

        var user = _userService.GetUserByUsername(username);

        if (user != null) {
            return BadRequest("Пользователь уже существует");
        }

        _userService.RegisterUser(username);

        return Ok(_userService.GetUserByUsername(username));
}

    [UsersOnly]
    [HttpPost]
    [Route(UsersRoutes.updatePassword)]
    public ActionResult<UserDTO> UpdatePassword([FromBody] ChangePasswordRequest changePasswordRequest)
    {
        var validationResult = _changePasswordRequestValidator.Validate(changePasswordRequest);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        if (changePasswordRequest.Username != HttpContext.User.FindFirst("Username")?.Value) {
            return BadRequest("Нельзя менять пароль другого пользователя");
        }

        var user = _userService.GetUserByUsername(changePasswordRequest.Username);

        if (user == null) { return NotFound("User not found at repository"); }

        if (changePasswordRequest.Password != null && user.IsPasswordRestricted)
        {
            var canUpdate = _changePasswordRequestValidator
                .isSatisfactoryCondition(changePasswordRequest.Password);

            if (!canUpdate) 
            {
                return BadRequest("Incorrect password to change");
            }
        }

        _userService.UpdatePassword(changePasswordRequest);

        user = _userService.GetUserByUsername(changePasswordRequest.Username);
        
        if (user == null) { return BadRequest("Can't add user"); }
        
        return Ok(user);
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

        _userService.UpdateUser(changeDataRequest);

        user = _userService.GetUserByUsername(changeDataRequest.Username);
        
        if (user == null) { return BadRequest("Can't add user"); }
        
        return Ok(user);
    }

    [UsersOnly]
    [HttpPost]
    [Route(UsersRoutes.checkPassword)]
    public ActionResult<bool> CheckPassword([FromBody] LoginRequest data)
    {
        if (data.Username != HttpContext.User.FindFirst("Username")?.Value) {
            return BadRequest("Нельзя проверять пароли других пользователей");
        }

        var result = _userService.checkPassword(data.Username, data.Password);

        return Ok(result);
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
