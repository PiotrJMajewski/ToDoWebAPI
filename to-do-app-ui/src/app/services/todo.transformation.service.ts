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
        this.callForMultipleItems()

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

    }

    callForRemovingItem(id: number) {
        this.integrationService.deleteToDoItemById(id).subscribe(()=>{this.callForMultipleItems();
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
    });
    }

    callForCreatingItem(item: ToDoItem) {
        this.integrationService.addNewToDoItem(item).subscribe(data => {this.toDoItem = data;
        this.callForMultipleItems();
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
    });
    }

    callForUpdatingItem(item: ToDoItem) {
        this.integrationService.updateToDoItem(item).subscribe(data => {this.toDoItem = data;            
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems);
        });
        
    }



    

    
}