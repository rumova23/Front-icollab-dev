import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { User } from 'src/app/security/models/User';
import { Role } from 'src/app/security/models/Role';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Constants } from 'src/app/core/globals/Constants';
import { App } from 'src/app/security/models/App';



@Component({
  selector: 'app-rolesEdit',
  templateUrl: './rolesEdit.component.html',
  styleUrls: ['./rolesEdit.component.scss']
})
export class RolesEditComponent implements OnInit {
  roleForm: FormGroup;
  entity: Entity;
  role: Role;
  roleSelected: User;
  apps: Array<App>;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ){}
  ngOnInit() {
    this.loadApps();
    this.roleForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'app': new FormControl('', Validators.required)
    });
    if (this.entity.readOnly) {
      this.roleForm.patchValue(this.roleSelected);
      this.roleForm.disable()
    } else if (this.entity.edit) {
      this.roleForm.patchValue(this.roleSelected);
    } else {
      this.role = {} as Role;
    }
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Rol";
  }

  loadApps() {
    this.apps = this.securityService.loadApps();
  }


  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    this.role = value;
    this.role.id = (this.roleSelected !== null && this.roleSelected !== undefined &&
      this.roleSelected.id !== null && this.roleSelected.id !== undefined
    ) ? this.roleSelected.id : 0;
    this.role.idApp = this.role.app.id;
    this.role.save = this.entity.new;
    this.securityService.saveRole(this.role)
      .subscribe(
        data => {
          this.eventService.sendMainSecurity(new EventMessage(5, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }

}
