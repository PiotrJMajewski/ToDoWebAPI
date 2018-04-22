import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToDoItem } from '../../models/todo.item';
import { ToDoTransformationService } from '../../services/todo.transformation.service';
import { NgModel, NgForm } from '@angular/forms';

@Component({
    selector: 'app-to-dos-list',
    templateUrl: './to-dos-list.component.html',
    styleUrls: ['./to-dos-list.component.css']
})
/** ToDosList component*/
export class ToDosListComponent implements OnInit,OnDestroy  {
    /** ToDosList ctor */

    @ViewChild("toDoItemForm") itemForm: NgForm
    private changeToDoListSubscription = new Subscription;
    private changeToDoItemSubscription = new Subscription;
    toDoMultipleItems: ToDoItem[] = [];
    toDoItem: ToDoItem;
    tekst: string;


    constructor(private todoTransformationService: ToDoTransformationService) {

    }

    onItemAdd()
    {
        if(this.itemForm.valid)
        {
            const newItem = new ToDoItem(0,this.itemForm.value.newToDoItem,false,Date.now().toString())
            this.todoTransformationService.callForCreatingItem(newItem);
        }

        console.log(this.itemForm)

    }

    ngOnDestroy(): void {
        this.changeToDoListSubscription.unsubscribe();
    }
    ngOnInit(): void {
        this.changeToDoListSubscription = 
        this.todoTransformationService
        .toDoMultipleItemsCaller.subscribe((multipleItems: ToDoItem[])=> {this.toDoMultipleItems = multipleItems});
        this.todoTransformationService.callForMultipleItems();
    }
}