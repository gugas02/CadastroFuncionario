using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Enums;

namespace Teste.Domain.Command.Employee
{
    public class CreateEmployeeCommand : Notifiable, ICommand
    {
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public EGender Gender { get; set; }
        public List<ESkills> Skills { get; set; }

        public void Validate()
        {
            var referenceDate = DateTime.Now.Date.AddYears(-18);
            AddNotifications(new Contract()
                .IsNotNullOrEmpty(FullName, "FullName", "O nome completo não pode ser nulo ou vazio")
                .IsNotNull(BirthDate, "BirthDate", "A data de nascimento não pode ser nula")
                .IsNotNull(Gender, "Gender", "O sexo não pode ser nulo")
                .IsTrue(Skills!= null && Skills.Count > 0, "Skills", "Você deve selecionar pelo menos uma habilidade")
                .IsTrue(BirthDate <= referenceDate, "Skills", "Funcionário deve ser maior que 18 anos")
            );
            if (!string.IsNullOrEmpty(Email))
            {
                AddNotifications(new Contract()
                    .IsEmail(Email, "Email", "O Email é inválido")
                );
            }
        }
    }
}
