import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, Observable, of } from 'rxjs';
import { ToDo } from './toDo';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  readonly url = 'https://kanban-api-rails.herokuapp.com/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.url);
  }

  add(content: string): Observable<ToDo> {
    const body = { content: content, state: 1 };

    return this.http.post<ToDo>(this.url, body);
  }

  update(todo: ToDo) {
    const body = { content: todo.content, state: todo.state };
    return this.http.put<ToDo>(this.url + '/' + todo.id, body);
  }

  delete(id: number): Observable<ToDo> {
    return this.http.delete<ToDo>(this.url + '/' + id);
  }
}
