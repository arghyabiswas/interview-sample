using Microsoft.EntityFrameworkCore;
using Sample.API.Modells;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sample.API.Handler
{
    public class EmployeeHandler
    {
        private readonly ApplicationDbContext dbContext;
        public EmployeeHandler(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<Employee> GetEmployees()
        {
            return dbContext.Employees.ToList();
        }

        public Employee GetEmployee(int id)
        {
            return dbContext.Employees.FirstOrDefault(p => p.Id == id);
        }

        public async Task AddEmployee(Employee employee, CancellationToken cancellationToken)
        {
            await dbContext.Employees.AddAsync(employee);

            await this.dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task EditEmployee(int id, Employee employee, CancellationToken cancellationToken)
        {
            var oldValue = dbContext.Employees.FirstOrDefault(p => p.Id == id);
            if(oldValue == null)
            {
                return;
            }

            oldValue.Name = employee.Name;
            oldValue.Salary = employee.Salary;
            oldValue.ManagerName = employee.ManagerName;
            //this.dbContext.Entry<Employee>(employee).State = EntityState.Modified;

            await this.dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
