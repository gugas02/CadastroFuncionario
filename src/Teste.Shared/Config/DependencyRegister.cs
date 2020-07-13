using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Command.Employee;
using Teste.Domain.Handlers;
using Teste.Domain.Repositories;
using Teste.Infra.Repositories;

namespace Teste.Shared.Config
{
    public static class DependencyRegister
    {
        public static void AddScoped(this IServiceCollection services, IConfiguration configuration)
        {
            #region Configurations 
            //services.AddScoped<IStaticLog<Domain.SharedKernel.Log>, DomainLogHandler

            #endregion

            #region Handlers
            services.AddScoped<IHandler<EditEmployeeCommand>, EmployeeHandler>();
            services.AddScoped<IHandler<CreateEmployeeCommand>, EmployeeHandler>();
            services.AddScoped<IHandler<ToggleEmployeeCommand>, EmployeeHandler>();
            #endregion

            #region Repositories
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            #endregion

            #region Services 
            #endregion
        }
    }
}
