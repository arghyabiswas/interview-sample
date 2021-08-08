using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sample.API.Modells
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Username cannot be empty")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }


    }
}
