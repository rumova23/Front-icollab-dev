import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  tester(){
    console.log("evento click");
    
  }
}
