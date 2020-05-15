import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTrimContent]'
})
export class TrimContentDirective {
  @Input('appTrimContent') isTrimEnabled = false;
  @Output() ngModelChange = new EventEmitter();

  constructor(
      private renderer: Renderer2,
      private elementRef: ElementRef) {
  }

  @HostListener('input', ['$event.target.value'])
  handleInput(inputValue: any): void {
    if (this.isTrimEnabled) {
      let valueToProcess = inputValue.trimLeft();
      valueToProcess = valueToProcess.trimRight();
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', valueToProcess);
      this.ngModelChange.emit(valueToProcess);
    }
  }

}
