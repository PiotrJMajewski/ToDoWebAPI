using FluentValidation;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToDoDAL.Interfaces;
using ToDoListApp_DAL.Models;
using ToDoListApp_DAL.Reposiitories;
using ToDoWebAPI.Validation;

namespace ToDoWebAPI.Infratstructure
{
    public static class Bindings
    {
        public static void AddBindings(IKernel _kernel)
        {
            _kernel.Bind<IToDoItem>().To<ToDoItem>();
            _kernel.Bind<AbstractRepository<ToDoItem>>().To<ToDosRepository>();
            _kernel.Bind<AbstractValidator<IToDoItem>>().To<ToDosValidation>();

        }
    }
}