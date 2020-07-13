using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Command.Employee
{
    public class ToggleEmployeeCommand : Notifiable, ICommand
    {
        public ToggleEmployeeCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .IsNotNull(Id, "Id", "O id não pode ser nulo")
            );
        }
    }
}
