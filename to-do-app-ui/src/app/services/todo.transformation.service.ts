﻿import { Injectable } from "@angular/core";
import { ToDoIntegrationService } from "./todo.integration.service";
import { Subject } from "rxjs/Subject";
import { ToDoItem } from "../Models/todo.item";

@Injectable()
export class ToDoTransformationService {
    toDoMultipleItemsCaller = new Subject<ToDoItem[]>();
    toDoSingleItemCaller= new Subject<ToDoItem>();
    private toDoItem: ToDoItem;
    private toDoMultipleItems: ToDoItem[] = [];

    constructor(private integrationService: ToDoIntegrationService) {

    }

    callForMultipleItems() {
        this.integrationService.getAllToDoItems().subscribe(data => {this.toDoMultipleItems = data;
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        });
    }

    callForItem(id: number) {
        this.integrationService.getToDoItemById(id).subscribe(data => this.toDoItem = data);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }

    callForRemovingItem(id: number) {
        this.integrationService.deleteToDoItemById(id).subscribe();
        this.toDoMultipleItems.filter(item => item.Id != id);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
    }

    callForCreatingItem(item: ToDoItem) {
        this.integrationService.addNewToDoItem(item).subscribe(data => this.toDoItem = data);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }

    callForUpdatingItem(item: ToDoItem) {
        this.integrationService.updateToDoItem(item).subscribe(data => this.toDoItem = data);
        this.toDoMultipleItems.filter(filterItem => filterItem.Id != item.Id);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }



    

    
}