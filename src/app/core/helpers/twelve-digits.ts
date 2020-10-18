import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwelveDigitsDecimaNumber]'
})

export class TwelveDigitsDirective {

 // Allow decimal numbers and negative values
 private regex: RegExp = new RegExp("^\d{1,6}(\.\d{1,2})?$");
 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
 private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

 constructor(private el: ElementRef) {
 }
 @HostListener('keydown', ['$event'])
 onKeyDown(event: KeyboardEvent) {
   // Allow Backspace, tab, end, and home keys
   if (this.specialKeys.indexOf(event.key) !== -1) {
     return;
   }
   let current: string = this.el.nativeElement.value;
   let next: string = current.concat(event.key);
   if (next && !String(next).match(this.regex)) {
     event.preventDefault();
   }
 }
}
