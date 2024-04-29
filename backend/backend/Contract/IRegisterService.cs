using backend.Models;
using backend.Models.Requests;
using System.Threading.Tasks;

namespace backend.Contract
{
    public interface IRegisterService
    {
        Task<bool> Register(RegisterRequest request);
    }
}
