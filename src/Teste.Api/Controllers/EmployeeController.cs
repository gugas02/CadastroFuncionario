using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Teste.Domain.Command.Employee;
using Teste.Domain.Handlers;
using Teste.Domain.Queries;
using Teste.Domain.Repositories;
using Teste.Shared.Config;

namespace Teste.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromServices] IHandler<CreateEmployeeCommand> service, [FromBody] CreateEmployeeCommand command)
        {
            var result = await service.HandleAsync(command);

            return await CreateResponseAsync(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromServices] IHandler<EditEmployeeCommand> service, [FromBody] EditEmployeeCommand command)
        {
            var result = await service.HandleAsync(command);

            return await CreateResponseAsync(result);
        }

        [HttpPut("toggle/{id}")]
        public async Task<IActionResult> Toggle([FromServices] IHandler<ToggleEmployeeCommand> service, Guid id)
        {
            var result = await service.HandleAsync(new ToggleEmployeeCommand(id));

            return await CreateResponseAsync(result);
        }

        [HttpPost("pagination")]
        public async Task<IActionResult> Pagination([FromServices] IEmployeeRepository service, [FromBody] EmployeeQuery query)
        {
            var data = await service.Get(query);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromServices] IEmployeeRepository service, Guid id)
        {
            var data = await service.Get(id);

            return Ok(data);
        }

        [HttpGet("nomes")]
        public async Task<IActionResult> GetNames([FromServices] IEmployeeRepository service)
        {
            var data = await service.GetNamesAsync();

            return Ok(data);
        }
    }
}
