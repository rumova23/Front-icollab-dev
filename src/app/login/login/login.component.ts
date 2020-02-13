import { Component, OnInit, OnDestroy                } from '@angular/core';
import { Router                                      } from '@angular/router';
import { FormBuilder, FormGroup, Validators          } from '@angular/forms';
import { AlertService                                } from 'src/app/core/services/alert.service';
import { SecurityService                             } from 'src/app/core/services/security.service';
import { EventService                                } from 'src/app/core/services/event.service';
import { EventMessage                                } from 'src/app/core/models/EventMessage';
import { EventBlocked                                } from 'src/app/core/models/EventBlocked';
import { GlobalService                               } from 'src/app/core/globals/global.service';
import { ThemeService                                } from 'src/app/core/globals/theme';
import { Validate                                    } from 'src/app/core/helpers/util.validator.';
import { App                                         } from 'src/app/security/models/App';
import { Subscription, Observable } from 'rxjs';
import { ToastrManager                               } from 'ng6-toastr-notifications';
import * as dis                                        from './js/animations';

@Component({
	selector    : 'app-login',
	templateUrl : './login.component.html',
	styleUrls   : ['./login.component.scss','./css/style.css','./css/form.css']
})
export class LoginComponent implements OnInit,OnDestroy {
	private subscriptions        : Subscription[]     = [];
	public  loginForm            : FormGroup;
	public  apps                 : Array<App>;
	public  appsIsActivate       : boolean = false;

	constructor(
		private formBuilder     : FormBuilder,
		private router          : Router,
		private securityService : SecurityService,
		public  globalService   : GlobalService,
		private eventService    : EventService,
		public  theme           : ThemeService,
		public  toastr          : ToastrManager,
		private alertService    : AlertService
	){}

	ngOnInit() {
		localStorage.clear();
		this.loginForm = this.formBuilder.group({
			usr  : ['', Validators.required],
			pass : ['', Validators.required]
		});
		this.loadApps();

		dis.disenio();
		//this.algo();
	}

	ngOnDestroy(): void {
		window.onscroll = function() {}; 
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
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
		if(this.apps){
			return Validate(this.apps.filter(app => app.name === name)[0]);
		}
		return false;
	}
	activateApp(){
		this.appsIsActivate = true;
		let selectores:any = document.getElementsByClassName("rotater");
		for (const ref of selectores) {
			if(this.existApp(ref.id)){
				ref.classList.remove("mydisabled");
			}else{
				//ref.classList.add("mydisabled");
			}
		}
	}
	
	mytimeout(): any {
		return new Observable(observer => {
			   setTimeout(() => {
				   observer.next();
			   }, 2000);
		});
	}
	goToModule(id, uri){
		window.onscroll = function() {}; 
		if(this.appsIsActivate && this.existApp(id)){
			window.onscroll = function() {}; 
			this.router.navigate([uri]);
		}
	}
	onSubmit() {
		//this.addBlock(1, null); //cargando
		//this.addBlock(2, null); //desbloquear
		if (this.loginForm.invalid) {
			this.toastr.errorToastr('Los datos son obligatorios', '');
			return;
		}

		const loginData = this.loginForm.value;
		
		this.subscriptions.push(
			this.securityService.login({user: loginData.usr,password: loginData.pass })
			.subscribe(
				data => {
					localStorage.setItem("user", JSON.stringify(data));
					this.loadApps();
					this.globalService.setPlant(this.securityService.loadPlants()[0]);
					dis.next(()=>{
						
						this.mytimeout().subscribe(() => {
							this.activateApp();
						});

					});
				},
				errorData => {
					this.toastr.errorToastr(errorData.error.message, '');
					console.log(errorData);
				}
			)
		);

	}

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
	logout() {
		if(this.appsIsActivate){
			localStorage.removeItem('user');
			localStorage.clear();
			this.router.navigate(['/']);
			
			dis.disenio();
		}
	}
}
