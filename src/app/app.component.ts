import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks = [
    {
      id: 1,
      content: 'this is the content',
      state: 1,
      created_at: '2018-05-29T09:12:57.752Z',
      updated_at: '2018-05-29T09:12:57.752Z',
    },
    {
      id: 2,
      content: 'this is the content 2',
      state: 2,
      created_at: '2018-05-29T09:12:57.752Z',
      updated_at: '2018-05-29T09:12:57.752Z',
    },
  ];

  constructor() {
    console.log('tes');
  }

  public add(title: any): void {
    // console.log(title);
    const task = {
      id: 3,
      content: title,
      state: 3,
      created_at: '2018-05-29T09:12:57.752Z',
      updated_at: '2018-05-29T09:12:57.752Z',
    };

    this.tasks.push(task);
    console.log(this.tasks);
  }

  public delete(id:number): void {
    this.tasks = this.tasks.filter(t=>t.id!==id);
  }

  getToDos() {
    console.log('stat1');
    return this.tasks.filter((t) => t.state === 1);
  }

  getDoing() {
    console.log('stat2');
    return this.tasks.filter((t) => t.state === 2);
  }

  getDone() {
    console.log('stat3');
    return this.tasks.filter((t) => t.state === 3);
  }

  changeState(state: number, id:number) {
    // console.log(state+" "+id);
     this.tasks.forEach(t=>{
      if(t.id === id)
      {
        t.state = +state;
      }
    });
    console.log(this.tasks);
  }
}
