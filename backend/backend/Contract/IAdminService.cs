using backend.Models;
using backend.Models.Requests;

namespace backend.Contract
{
    public interface IAdminService
    {
        Task<DashboardRequests> GetAllTimeCounts();
        Task<List<Blog>> GetTopPopularPostsAllTime();
        Task<List<Blog>> GetTopPopularPostsByMonth(int year, int month);
        Task<List<User>> GetTopPopularBloggers();
    }
}
