import { Injectable } from "@angular/core";
import { ToDoItem } from "../models/todo.item";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ToDoIntegrationService {

    private toDoUrl = "http://localhost:55777/api/ToDos";

    constructor(private http: HttpClient) {

    }

    addNewToDoItem(item: ToDoItem): Observable<ToDoItem> {
        return this.http.post<ToDoItem>(this.toDoUrl, item);
    }

    updateToDoItem(item: ToDoItem): Observable<ToDoItem> {
        return this.http.put<ToDoItem>(this.toDoUrl, item);
    }

    getToDoItemById(id: number): Observable<ToDoItem> {
        const getUrl = `${this.toDoUrl}/${id}`;;
        return this.http.get<ToDoItem>(getUrl);
    }

    getAllToDoItems(): Observable<ToDoItem[]> {
        return this.http.get<ToDoItem[]>(this.toDoUrl);
    }

    deleteToDoItemById(id: number): Observable<{}> {
        const deleteUrl = `${this.toDoUrl}/${id}`;;
        return this.http.delete(deleteUrl)
    }

    getActiveToDoItem(): Observable<ToDoItem[]> {
        const getUrl = `${this.toDoUrl}/${2}`;;
        return this.http.get<ToDoItem[]>(getUrl);
    }

    getDoneToDoItem(): Observable<ToDoItem[]> {
        const getUrl = `${this.toDoUrl}/${1}`;;
        return this.http.get<ToDoItem[]>(getUrl);
    }





}