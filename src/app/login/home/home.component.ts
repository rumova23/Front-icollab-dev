import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security.service';
import { App } from 'src/app/security/models/App';
import { Utils } from 'angular-bootstrap-md/lib/utils/utils.class';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { GlobalService } from 'src/app/core/globals/global.service';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../login/css/style.css','../login/css/form.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	apps: Array<App>;

	constructor(private securityService: SecurityService,
			public  globalService: GlobalService,
		public router: Router) {
		
	}


	ngOnInit() {
		window.onscroll = function() {}; 

		$("#menu").css("display", "block");
		$("#menu").fadeIn(5000);
		$("#title").css("display", "block");
		$("#elaborado").css("display", "block");
		$(".menu").toggleClass("active");
		//this.loadAllUsers();
		this.loadApps();
	}

	loadApps() {
		this.apps = this.securityService.loadApps();
	}
	
	existApp(name: string) {
		return Validate(this.apps.filter(app => app.name === name)[0])
	}

	ngOnDestroy() {
		//this.currentUserSubscription.unsubscribe();
	}
	goToModule(uri){
		this.router.navigate([uri]);
	}
	logout() {
		this.securityService.logout();
  }
}
