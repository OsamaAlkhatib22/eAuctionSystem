﻿using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetComplaintTypesListHandler
        : IRequestHandler<GetComplaintTypesListQuery, Result<List<ComplaintTypeDTO>>>
    {
        private readonly DataContext _context;

        public GetComplaintTypesListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<ComplaintTypeDTO>>> Handle(
            GetComplaintTypesListQuery request,
            CancellationToken cancellationToken
        )
        {
            List<ComplaintTypeDTO> result = await _context.ComplaintTypes
                .Select(
                    q =>
                        new ComplaintTypeDTO
                        {
                            intId = q.intId,
                            strNameAr = q.strNameAr,
                            strNameEn = q.strNameEn
                        }
                )
                .ToListAsync();

            return Result<List<ComplaintTypeDTO>>.Success(result);
        }
    }
}