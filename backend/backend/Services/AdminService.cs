using backend.appDbContext;
using backend.Contract;

namespace backend.Services
{
    public class AdminService:IAdminService
    {
        private readonly applicationContext _context;

        public AdminService(applicationContext context)
        {
            _context = context;
        }
    }
}
