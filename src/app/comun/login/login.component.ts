import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alert.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  appVersion = environment.appVersion;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private eventService: EventService,
    private alertService: AlertService) {
    if (this.securityService.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usr: ['', Validators.required],
      pass: ['', Validators.required]
    });
    /**
     // tslint:disable-next-line:jsdoc-format
     // tslint:disable-next-line:jsdoc-format
      tslint:disable-next-line:jsdoc-format
      tslint:disable-next-line:jsdoc-format
     this.loginForm = this.formBuilder.group({
       tslint:disable-next-line:jsdoc-format
      usr: ['', Validators.required],
      pass: ['', Validators.required],
      empr:  ['', Validators.required]
    });
     */
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    console.log(this.loginForm.value);
    this.addBlock(1, null);
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.addBlock(2, null);
      return;
    }

    /*

    var usuarios = [
      { username: 'odilon.cruz@naes.com', password: 'password123' },
      { username: 'jorge.esparza@naes.com', password: 'password234' },
      { username: 'leonel.rosas@naes.com', password: 'password345' },
      { username: 'carlos.zenteno@dgc-mex.com', password: 'password456' },
      { username: 'manuel.herrera@dgc-mex.com', password: 'password567' },
      { username: 'ivette.colin@dgc-mex.com', password: 'password678' },
      { username: 'ana.ponce@dgc-mex.com', password: 'password789' },
      { username: 'a', password: 'a' }
    ];

    // tslint:disable-next-line:prefer-const
    let autorizacion = usuarios.filter(c =>
      c.username === this.loginForm.controls.usr.value && c.password === this.loginForm.controls.pass.value);

    if (autorizacion.length > 0) {
      this.loading = true;
      this.router.navigate([this.returnUrl]);
    } */

    /*this.authenticationService.login(this.f.usr.value, this.f.pass.value)
        .pipe(first())
        .subscribe(
            data => {
              console.log("ingresa");
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
    });*/
    const loginData = this.loginForm.value;
    this.securityService.login({
      user: loginData.usr,
      password: loginData.pass }
      )
      .subscribe(
        data => {
          console.log("data");
          console.dir(data);
          if (data){
            localStorage.setItem("user", JSON.stringify(data));
            JSON.parse(localStorage.getItem("user"));
            this.loading = true;
            this.addBlock(2, null);
            this.router.navigate([this.returnUrl]);
          }
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
