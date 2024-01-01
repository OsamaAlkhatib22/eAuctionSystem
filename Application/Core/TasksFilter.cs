using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class TasksFilter
    {
        public List<int> lstTaskCategoriesIds { get; set; } = new List<int>();

        public List<int> lstTaskSkillsIds { get; set; } = new List<int>();

        public decimal Budget { get; set; } = 0;//starting_bid
        public DateTime dtmDateCreated { get; set; } = DateTime.MinValue;
        public DateTime dtmDateTo { get; set; } = DateTime.MinValue;//from to


    }
}

