using backend.Contract;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Requests;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var success = await _registerService.Register(request);
            if (!success)
            {
                return StatusCode(500, "An error occurred during registration.");
            }

            return Ok("Registration successful");
        }

    }
}
