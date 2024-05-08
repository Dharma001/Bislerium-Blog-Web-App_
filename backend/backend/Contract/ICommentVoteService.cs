using System.Threading.Tasks;

namespace backend.Contract
{
    public interface ICommentVoteService
    {
        Task<bool> AddUpvote(int userId, int commentId, int blogId);
        Task<bool> AddDownvote(int userId, int commentId, int blogId);
        Task<int> GetUpvoteCount(int commentId, int blogId);
        Task<int> GetDownvoteCount(int commentId, int blogId);
        Task<int> GetTotalCommentCount(int blogId);
        Task<bool?> IsUpvoted(int userId, int commentId, int blogId);
        Task<bool?> IsDownvoted(int userId, int commentId, int blogId);
        Task<bool> RemoveVote(int userId, int commentId, int blogId);
    }
}
