import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appRestrictInput]'
})
export class RestrictInputDirective {

  @Input() typeInputs: string;

  private regexMap = {
    integer: /[^0-9]/g,
    words: /[^A-záÁéÉíÍóÓúÚüÜñÑ\s]/g,
    alphanumeric: /[^A-z0-9- ]/g
    /* ^[0-9]+([,][0-9]+)?$ */
  };

  constructor(private control: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.control.control.patchValue(value.replace(this.regexMap[this.typeInputs], ''));
  }
}
