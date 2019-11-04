import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alert.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { GlobalService }                       from 'src/app/core/globals/global.service';
import { App } from 'src/app/security/models/App';
import { ThemeService } from 'src/app/core/globals/theme';
import * as dis                           from './js/animations';

@Component({
	selector    : 'app-login',
	templateUrl : './login.component.html',
	styleUrls   : ['./css/style.css','./css/form.css']
})
export class LoginComponent implements OnInit,OnDestroy {

	apps: Array<App>;
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	appVersion = environment.appVersion;

	constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private securityService: SecurityService,
			public  globalService            : GlobalService,
		private eventService: EventService,
			public  theme                    : ThemeService,
		private alertService: AlertService) {

		

	}

	ngOnInit() {


		this.loginForm = this.formBuilder.group({
			usr  : ['', Validators.required],
			pass : ['', Validators.required]
		});
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
		
		this.loadApps();

		dis.disenio();
		//this.algo();
	}

	ngOnDestroy(): void {
		window.onscroll = function() {}; 
	}

	algo(){
		//https://codinglatte.com/posts/angular/working-with-assets-styles-and-scripts-in-angular/
		let promise = new Promise(resolve => {
			const scriptElement = document.createElement('script');
			scriptElement.src = "node_modules/chart.js/dist/Chart.js";
			scriptElement.onload = resolve;
			document.body.appendChild(scriptElement);
		});


		promise.then(
			result => {}, // shows "done!" after 1 second
			error => {} // doesn't run
		);
	}
	loadApps() {
		try{
			this.apps = this.securityService.loadApps();
		}catch(e){
			this.apps = null;
		}
	}

	existApp(name: string) {
		//return false;
		let fdafdsa = this.apps;
		if(this.apps){
			return Validate(this.apps.filter(app => app.name === name)[0]);
		}
		return false;
	}
	goToModule(uri){
		window.onscroll = function() {}; 
		this.router.navigate([uri]);
	}
	// convenience getter for easy access to form fields

	
	onSubmit() {
		console.log(this.loginForm.value);
		//this.addBlock(1, null);
		this.submitted = true;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			//this.addBlock(2, null);
			return;
		}

		const loginData = this.loginForm.value;
		
		this.securityService.login({
			user: loginData.usr,
			password: loginData.pass })
		.subscribe(
			data => {
				localStorage.setItem("user", JSON.stringify(data));
				this.loading = true;
				this.loadApps();
				this.globalService.setPlant(this.securityService.loadPlants()[0]);
				dis.next();
			},
			errorData => {
				console.log(errorData);
			});

	}

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
