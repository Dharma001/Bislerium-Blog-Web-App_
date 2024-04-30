using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface ICommentVoteService
    {
        Task<bool> AddVote(int userId, int blogId, int commentId, bool isUpvote);
        Task<bool> RemoveVote(int userId, int blogId, int commentId);
    }
}
