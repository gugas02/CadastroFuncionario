using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Command.Employee;
using Teste.Domain.Enums;

namespace Teste.Domain.Entities
{
    public class Employee : Notifiable
    {
        public Employee(CreateEmployeeCommand command)
        {
            FullName = command.FullName;
            BirthDate = command.BirthDate;
            Email = command.Email;
            Gender = command.Gender;
            Id = Guid.NewGuid();
            Skills = new List<EmployeeSkill>();
            foreach (var item in command.Skills)
            {
                Skills.Add(new EmployeeSkill(Id, item));
            }
            Enabled = true;
            CreationDate = DateTime.Now;
        }

        public Employee()
        {
        }

        public Guid Id { get; set; }
        public string FullName { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public EGender Gender { get; set; }
        public List<EmployeeSkill> Skills { get; set; }
        public bool Enabled { get; set; }

        public void Validate()
        {
            var referenceDate = DateTime.Now.Date.AddYears(-18);
            AddNotifications(new Contract()
                .IsNotNullOrEmpty(FullName, "FullName", "O nome completo não pode ser nulo ou vazio")
                .IsNotNull(BirthDate, "BirthDate", "A data de nascimento não pode ser nula")
                .IsNotNull(Gender, "Gender", "O sexo não pode ser nulo")
                .IsNotNull(Skills, "Skills", "As habilidades não podem ser nulas")
                .IsTrue(Skills.Count > 0 , "Skills", "Voce deve selecionar pelo menos uma habilidade")
                .IsTrue(BirthDate <= referenceDate, "Skills", "Funcionário deve ser maior que 18 anos")
            );
            if (!string.IsNullOrEmpty(Email))
            {
                AddNotifications(new Contract()
                    .IsEmail(Email, "Email", "O Email é inválido")
                );
            }
        }

        public void ToggleEnabled()
        {
            Enabled = !Enabled;
        }

        public void Edit(EditEmployeeCommand command)
        {
            FullName = command.FullName;
            BirthDate = command.BirthDate;
            Email = command.Email;
            Gender = command.Gender;
            Skills = new List<EmployeeSkill>();
            foreach (var item in command.Skills)
            {
                Skills.Add(new EmployeeSkill(Id, item));
            }
        }

    }
}
