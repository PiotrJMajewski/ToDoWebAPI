export class ToDoItem {
    public id: number;
    public toDoTask: string;
    public isCompleted: boolean;
    public actualisationDate: string;

    constructor(id: number, toDoTask: string, isCompleted: boolean, actualisationDate: string) {
        this.id = id;
        this.toDoTask = toDoTask;
        this.isCompleted = isCompleted;
        this.actualisationDate = actualisationDate;
    }
}