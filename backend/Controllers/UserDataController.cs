using Backend.models;
using Backend.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController: ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService) {
        _userService = userService;
    }

    // GET: api/users
    [HttpGet]
    public ActionResult<List<UserDTO>> GetAllUser()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }
}
