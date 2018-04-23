using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoListApp_DAL.Interfaces;

namespace ToDoDAL.Interfaces
{
    public interface IToDoItem: IBasicEntity
    {
        string ToDoTask { get; set; }
        bool IsCompleted { get; set; }
        DateTime ActualisationDate { get; set; }
    }
}
