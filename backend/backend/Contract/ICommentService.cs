using System.Threading.Tasks;
using backend.Models;
using backend.Models.Requests;

namespace backend.Services
{
    public interface ICommentService
    {
        Task<Comment> AddComment(int userId, int blogId, string content);
        Task<Comment> UpdateComment(int commentId, int userId, int blogId, CommentRequest commentRequest);
        Task<Comment> DeleteComment(int commentId, int userId, int blogId);
        Task<Comment> GetComment(int commentId, int userId, int blogId);
    }
}
