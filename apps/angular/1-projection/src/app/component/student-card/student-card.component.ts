import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [backgroundColor]="backgroundColor"
      (onAddNewItem)="addNewItem()"
      (onDeleteItem)="deleteItem($event)">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  backgroundColor = 'rgba(0, 250, 0, 0.1)';

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem = () => this.store.addOne(randStudent());
  deleteItem = (id: number) => this.store.deleteOne(id);
}
