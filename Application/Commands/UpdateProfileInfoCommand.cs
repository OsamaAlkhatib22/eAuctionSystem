﻿using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public record UpdateProfileInfoCommand(string UserName)
        : IRequest<Result<Unit>>;
}