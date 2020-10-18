import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/services/security.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { Validate } from 'src/app/core/helpers/util.validator.';

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private securityService: SecurityService,
    private router: Router,
    public toastr: ToastrManager,
    public globalService: GlobalService,
    private fb: FormBuilder
    ) {
  }
  ngOnInit() {
    console.log('on Init');
    this.changePasswordForm = this.fb.group({
      'password': new FormControl('',  Validators.minLength(8)),
      'confirmPassword': new FormControl('', Validators.minLength(8))
    });

  }

  save(value) {
    if(!Validate(value.password)) {
      this.toastr.errorToastr('La contraseña es incorrecta', '');
      return;
    }
    if(!Validate(value.confirmPassword)) {
      this.toastr.errorToastr('La confirmación de la contraseña es incorrecta', '');
      return;
    }
    if(value.password !== value.confirmPassword) {
      this.toastr.errorToastr('Las contraseñas no coinciden', '');
      return;
    }
    this.securityService.changePassword(value)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Cambiar Contraseña');
        });
  }
}
