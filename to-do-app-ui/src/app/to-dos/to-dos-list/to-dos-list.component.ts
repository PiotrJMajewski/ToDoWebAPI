import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToDoItem } from '../../models/todo.item';
import { ToDoTransformationService } from '../../services/todo.transformation.service';

@Component({
    selector: 'app-to-dos-list',
    templateUrl: './to-dos-list.component.html',
    styleUrls: ['./to-dos-list.component.css']
})
/** ToDosList component*/
export class ToDosListComponent implements OnInit,OnDestroy  {
    /** ToDosList ctor */

    private changeToDoListSubscription = new Subscription;
    private changeToDoItemSubscription = new Subscription;
    toDoMultipleItems: ToDoItem[] = [];
    toDoItem: ToDoItem;
    tekst: string;

    constructor(private todoTransformationService: ToDoTransformationService) {

    }

    onItemAdd()
    {

    }

    ngOnDestroy(): void {
        this.changeToDoListSubscription.unsubscribe();
    }
    ngOnInit(): void {
        this.changeToDoListSubscription = 
        this.todoTransformationService
        .toDoMultipleItemsCaller.subscribe((multipleItems: ToDoItem[])=> {this.toDoMultipleItems = multipleItems});

        this.todoTransformationService.callForMultipleItems();
        this.tekst = this.toDoMultipleItems[0].ToDoTask ;


    }
}