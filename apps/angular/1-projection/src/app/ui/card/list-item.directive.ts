import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[listItem]',
  standalone: true,
})
export class ListItemTemplateDirective {
  templateRef = inject(TemplateRef);
}
