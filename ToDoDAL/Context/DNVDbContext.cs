using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;
using ToDoListApp_DAL.Models;

namespace ToDoListApp_DAL.Context
{
    public class DNVDbContext: DbContext
    {
        public DNVDbContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<DNVDbContext>());
        }

        public DbSet<ToDoItem> ToDoItem { get; set; }
        

    }
}
