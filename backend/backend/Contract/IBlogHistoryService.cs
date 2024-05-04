using backend.Models;

namespace backend.Contract
{
    public interface IBlogHistoryService
    {
        Task<List<BlogHistoryWithUserAndBlog>> GetBlogHistoryWithUserAndBlogByUserId(int userId);
    }
}
