using backend.Contract;
using backend.Models;
using backend.Models.Requests;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("user/api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IUserService _ProfileService;

    public ProfileController(IUserService UserService)
    {
        _ProfileService = UserService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetProfile(int id)
    {
        var Profile = await _ProfileService.GetUserById(id);
        if (Profile == null)
        {
            return NotFound();
        }
        return Ok(Profile);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(int id, UpdateProfileRequest userRequest)
    {
        try
        {
            var updatedProfile = await _ProfileService.UpdateUserProfile(id, userRequest);
            if (updatedProfile == null)
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
    [HttpPut("{id}/updatePassword")]
    public async Task<IActionResult> UpdatePassword(int id, UpdateProfilePasswordRequest request)
    {
        try
        {
            var user = await _ProfileService.UpdateUserProfilePassword(id, request);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}