using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

public class AdminAuthorizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AdminAuthorizationMiddleware> _logger;

    public AdminAuthorizationMiddleware(RequestDelegate next, IConfiguration configuration, ILogger<AdminAuthorizationMiddleware> logger = null)
    {
        _next = next;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (ValidateTokenAndGetRole(token, out var roleId))
        {
            if (roleId == "1")
            {
                _logger?.LogInformation("AdminAuthorizationMiddleware: Admin authorized");
                await _next(context);
                return;
            }
        }

        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Unauthorized");
        _logger?.LogWarning("AdminAuthorizationMiddleware: Unauthorized access attempt");
    }

    private bool ValidateTokenAndGetRole(string token, out string roleId)
    {
        roleId = null;
        if (string.IsNullOrEmpty(token))
        {
            return false;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var secret = _configuration["ApplicationSettings:JWT_Secret"];
        var key = Encoding.ASCII.GetBytes(secret);

        try
        {
            var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out _);

            roleId = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "role_id")?.Value;
            return true;
        }
        catch
        {
            return false;
        }
    }
}
