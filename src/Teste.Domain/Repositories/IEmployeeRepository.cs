using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain.Entities;
using Teste.Domain.Queries;
using Teste.Domain.Shared.Page;

namespace Teste.Domain.Repositories
{
    public interface IEmployeeRepository
    {
        public Task Insert(Employee employee);
        public Task Update(Employee employee);
        public Task<Employee> Get(Guid id);
        bool CheckEmailAlreadyExists(string email, Guid? excludeId = null);
        public Task<PagedList<Employee>> Get(EmployeeQuery id);
        Task<List<string>> GetNamesAsync();
    }
}
