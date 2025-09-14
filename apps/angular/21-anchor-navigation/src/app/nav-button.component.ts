/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'nav-button',
  template: `
    <a>
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {}
