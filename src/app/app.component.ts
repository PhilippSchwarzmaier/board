import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardService } from './board.service';
import { ToDo } from './toDo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private allState: Subject<ToDo[]>;
  private all: ToDo[];

  toDos: Observable<ToDo[]>;
  doings: Observable<ToDo[]>;
  dones: Observable<ToDo[]>;

  editMode: number;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.getAll().subscribe((t) => {
      this.allState = new BehaviorSubject<ToDo[]>(t);
      this.all = t;

      this.toDos = this.allState.pipe(
        map((todos) => todos.filter((todo) => todo.state === 1))
      );
  
      this.doings = this.allState.pipe(
        map((todos) => todos.filter((todo) => todo.state === 2))
      );
  
      this.dones = this.allState.pipe(
        map((todos) => todos.filter((todo) => todo.state === 3))
      );
    });


  }

  public add(input: HTMLInputElement): void {
    this.boardService.add(input.value).subscribe((t) => {
      this.all.push(t);
      this.allState.next(this.all);
      input.value = '';
    });
  }

  public delete(id: number): void {
    this.boardService.delete(id).subscribe(() => {
      this.all = this.all.filter((t) => t.id !== id);
      this.allState.next(this.all);
    });
  }

  updateState(state: number, toDo: ToDo) {
    toDo.state = +state;
    this.boardService.update(toDo).subscribe((updatetoDo) => {
      this.all = this.all.filter((t) => t.id !== toDo.id);
      this.all.push(updatetoDo);
      this.allState.next(this.all);
    });
  }

  updateContent(content: string, toDo: ToDo) {
    toDo.content = content;
    this.boardService.update(toDo).subscribe((updatetoDo) => {
      this.all = this.all.filter((t) => t.id !== toDo.id);
      this.all.push(updatetoDo);
      this.allState.next(this.all);

      this.offEditMode(toDo.id);
    });
  }

  onEditMode(id: number) {
    this.editMode = id;
  }

  offEditMode(id: number) {
    this.editMode = -1;
  }
}
