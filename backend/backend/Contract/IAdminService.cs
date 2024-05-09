using backend.Models;

namespace backend.Contract
{
    public interface IAdminService
    {
        int GetAllTimeCumulativeCount();
        int GetMonthlyCumulativeCount(int month);
        List<Blog> GetTop10MostPopularPosts();
        List<User> GetTop10MostActiveBloggers();
        int GetMonthlyCountOfPosts(int month);
        int GetAllTimeCountOfPosts();
       
    }
}
