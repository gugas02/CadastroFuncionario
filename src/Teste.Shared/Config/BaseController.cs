using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Teste.Domain.Command;

namespace Teste.Shared.Config
{
    public class BaseController : Controller
    {

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult CreateResponse(ICommandResult data)
        {
            if (data == null)
                return Ok(data);
            if (!data.Success())
            {
                return BadRequest(data);
            }
            return Ok(data);
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult NotFoundResponse(ICommandResult data = null)
        {
            return new NotFoundObjectResult(data);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult CreatedResponse(ICommandResult data = null)
        {
            return Created("", data);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async ValueTask<IActionResult> CreateResponseAsync(ICommandResult data = null)
        {
            var response = await Task.Run(() => { return CreateResponse(data); });
            return response;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async ValueTask<IActionResult> NotFoundResponseAsync(ICommandResult data = null)
        {
            var response = NotFoundResponse();
            return await Task.FromResult(response);
        }
    }
}
