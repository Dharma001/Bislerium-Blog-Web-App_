using System.Threading.Tasks;

namespace backend.Contract
{
    public interface IAuthenticationService
    {
        Task<(string token, int? roleId , int? Id)> Authenticate(string email, string password);
    }
}
