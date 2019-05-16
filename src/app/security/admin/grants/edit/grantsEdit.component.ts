import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Constants } from 'src/app/core/globals/Constants';
import { Grant } from 'src/app/security/models/Grant';



@Component({
  selector: 'app-grantsEdit',
  templateUrl: './grantsEdit.component.html',
  styleUrls: ['./grantsEdit.component.scss']
})
export class GrantsEditComponent implements OnInit {
  roleForm: FormGroup;
  entity: Entity;
  grant: Grant;
  grantSelected: Grant;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ) { }
  ngOnInit() {
    this.roleForm = this.fb.group({
      'name': new FormControl('', Validators.required)
    });
    if (this.entity.readOnly) {
      this.roleForm.patchValue(this.grantSelected);
      this.roleForm.disable()
    } else if (this.entity.edit) {
      this.roleForm.patchValue(this.grantSelected);
    } else {
      this.grant = {} as Grant;
    }
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Rol";
  }


  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    console.log(value);
    this.grant = value;
    this.grant.id = (this.grantSelected !== null && this.grantSelected !== undefined &&
      this.grantSelected.id !== null && this.grantSelected.id !== undefined
    ) ? this.grantSelected.id : 0;
    this.grant.save = this.entity.new;
    this.securityService.saveGrant(this.grant)
      .subscribe(
        data => {
          this.eventService.sendMainSecurity(new EventMessage(7, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
