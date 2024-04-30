using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IBlogVoteService
    {
        Task<bool> AddVote(int userId, int blogId, bool isUpvote);
        Task<bool> UpdateVote(int userId, int blogId, bool isUpvote);
        Task<bool> RemoveVote(int userId, int blogId);
    }
}
