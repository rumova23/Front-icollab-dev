import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acquisitions',
  templateUrl: './acquisitions.component.html',
  styleUrls: ['./acquisitions.component.scss']
})
export class AcquisitionsComponent implements OnInit {
  titulo: String = "Cumplimiento de Adquisiciones";
  constructor() { }
  alert = function(arg){
      alert(arg);
  }

  ngOnInit() {
  }

}
