using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Task;
using LinqKit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.ComponentModel.DataAnnotations;

namespace Application.Handlers.Task
{
    public class GetAllTaskListHandler
         : IRequestHandler<GetTaskListQuery, Result<List<TaskListDTO>>>
    {

        private readonly DataContext _context;
        public GetAllTaskListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<TaskListDTO>>> Handle(
            GetTaskListQuery request,
            CancellationToken cancellationToken
        )
        {



            var query =
            from t in _context.Services
            orderby t.CreationDate descending
            where t.status == "In Auction"
            select new TaskListDTO
            {
                ServiceId = t.ServiceId,
                Title = t.Title,
                FirstName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.FirstName).SingleOrDefault(),
                LastName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.LastName).SingleOrDefault(),
                CreationDate = t.CreationDate,
                Description = t.Description,
                strCategoryName = t.Category.strCategoryName,
                intCategoryId = t.CategoryId,
                intSkillIds = _context.TaskSkills.Where(q => q.ServiceId == t.ServiceId).Select(w => w.skillId).ToList(),
                strSkills = _context.TaskSkills.Where(q => q.ServiceId == t.ServiceId).Select(w => w.Skills.Skill).ToList(),
                Budget = t.starting_bid,
                TaskSubmissionTime = t.TaskSubmissionTime,

            };
            var queryObject = query.AsQueryable();
            //filtering

            if (request.TasksFilter.lstTaskCategoriesIds.Count > 0)
            {

                var predicate = PredicateBuilder.New<TaskListDTO>();
                foreach (var TasksFilter in request.TasksFilter.lstTaskCategoriesIds)
                {
                    var tempFilter = TasksFilter;

                    predicate = predicate.Or(q => q.intCategoryId == tempFilter);

                }
                queryObject = queryObject.Where(predicate);


            }

            if (request.TasksFilter.lstTaskSkillsIds.Count > 0)
            {

                var predicate = PredicateBuilder.New<TaskListDTO>();
                foreach (var TasksFilter in request.TasksFilter.lstTaskSkillsIds)
                {
                    var tempFilter = TasksFilter;

                    predicate = predicate.Or(q => q.intSkillIds.Any(w => w == tempFilter));

                }
                queryObject = queryObject.Where(predicate);


            }

            if (request.TasksFilter.Budget > 0)
            {

                var predicate = PredicateBuilder.New<TaskListDTO>();
          
                    predicate = predicate.Or(q => q.Budget >= request.TasksFilter.Budget );

                queryObject = queryObject.Where(predicate);


            }

            if (request.TasksFilter.dtmDateCreated > DateTime.MinValue)
            {
                queryObject = (IQueryable<TaskListDTO>)queryObject
                    .Where(q => q.CreationDate >= request.TasksFilter.dtmDateCreated);
                    
                
            }

            if (request.TasksFilter.dtmDateTo > DateTime.MinValue)
            {
                queryObject = (IQueryable<TaskListDTO>)queryObject
                    .Where(q => q.CreationDate <= request.TasksFilter.dtmDateTo);


            }

            var result = await queryObject.ToListAsync();


            return Result<List<TaskListDTO>>.Success(result);


        }




    }

}

