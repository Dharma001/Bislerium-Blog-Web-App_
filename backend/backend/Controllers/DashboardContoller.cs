using backend.Contract;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IAdminService _adminOverviewService;

        public DashboardController(IAdminService adminOverviewService)
        {
            _adminOverviewService = adminOverviewService;
        }

        [HttpGet("all-time-count")]
        public IActionResult GetAllTimeCount()
        {
            var count = _adminOverviewService.GetAllTimeCountOfPosts();
            return Ok(count);
        }

        [HttpGet("monthly-count/{month}")]
        public IActionResult GetMonthlyCount(int month)
        {
            var count = _adminOverviewService.GetMonthlyCountOfPosts(month);
            return Ok(count);
        }

        [HttpGet("top-10-posts")]
        public IActionResult GetTop10Posts()
        {
            var topPosts = _adminOverviewService.GetTop10MostPopularPosts();
            return Ok(topPosts);
        }

        [HttpGet("top-10-bloggers")]
        public IActionResult GetTop10Bloggers()
        {
            var topBloggers = _adminOverviewService.GetTop10MostActiveBloggers();
            return Ok(topBloggers);
        }
    }

}

