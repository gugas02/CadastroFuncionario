using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Enums;

namespace Teste.Domain.Entities
{
    public class EmployeeSkill
    {
        public EmployeeSkill()
        {
        }

        public EmployeeSkill(Guid employeeId, ESkills skill)
        {
            EmployeeId = employeeId;
            Skill = skill;
        }

        public Guid EmployeeId { get; set; }
        public ESkills Skill { get; set; }
    }
}
