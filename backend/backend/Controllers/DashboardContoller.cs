using backend.Contract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpGet("counts")]
        public async Task<IActionResult> GetOverallCounts()
        {
            try
            {
                var counts = await _adminOverviewService.GetAllTimeCounts();
                return Ok(counts);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while retrieving overall counts.");
            }
        }

        [HttpGet("top-popular-posts-all-time")]
        public async Task<IActionResult> GetTopPopularPostsAllTime()
        {
            try
            {
                var posts = await _adminOverviewService.GetTopPopularPostsAllTime();
                return Ok(posts);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while retrieving top popular posts.");
            }
        }

        [HttpGet("top-popular-posts-by-month")]
        public async Task<IActionResult> GetTopPopularPostsByMonth(int year, int month)
        {
            try
            {
                var posts = await _adminOverviewService.GetTopPopularPostsByMonth(year, month);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while retrieving top popular posts by month.");
            }
        }

        [HttpGet("top-popular-bloggers")]
        public async Task<IActionResult> GetTopPopularBloggers()
        {
            try
            {
                var bloggers = await _adminOverviewService.GetTopPopularBloggers();
                return Ok(bloggers);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while retrieving top popular bloggers.");
            }
        }
    }
}
