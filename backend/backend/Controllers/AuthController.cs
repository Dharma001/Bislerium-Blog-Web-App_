using backend.Contract;
using backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var (token, roleId ,Id) = await _authenticationService.Authenticate(request.Email, request.Password);
            if (token == null)
                return Unauthorized();

            return Ok(new { Token = token, RoleId = roleId ,userId = Id });
        }
    }
}
