import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [backgroundColor]="backgroundColor"
      [nameKey]="nameKey"
      (onAddNewItem)="addNewItem()"
      (onDeleteItem)="deleteItem($event)">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  backgroundColor = 'rgba(0, 0, 250, 0.1)';
  nameKey = 'name';

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewItem = () => this.store.addOne(randomCity());
  deleteItem = (id: number) => this.store.deleteOne(id);
}
