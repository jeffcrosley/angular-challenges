import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ListItemTemplateDirective } from './list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.backgroundColor]="backgroundColor()">
      <ng-content />
      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="listItem()?.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <ng-template listItem let-item>
        <div class="border-grey-300 flex justify-between border px-2 py-1">
          {{ item[nameKey()] }}
          <button (click)="onDeleteItem.emit(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </div>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet, ListItemTemplateDirective],
})
export class CardComponent {
  listItem = viewChild(ListItemTemplateDirective);

  readonly list = input<any[] | null>(null);
  readonly backgroundColor = input('');
  readonly nameKey = input<string>('firstName');

  onAddNewItem = output<void>();
  onDeleteItem = output<number>();
}
