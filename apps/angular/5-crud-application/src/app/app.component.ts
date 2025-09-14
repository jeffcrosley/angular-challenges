import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToDo } from './app.interface';
import { AppService } from './app.service';

@Component({
  imports: [MatProgressSpinnerModule, CommonModule],
  selector: 'app-root',
  template: `
    <mat-progress-spinner
      *ngIf="!todos().length || loading()"
      mode="indeterminate" />
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    }
  `,
})
export class AppComponent implements OnInit {
  private appService = inject(AppService);
  todos = signal<ToDo[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.getToDos();
  }

  private getToDos = async () => {
    this.loading.set(true);
    this.todos.set(await this.appService.getToDos());
    this.loading.set(false);
  };

  update = async (todo: ToDo) => {
    this.loading.set(true);
    const todoUpdated = await this.appService.updateToDo(todo);
    this.todos.update((todos) =>
      todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
    );
    this.loading.set(false);
  };

  delete = async (id: number) => {
    this.loading.set(true);
    await this.appService.deleteToDo(id);
    this.todos.update((todos) => todos.filter((t) => t.id !== id));
    this.loading.set(false);
  };
}
