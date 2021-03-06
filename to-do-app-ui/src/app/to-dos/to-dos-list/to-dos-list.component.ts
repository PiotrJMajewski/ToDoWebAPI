﻿import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToDoItem } from '../../models/todo.item';
import { ToDoTransformationService } from '../../services/todo.transformation.service';
import { NgModel, NgForm } from '@angular/forms';

@Component({
    selector: 'app-to-dos-list',
    templateUrl: './to-dos-list.component.html',
    styleUrls: ['./to-dos-list.component.css']
})

export class ToDosListComponent implements OnInit, OnDestroy {

    @ViewChild("toDoItemForm") itemForm: NgForm
    private changeToDoListSubscription = new Subscription;
    private changeToDoItemSubscription = new Subscription;
    toDoMultipleItems: ToDoItem[] = [];
    toDoItem: ToDoItem;
    tekst: string;
    currentItemVisible = true;
    doneItemVisible = true;
    itemsToDoLeft: number = 0;

    constructor(private todoTransformationService: ToDoTransformationService) {

    }

    onItemAdd() {
        if (this.itemForm.valid) {
            const newItem = new ToDoItem(0, this.itemForm.value.newToDoItem, false, Date.now().toString())
            this.todoTransformationService.callForCreatingItem(newItem);
            this.currentItemVisible = true;
            this.doneItemVisible = true;
            this.setToDoItemsVisibility()
        }
    }

    ngOnDestroy(): void {
        this.changeToDoListSubscription.unsubscribe();
    }
    ngOnInit(): void {
        this.changeToDoListSubscription =
            this.todoTransformationService
                .toDoMultipleItemsCaller.subscribe((multipleItems: ToDoItem[]) => { this.toDoMultipleItems = multipleItems });
        this.todoTransformationService.callForMultipleItems();
    }


    onCurrentItemVisible() {
        if (this.currentItemVisible) {
            this.currentItemVisible = false;
        }
        else {
            this.currentItemVisible = true;;
        }

        this.setToDoItemsVisibility();

    }

    onDonetItemVisible() {

        if (this.doneItemVisible) {
            this.doneItemVisible = false;

        }
        else {
            this.doneItemVisible = true;;
        }

        this.setToDoItemsVisibility();
    }

    setToDoItemsVisibility() {

        if (this.currentItemVisible && !this.doneItemVisible) {
            this.todoTransformationService.callForActiveItems();
        }
        else if (!this.currentItemVisible && this.doneItemVisible) {
            this.todoTransformationService.callForDoneItems();
        }
        else if (!this.currentItemVisible && !this.doneItemVisible) {
            this.toDoMultipleItems = [];
            this.itemsToDoLeft = 0
        }
        else if (this.currentItemVisible && this.doneItemVisible) {
            this.todoTransformationService.callForMultipleItems();
        }

    }

    countItemToDo() {
        this.itemsToDoLeft = 0;
        this.toDoMultipleItems.forEach(item => {
            if (!item.IsCompleted) {
                this.itemsToDoLeft = this.itemsToDoLeft + 1
            }
        })
    }

}