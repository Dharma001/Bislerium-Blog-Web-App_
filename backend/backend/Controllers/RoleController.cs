using backend.Contract;
using backend.Models.Requests;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RolesController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            var roles = await _roleService.GetAllRoles();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
            var role = await _roleService.GetRoleById(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<Role>> CreateRole(RoleRequest roleRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdRole = await _roleService.CreateRole(roleRequest);
                return CreatedAtAction(nameof(GetRole), new { id = createdRole.Id }, createdRole);
            }
            catch (DuplicateNameException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] RoleRequest roleRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedRole = await _roleService.UpdateRole(id, roleRequest);
                if (updatedRole == null)
                {
                    return NotFound($"Role with ID {id} not found.");
                }
                return Ok(updatedRole);
            }
            catch (DuplicateNameException)
            {
                return Conflict("A role with the same name already exists."); // Return conflict status
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request."); // Return generic error message
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            try
            {
                var result = await _roleService.DeleteRole(id);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
        }
    }
}
