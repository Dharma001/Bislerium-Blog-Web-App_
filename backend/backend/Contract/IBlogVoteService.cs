using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IBlogVoteService
    {
        Task<bool> AddUpvote(int userId, int blogId);
        Task<bool> AddDownvote(int userId, int blogId);
        Task<int> GetUpvoteCount(int blogId);
        Task<int> GetDownvoteCount(int blogId);
        Task<bool?> IsUpvoted(int userId, int blogId);
        Task<bool?> IsDownvoted(int userId, int blogId);
        Task<bool> RemoveVote(int userId, int blogId);
    }
}
