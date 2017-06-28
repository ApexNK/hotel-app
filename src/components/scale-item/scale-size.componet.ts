import {Component, OnInit, ElementRef, Input} from '@angular/core';
@Component({
  selector: 'scale-item',
  template: `
    <img [src]="src" class="img">`,
  styles: [
    `.img{
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class ScaleItem implements OnInit{
  @Input() src = '';
  @Input() width:number = 16;
  @Input() height:number = 16;
  private oEle;
  constructor (private eleRef: ElementRef ) {
    this.oEle = this.eleRef.nativeElement;
  }
  ngOnInit () {
    const scale = this.height / this.width;
    const clientWidth = document.documentElement.clientWidth;

    setTimeout(() => {
      const clientRect = this.eleRef.nativeElement.getBoundingClientRect();
      const maxWidth = clientRect.width || clientWidth - clientRect.left - clientRect.right;
      this.oEle.style.display = 'block';
      this.oEle.style.overflow = 'hidden';
      this.oEle.style.width = maxWidth + 'px';
      this.oEle.style.height = maxWidth * scale + 'px';
    }, 0)


  }
}
