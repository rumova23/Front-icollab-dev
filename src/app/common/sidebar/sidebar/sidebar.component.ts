import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	getgender(){
		let generoId = JSON.parse(localStorage.getItem('user'));
		generoId = generoId ? generoId['generoId']: 2;
		return generoId;
	}
}
