import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";


@Directive({
  selector:'[outsideClick]',
})
export class PmsOutsideClick {
  @Output() outsideClick = new EventEmitter<void>();
  constructor(private elementRef:ElementRef) {}
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement:HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if(!clickedInside) {
      this.outsideClick.emit();
    }

  }
  
}