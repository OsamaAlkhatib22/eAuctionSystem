using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        //public static async Task SeedData(DataContext context)
        //{
        //    // Return if any data exist in the table.
        //    if (context.Activities.Any()) return;

        //    var activities = new List<Activity>
        //    {
        //        new Activity
        //        {
        //            Title = "Past Activity 1",
        //            Date = DateTime.UtcNow.AddMonths(-2),
        //            Description = "Activity 2 months ago",
        //            Category = "drinks",
        //            City = "London",
        //            Venue = "Pub",
        //        },
        //    };

        //    // Save List into memory then apply changes to DB.
        //    await context.Activities.AddRangeAsync(activities);
        //    await context.SaveChangesAsync();
        //}
    }
}