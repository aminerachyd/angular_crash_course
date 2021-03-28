import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpHeaders,
} from '@angular/common/http';

import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = 5;

  constructor(private http: HttpClient) {}

  // Get Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}?_limit=${this.todosLimit}`);
  }

  // Delete TODO
  deleteTodo(todo: Todo) {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.delete(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.put(url, todo, httpOptions);
  }
}
