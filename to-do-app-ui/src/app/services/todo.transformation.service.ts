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
    testNum: number =0;
    
    constructor(private integrationService: ToDoIntegrationService) {
        this.callForMultipleItems()

    }

    callForMultipleItems() {
        this.integrationService.getAllToDoItems().subscribe(data => {this.toDoMultipleItems = data;
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
        });
        this.checkItemsLeftNumber() ;
    }

    callForActiveItems() {
        this.integrationService.getActiveToDoItem().subscribe(data => {this.toDoMultipleItems = data;
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
    });

    }

    callForDoneItems() {
        this.integrationService.getDoneToDoItem().subscribe(data =>{ this.toDoMultipleItems = data;
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
    });

    }

    callForRemovingItem(id: number) {
        this.integrationService.deleteToDoItemById(id).subscribe(()=>{this.callForMultipleItems();
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
    });
    }

    callForCreatingItem(item: ToDoItem) {
        this.integrationService.addNewToDoItem(item).subscribe(data => {this.toDoItem = data;
        this.callForMultipleItems();
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
    });
    }

    callForUpdatingItem(item: ToDoItem) {
        this.integrationService.updateToDoItem(item).subscribe(data => {this.toDoItem = data;            
        this.toDoMultipleItemsCaller.next(this.toDoMultipleItems.slice());
        });
        
    }

    checkItemsLeftNumber() 
    {

        this.toDoMultipleItems.forEach(item => {this.testNum = this.testNum+1})

    }



    

    
}