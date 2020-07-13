using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain.Entities;
using Teste.Domain.Enums;
using Teste.Domain.Queries;
using Teste.Domain.Repositories;
using Teste.Domain.Shared.Page;
using Teste.Infra.DataContexts;

namespace Teste.Infra.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly TesteDataContext _context;

        public EmployeeRepository(TesteDataContext context)
        {
            _context = context;
        }

        public bool CheckEmailAlreadyExists(string email, Guid? excludeId = null)
        {
            var query = @"SELECT TOP (1) *
                      FROM [dbo].[Employee]
                        where [Email] = @email";

            if (excludeId != null)
            {
                query += " and Id != @excludeId";
            }

            var user = _context
                   .Connection
                   .QueryFirstOrDefault<Employee>(
                        query,
                       new { email, excludeId });

            return user != null;
        }

        public async Task<List<string>> GetNamesAsync()
        {
            var query = @"SELECT distinct [FullName]
                      FROM [dbo].[Employee]
                        where [Enabled] = 1";

            var usersNames = (await _context
                   .Connection
                   .QueryAsync<string>(
                        query,
                       new { })).ToList();

            return usersNames;
        }

        public async Task<Employee> Get(Guid id)
        {
            var employeeQuery = @" select * from [dbo].[Employee] where id = @id ";
            var skillsQuery = @" select * from [dbo].[EmployeeSkills] where [EmployeeId] = @id ";

            using (var multi = await _context.Connection.QueryMultipleAsync(employeeQuery + skillsQuery, new
            {
                id
            }))
            {
                var employee = multi.ReadFirstOrDefault<Employee>();

                if (employee != null)
                {
                    employee.Skills = multi.Read<EmployeeSkill>().ToList();
                }
                return employee;
            }
        }

        public async Task<PagedList<Employee>> Get(EmployeeQuery query)
        {
            var countQuery = @" select count(Id) from [dbo].[Employee] e where ([Enabled] = 1) ";
            var employeeQuery = @" select *, ((CONVERT(int,CONVERT(char(8),Convert(date, getdate()),112))-CONVERT(char(8),Convert(date,BirthDate),112))/10000) AS Age from [dbo].[Employee] e where ([Enabled] = 1) ";

            if (!string.IsNullOrEmpty(query.FullName))
            {
                query.FullName = "%" + query.FullName.ToLower() + "%";
                countQuery += " and (LOWER([FullName]) like @FullName) ";
                employeeQuery += " and (LOWER([FullName]) like @FullName) ";
            }

            if (query.Gender != null && query.Gender > 0)
            {
                countQuery += " and ([Gender] = @Gender) ";
                employeeQuery += " and ([Gender] = @Gender) ";
            }
            
            if (query.Age != null && query.Age > 0)
            {
                countQuery += " and ((((CONVERT(int,CONVERT(char(8),Convert(date, getdate()),112))-CONVERT(char(8),Convert(date,BirthDate),112))/10000) = @Age)) ";
                employeeQuery += " and ((((CONVERT(int,CONVERT(char(8),Convert(date, getdate()),112))-CONVERT(char(8),Convert(date,BirthDate),112))/10000) = @Age)) ";
            }


            if(query.Skills != null && query.Skills.Count > 0)
            {
                foreach (var item in query.Skills)
                {
                    employeeQuery += $" and EXISTS ( select * from [dbo].[EmployeeSkills] where [EmployeeId] = e.Id and [Skill] = {(int)item} ) ";
                    countQuery += $" and EXISTS ( select * from [dbo].[EmployeeSkills] where [EmployeeId] = e.Id and [Skill] = {(int)item} ) ";
                }
            }

            employeeQuery += " ORDER BY CreationDate desc OFFSET @ItemFrom ROWS FETCH NEXT @PageSize ROWS ONLY ";

            var skillsQuery = @" select * from [dbo].[EmployeeSkills] ";

            using (var multi = await _context.Connection.QueryMultipleAsync(employeeQuery + countQuery + skillsQuery, new
            {
                query.Age,
                query.Gender,
                query.FullName,
                query.PageSize,
                query.ItemFrom
            }))
            {
                var result = multi.Read<Employee>().ToList();
                var countResult = multi.ReadFirstOrDefault<long>();

                var skillsResult = multi.Read<EmployeeSkill>().GroupBy(x => x.EmployeeId).ToDictionary(a => a.Key);

                foreach (var item in result)
                {
                    if (skillsResult.ContainsKey(item.Id))
                    {
                        item.Skills = skillsResult[item.Id].ToList();
                    }
                }

                return new PagedList<Employee>(result, countResult, query.PageSize);
            }
        }

        public async Task Insert(Employee employee)
        {
            var query = @"INSERT INTO [dbo].[Employee]
                               ([Id],[FullName],[BirthDate],[Email],[Gender],[Enabled],CreationDate)
                         VALUES
                               (@Id,@FullName,@BirthDate,@Email,@Gender,@Enabled, @CreationDate)";
            using (var transaction = _context.Connection.BeginTransaction())
            {
                await
                 _context
                 .Connection
                 .QueryFirstOrDefaultAsync(query, new
                 {
                     employee.Id,
                     employee.FullName,
                     employee.BirthDate,
                     employee.Email,
                     employee.Gender,
                     employee.Enabled,
                     employee.CreationDate
                 }, transaction);


                foreach (var skill in employee.Skills)
                {
                    var queryRule = @"INSERT INTO [dbo].[EmployeeSkills]
                                           ([EmployeeId],[Skill])
                                     VALUES
                                           (@EmployeeId,@Skill)";

                    await
                        _context
                        .Connection
                        .ExecuteAsync(queryRule, new
                        {
                            EmployeeId = employee.Id,
                            skill.Skill
                        }, transaction);
                }
                transaction.Commit();
            }
        }

        public async Task Update(Employee employee)
        {
            var query = @"UPDATE [dbo].[Employee]
                           SET [Id] = @Id
                              ,[FullName] = @FullName
                              ,[BirthDate] = @BirthDate
                              ,[Email] = @Email
                              ,[Gender] = @Gender
                              ,[Enabled] = @Enabled
                              ,CreationDate = @CreationDate
                         WHERE [Id] = @Id";

            using (var transaction = _context.Connection.BeginTransaction())
            {
                await
                 _context
                 .Connection
                 .QueryAsync(query, new
                 {
                     employee.Id,
                     employee.FullName,
                     employee.BirthDate,
                     employee.Email,
                     employee.Gender,
                     employee.Enabled,
                     employee.CreationDate
                 }, transaction);

                var deleteQuery = @"delete from [EmployeeSkills] where [EmployeeId] = @Id";

                await
                 _context
                 .Connection
                 .QueryAsync(deleteQuery, new
                 {
                     employee.Id
                 }, transaction);

                foreach (var skill in employee.Skills)
                {
                    var queryRule = @"INSERT INTO [dbo].[EmployeeSkills]
                                           ([EmployeeId],[Skill])
                                     VALUES
                                           (@EmployeeId,@Skill)";

                    await
                        _context
                        .Connection
                        .ExecuteAsync(queryRule, new
                        {
                            EmployeeId = employee.Id,
                            skill.Skill
                        }, transaction);
                }
                transaction.Commit();
            }
        }
    }
}
