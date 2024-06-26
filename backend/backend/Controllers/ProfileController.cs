﻿using backend.Contract;
using backend.Models;
using backend.Models.Requests;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("user/api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IUserService _ProfileService;
    private readonly IBlogService _blogService;
    private readonly IUserService _userService;

    public ProfileController(IUserService UserService , IBlogService blogService, IUserService userService)
    {
        _ProfileService = UserService;
        _blogService = blogService;
        _userService = userService;
    }

    [HttpGet("blog/{userId}")]
    public async Task<ActionResult<IEnumerable<BlogWithUserRequest>>> GetBlogsByUserId(int userId)
    {
        var blogs = await _blogService.GetBlogsByUserIdAsync(userId);
        return Ok(blogs);
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await _userService.RemoveUser(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
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