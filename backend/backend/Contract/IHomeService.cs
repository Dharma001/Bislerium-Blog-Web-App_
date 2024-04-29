using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace backend.Contract
{
    public interface IHomeService
    {
        Task<IEnumerable<Blog>> GetAllBlogsAsync();


    }
}