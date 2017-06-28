import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[scaleSize]' })
export class ScaleSize {
  constructor (private eleRef: ElementRef) {
    console.log(this.eleRef.nativeElement.offsetWidth);
  }
}
