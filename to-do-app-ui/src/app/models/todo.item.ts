export class ToDoItem {
    public Id: number;
    public ToDoTask: string;
    public IsCompleted: boolean;
    public ActualisationDate: string;

    constructor(id: number, toDoTask: string, isCompleted: boolean, actualisationDate: string) {
        this.Id = id;
        this.ToDoTask = toDoTask;
        this.IsCompleted = isCompleted;
        this.ActualisationDate = actualisationDate;
    }
}