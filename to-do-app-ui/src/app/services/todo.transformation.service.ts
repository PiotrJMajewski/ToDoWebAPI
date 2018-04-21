import { Injectable } from "@angular/core";
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
        this.integrationService.getAllToDoItems().subscribe(items => this.toDoMultipleItems = items);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
    }

    callForItem(id: number) {
        this.integrationService.getToDoItemById(id).subscribe(item => this.toDoItem = item);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }

    callForRemovingItem(id: number) {
        this.integrationService.deleteToDoItemById(id).subscribe();
        this.toDoMultipleItems.filter(item => item.id != id);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
    }

    callForCreatingItem(item: ToDoItem) {
        this.integrationService.addNewToDoItem(item).subscribe(itemCreated => this.toDoItem = itemCreated);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }

    callForUpdatingItem(item: ToDoItem) {
        this.integrationService.updateToDoItem(item).subscribe(itemUpdated => this.toDoItem = itemUpdated);
        this.toDoMultipleItems.filter(filterItem => filterItem.id != item.id);
        this.toDoMultipleItems.push(this.toDoItem);
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        this.toDoSingleItemCaller.next(this.toDoItem);
    }



    

    
}