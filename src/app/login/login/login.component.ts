import { Component, OnInit } from '@angular/core';
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

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/style.css','./css/form.css']
})
export class LoginComponent implements OnInit {
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
    if (this.securityService.getCurrentUser()) {
      this.router.navigate(['/']);
    }

    try{
			this.theme.setApp("default");
			if(this.globalService.plant == undefined) this.globalService.plant = this.securityService.loadPlants()[0];// para dev ya que no entro por el home
		}catch(err){
			// Para que funcione en la .201
			///*
			this.globalService.plant = {id: 1, name: "AGUILA"};
			this.globalService.app   = {id: 2, name: "Safe"};
			//*/
		}
  }

  ngOnInit() {


    this.loginForm = this.formBuilder.group({
      usr: ['', Validators.required],
      pass: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    
    this.loadApps();

    this.disenadores();
    //this.algo();
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
disenadores(){

  
  //Inicializar de una vez
  $("body").css({ height: $(window).height() });
  $("#container").css({ height: $(window).height() * 2 });
  $("#world").css("display", "block");
  $("#world").css({ bottom: -$(window).height()});
  $("#form").css("display", "block");
  $("#world").fadeOut();
  $("#form").fadeOut();
  $("#form").css("display", "none");
  $("#menu").css("display", "none");
  $("#title").css("display", "none");
  $("#elaborado").css("display", "none");
  //vete primero all mundo
  $("html, body").animate(
    {
      scrollTop: $("#mundo").offset().top
    },
    500
  );

  setTimeout(function() {
    $("#form").css("display", "block");
    setTimeout(function() {
      $("#world").fadeIn(1000);
    }, 1000);
  }, 1000);

  //disable scrolling
  // window.onscroll = function() {
  //   window.scrollTo(0, $(window).height());
  // };
    if ($(window).width() >= 3000) {
        $("#login").css("font-size", "35px");
        $("#password").css("font-size", "35px");
        $("#loginButton").css("font-size", "35px");
        $("#formContent").css("margin-top", "-110px");
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
goCompliance() {
  this.router.navigate(['/compliance']);
}

ngAfterViewInit() {
  console.log(":::: ngAfterViewInit ::::");
  
  if(this.getgender()){
    console.log("id genero :::"+this.getgender());
    
    this.next();
  }
}
goSafe() {
  this.router.navigate(['/safe']);
}
goAdministrative_monitoring(){
  this.router.navigate(['/monitoring']);
}
goSecurity() {
  this.router.navigate(['/security']);
}

getgender() {
  let generoId = JSON.parse(localStorage.getItem('user'));
  return generoId ? true:false;
}

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  next() {
      
  window.onscroll = function() {};
  $("html, body").animate(
    {
      scrollTop: $("#constelacion").offset().top
    },
    4000
  );

  $("#menu").css("display", "block");
  $("#menu").fadeIn(5000);
  $("#title").css("display", "block");
  $("#elaborado").css("display", "block");
  $(".menu").toggleClass("active");
  setTimeout(function() {
    $("#form").css("display", "none");
    $("#world").css("display", "none");
  }, 5000);

  //enable  disable scroll
  // setTimeout(function() {
  //   window.onscroll = function() {
  //     window.scrollTo(0, 0);
  //   };
  // }, 5000);
  }
  onSubmit() {
    //this.next();//
    console.log(this.loginForm.value);
    this.addBlock(1, null);
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.addBlock(2, null);
      return;
    }

    const loginData = this.loginForm.value;
    
    this.securityService.login({
      user: loginData.usr,
      password: loginData.pass }
      )
      .subscribe(
        data => {
          localStorage.setItem("user", JSON.stringify(data));
          JSON.parse(localStorage.getItem("user"));
          this.loading = true;
          this.addBlock(2, null);
          //this.router.navigate([this.returnUrl]);
          this.loadApps();
          if(this.globalService.plant == undefined) this.globalService.plant = this.securityService.loadPlants()[0];// para dev ya que no entro por el home
          
          
          this.router.navigate(['/_home']);
          
          this.next();
        },
        errorData => {
          this.addBlock(2, null);
          console.log(errorData);
        });

  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
