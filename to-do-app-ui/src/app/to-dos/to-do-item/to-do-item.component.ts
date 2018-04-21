import { Component, Input } from '@angular/core';
import { ToDoItem } from '../../models/todo.item';
import { ToDoTransformationService } from '../../services/todo.transformation.service';

@Component({
    selector: 'app-to-do-item',
    templateUrl: './to-do-item.component.html',
    styleUrls: ['./to-do-item.component.css']
})
/** ToDoItem component*/
export class ToDoItemComponent {

@Input() toDoItem:ToDoItem

    constructor(private todoTransformationService: ToDoTransformationService) {
    }

    onItemComplete()
    {
        this.toDoItem.isCompleted =true;
        this.todoTransformationService.callForUpdatingItem(this.toDoItem);
    }

    onItemRemove()
    {
        this.todoTransformationService.callForRemovingItem(this.toDoItem.id);
    }

    onItemEdit()
    {
        
    }
}