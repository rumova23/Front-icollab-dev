import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interactive-image',
  templateUrl: './interactive-image.component.html',
  styleUrls: ['./interactive-image.component.scss']
})
export class InteractiveImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  animar(){
    const element =  document.querySelector('.my-element')
    element.classList.add('animated', 'bounceOutLeft')
  }
}
