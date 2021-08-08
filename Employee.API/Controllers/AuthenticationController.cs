using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Sample.API.Modells;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Sample.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("login")]
        //[Consumes("application/json", "text/plain")]
        public async Task<IActionResult> Post([FromBody]LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest("Invalid credential provided.");
            }

            var issuedClaim = new List<Claim>();

            var claims = new[]
             {
                     new Claim(JwtRegisteredClaimNames.UniqueName, credentials.UserName),
                     new Claim(JwtRegisteredClaimNames.Sub, credentials.UserName)
                 };
            issuedClaim.AddRange(claims);


            // Create the JWT security token and encode it.
            var jwtToken = new JwtSecurityToken(
                issuer: "DUMMY",
                audience: "DUMMY",
                claims: issuedClaim,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(30));

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                access_token = issuedClaim,
                expires = DateTime.UtcNow.AddMinutes(30),
                emailConfirmed = true,
                userName = credentials.UserName,
                displayName = credentials.UserName,
                issued = "DUMMY"
            };


            var token = JsonConvert.SerializeObject(response);

            return new OkObjectResult(token);

        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // Ignoring database driven user validation for the purpose of sample.
            // Originally it can be validated through DB
            if(username.Equals("Admin",StringComparison.OrdinalIgnoreCase)
                && password.Equals("Admin@123"))
            {
                return new ClaimsIdentity(new GenericIdentity(username, "Token"), new[]
                {
                    new Claim("id", username)
                });
            }
           

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}