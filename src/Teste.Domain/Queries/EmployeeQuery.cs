using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Enums;
using Teste.Domain.Shared.Page;

namespace Teste.Domain.Queries
{
    public class EmployeeQuery : PaginationBase
    {
        public string FullName { get; set; }
        public int? Age { get; set; }
        public EGender? Gender { get; set; }
        public List<ESkills> Skills { get; set; }
    }
}
