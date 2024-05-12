using backend.Models;

namespace backend.Contract
{
    public interface ICommentHistoryService
    {
        Task<List<CommentHistoryWithUserAndBlog>> GetCommentHistoryWithUserAndBlogByUserId(int userId);
    }
}
