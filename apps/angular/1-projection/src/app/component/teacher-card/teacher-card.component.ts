import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [backgroundColor]="backgroundColor"
      (onAddNewItem)="addNewItem()"
      (onDeleteItem)="deleteItem($event)">
      <img priority ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  backgroundColor = 'rgba(250, 0, 0, 0.1)';

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem = () => this.store.addOne(randTeacher());
  deleteItem = (id: number) => this.store.deleteOne(id);
}
