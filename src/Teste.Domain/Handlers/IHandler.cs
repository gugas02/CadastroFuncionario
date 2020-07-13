using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain.Command;

namespace Teste.Domain.Handlers
{
    public interface IHandler<T> where T : ICommand
    {
        Task<ICommandResult> HandleAsync(T command);
    }
}
