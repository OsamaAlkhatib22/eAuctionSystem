﻿using Microsoft.AspNetCore.Mvc;
using Application;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Profession;

namespace API.Controllers
{
    public class ProfessionsController : BaseApiController
    {


        [HttpPost] // .../api/professions
        public async Task<IActionResult> InsertDepartment([FromForm] ProfessionDTO professionDTO)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            professionDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new InsertProfessionCommand(professionDTO)));
        }


    }
}
