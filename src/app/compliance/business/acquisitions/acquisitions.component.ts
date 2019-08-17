import { Component, OnInit } from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';


@Component({
  selector: 'app-acquisitions',
  templateUrl: './acquisitions.component.html',
  styleUrls: ['./acquisitions.component.scss']
})
export class AcquisitionsComponent implements OnInit {
  titulo = 'Personal Competente';
  constructor(private tableService: MdbTableService) { }

  ngOnInit() {
  }

}
