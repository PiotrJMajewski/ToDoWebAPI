using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToDoListApp_DAL.Models;

namespace ToDoWebAPI.Validation
{
    public class ToDosValidation : AbstractValidator<ToDoItem>
    {
        public ToDosValidation()
        {
            RuleFor(ToDoItem => ToDoItem.ToDoTask).NotEmpty().WithMessage("Task description can not be empty");
            RuleFor(ToDoItem => ToDoItem.ToDoTask).MaximumLength(60).WithMessage("Task description length should not exceed 60 characters");
            RuleFor(ToDoItem => ToDoItem.ToDoTask).NotNull().WithMessage("Task description can not be null");
        }
    }

}