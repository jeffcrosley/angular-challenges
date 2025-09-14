import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { firstValueFrom } from 'rxjs';
import { ToDo } from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/todos';

  getToDos = (): Promise<ToDo[]> =>
    firstValueFrom(this.http.get<ToDo[]>(this.url));

  updateToDo = (todo: ToDo): Promise<ToDo> =>
    firstValueFrom(
      this.http.put<ToDo>(`${this.url}/${todo.id}`, {
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
    );

  deleteToDo = (id: number): Promise<void> =>
    firstValueFrom(this.http.delete<void>(`${this.url}/${id}`));
}
