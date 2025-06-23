import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button [type]="type" [disabled]="disabled"><ng-content></ng-content></button>`
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}
