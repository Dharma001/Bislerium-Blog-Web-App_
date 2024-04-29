using backend.Contract;
using backend.Models;
using backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(UserRequest userRequest)
    {
        var createdUser = await _userService.CreateUser(userRequest);
        return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserRequest userRequest)
    {
        try
        {
            var updatedUser = await _userService.UpdateUser(id, userRequest);
            if (updatedUser == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUser(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}