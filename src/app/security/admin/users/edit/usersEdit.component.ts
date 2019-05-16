import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { User } from 'src/app/security/models/User';
import { Inputs } from 'src/app/core/models/Inputs';
import { Role } from 'src/app/security/models/Role';
import { SecurityService } from 'src/app/core/services/security.service';
import { Plant } from 'src/app/security/models/Plant';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Constants } from 'src/app/core/globals/Constants';
import { App } from 'src/app/security/models/App';



@Component({
  selector: 'app-usersEdit',
  templateUrl: './usersEdit.component.html',
  styleUrls: ['./usersEdit.component.scss']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup;
  entity: Entity;
  user: User;
  userSelected: User;
  inputs: Array<Inputs>;
  roles : Array<Role>;
  plants : Array<Plant>;
  apps : Array<App>;
  checked = false;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.loadRoles();
    this.loadPlants();
    this.loadApps();
    this.userForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'maidenName': new FormControl('', Validators.required),
      'user': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'active':  new FormControl(false),
      'roles': new FormControl('', Validators.required),
      'plants': new FormControl('', Validators.required),
      'apps': new FormControl('', Validators.required)
    });
    if(this.entity.readOnly) {
      this.userForm.patchValue(this.userSelected);
      this.userForm.disable() 
    } else if (this.entity.edit) {
      this.userForm.patchValue(this.userSelected);
      console.log(this.userForm.value);
    } else {
      this.user = {}
    }
    this.inputs =  [
      {label:"user",inputtype:"text",value:""},
      {label:"password",inputtype:"text", value:""},
      {label:"name",inputtype:"text", value:""},
      {label:"lastName",inputtype:"text", value:""},
      {label:"maidenName",inputtype:"text", value:""},
      {label:"active",inputtype:"text",checked:true}
    ];
  }

  loadRoles() {
    this.securityService.loadRoles()
    .subscribe(
      data => {
        this.roles = data.resultado;
        console.log(this.roles);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Roles');
      });
  }

  loadPlants() {
    this.plants = this.securityService.loadPlants();
  }

  loadApps() {
    this.apps = this.securityService.loadApps()
  }

  getTitle() {
    return ((this.entity.readOnly) ?
       "Consultar ":  (this.entity.edit) ?  "Editar " : "Agregar ") + "Usuario";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    console.log(value);
    this.user = value;
    this.user.id = (this.userSelected !== null && this.userSelected !== undefined &&
      this.userSelected.id !== null && this.userSelected.id !== undefined
    ) ? this.userSelected.id : 0;
    this.user.save = this.entity.new;
    this.securityService.saveUser(this.user)
      .subscribe(
        data => {
          console.log(data);
          this.eventService.sendMainSecurity(new EventMessage(3, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
