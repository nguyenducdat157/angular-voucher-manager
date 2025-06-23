import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[appOnlyNumber]' })
export class OnlyNumberDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!/\d/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }
  }
}
