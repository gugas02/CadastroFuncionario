using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain.Command;
using Teste.Domain.Command.Employee;
using Teste.Domain.Entities;
using Teste.Domain.Repositories;
using Teste.Domain.Shared;

namespace Teste.Domain.Handlers
{
    public class EmployeeHandler : Notifiable,
        IHandler<EditEmployeeCommand>,
        IHandler<CreateEmployeeCommand>,
        IHandler<ToggleEmployeeCommand>
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> HandleAsync(EditEmployeeCommand command)
        {
            if (command == null)
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("body", "O corpo da requisição não pode ser nulo verifique as propriedades enviadas")));

            command.Validate();
            if (command.Invalid)
                return new GenericCommandResult(false, "Comando inválido", command.Notifications);

            if (_repository.CheckEmailAlreadyExists(command.Email, command.Id))
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("Email", "Email já registrado em nossa base")));

            var employee = await _repository.Get(command.Id);
            if (employee == null)
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("body", "Funcionário não encontrado")));
            command.Skills = command.Skills.Distinct().ToList();
            employee.Edit(command);
            employee.Validate();
            if (employee.Invalid)
                return new GenericCommandResult(false, "Comando inválido", employee.Notifications);

            await _repository.Update(employee);

            return new GenericCommandResult(
                    true,
                    "Funcionário editado com sucesso com sucesso",
                    new { });
        }

        public async Task<ICommandResult> HandleAsync(CreateEmployeeCommand command)
        {
            if (command == null)
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("body", "O corpo da requisição não pode ser nulo verifique as propriedades enviadas")));

            command.Validate();
            if (command.Invalid)
                return new GenericCommandResult(false, "Comando inválido", command.Notifications);

            if (_repository.CheckEmailAlreadyExists(command.Email))
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("Email", "Email já registrado em nossa base")));

            var user = new Employee(command);
            user.Validate();
            if (user.Invalid)
                return new GenericCommandResult(false, "Comando inválido", user.Notifications);

            await _repository.Insert(user);
            return new GenericCommandResult(true, "Funcionario Cadastrado com sucesso", null);
        }

        public async Task<ICommandResult> HandleAsync(ToggleEmployeeCommand command)
        {
            if (command == null)
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("body", "O corpo da requisição não pode ser nulo verifique as propriedades enviadas")));

            command.Validate();
            if (command.Invalid)
                return new GenericCommandResult(false, "Comando inválido", command.Notifications);

            var employee = await _repository.Get(command.Id);
            if(employee == null)
                return new GenericCommandResult(false, "Comando inválido",
                    NotificationHelpers.BuildNotifications(new Notification("body", "Funcionário não encontrado")));
            employee.ToggleEnabled();
            await _repository.Update(employee);

            return new GenericCommandResult(
                    true,
                    "Funcionário editado com sucesso com sucesso",
                    new { });
        }
    }
}
