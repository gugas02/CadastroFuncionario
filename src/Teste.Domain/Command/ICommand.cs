using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Command
{
    public interface ICommand
    {
        void Validate();
    }
}
