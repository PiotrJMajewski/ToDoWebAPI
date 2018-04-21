using System;
using System.Collections.Generic;
using System.Text;
using ToDoListApp_DAL.Interfaces;

namespace ToDoListApp_DAL.Models
{
    public class ToDoItem: IBasicEntity
    {
        public int Id { get; set; }
        public string ToDoTask { get; set; } 
        public bool IsCompleted { get; set; }
        public DateTime ActualisationDate { get; set; }
    }
}
