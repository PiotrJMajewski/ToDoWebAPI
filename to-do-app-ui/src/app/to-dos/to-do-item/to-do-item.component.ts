import { Component, Input, ViewChild } from '@angular/core';
import { ToDoItem } from '../../models/todo.item';
import { ToDoTransformationService } from '../../services/todo.transformation.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-to-do-item',
    templateUrl: './to-do-item.component.html',
    styleUrls: ['./to-do-item.component.css']
})
/** ToDoItem component*/
export class ToDoItemComponent {

    @ViewChild("editItemForm") itemForm: NgForm
    @Input() toDoItem: ToDoItem
    isEditable: boolean = false;

    constructor(private todoTransformationService: ToDoTransformationService) {
    }

    onItemComplete() {
        this.toDoItem.IsCompleted = true;
        this.todoTransformationService.callForUpdatingItem(this.toDoItem);
    }

    onItemRemove() {
        this.todoTransformationService.callForRemovingItem(this.toDoItem.Id);
    }

    onItemEdit() {
        this.isEditable = true;
        this.itemForm.value.editToDo;
    }

    onItemDesist() {
        this.isEditable = false;
        this.todoTransformationService.callForMultipleItems();
    }

    onItemSave() {
        if (this.itemForm.valid) {
            this.toDoItem.ToDoTask = this.itemForm.value.editToDo;
            this.todoTransformationService.callForUpdatingItem(this.toDoItem);
            this.isEditable = false;
        }
    }
}