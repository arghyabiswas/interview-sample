using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sample.API.Handler;
using Sample.API.Modells;

namespace Sample.API.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeHandler handler;
        public EmployeeController(EmployeeHandler handler)
        {
            this.handler = handler;
        }
        
        /// <summary>
        /// Get all Employee
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return handler.GetEmployees();
        }

        /// <summary>
        /// Get Employee
        /// </summary>
        /// <param name="id">Employee id</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return handler.GetEmployee(id);
        }

        /// <summary>
        /// Add Employee
        /// </summary>
        /// <param name="employee">Employee</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await handler.AddEmployee(employee, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Edit Employee
        /// </summary>
        /// <param name="id">Employee id</param>
        /// <param name="employee">Employee</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Employee employee, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await handler.EditEmployee(id, employee, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Delete Employee
        /// </summary>
        /// <param name="id">Employee id</param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
