import { Component, inject, OnInit, signal } from '@angular/core';
import { ToDo } from './app.interface';
import { AppService } from './app.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
})
export class AppComponent implements OnInit {
  private appService = inject(AppService);
  todos = signal<ToDo[]>([]);

  ngOnInit(): void {
    this.getToDos();
  }

  private getToDos = async () =>
    this.todos.set(await this.appService.getToDos());

  update = async (todo: ToDo) => {
    const todoUpdated = await this.appService.updateToDo(todo);
    this.todos.update((todos) =>
      todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
    );
  };
}
