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
import { App } from 'src/app/security/models/App';
import { Validate } from 'src/app/core/helpers/util.validator.';



@Component({
  selector: 'app-grantsEdit',
  templateUrl: './grantsEdit.component.html',
  styleUrls: ['./grantsEdit.component.scss']
})
export class GrantsEditComponent implements OnInit {
  grantForm: FormGroup;
  entity: Entity;
  grant: Grant;
  grantSelected: Grant;
  apps: Array<App>;
  fathersAll: Array<Grant>;
  fathers: Array<Grant>;
  isFather: boolean = false;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ) { }
  ngOnInit() {
    this.loadApps();
    this.loadFathers();
    this.grantForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'label': new FormControl('', Validators.required),
      'isFather':  new FormControl(false),
      'icon': new FormControl(''),
      'url': new FormControl(''),
      'app': new FormControl('', Validators.required),
      'father': new FormControl('')
    });

  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Permiso";
  }

  loadApps() {
    this.apps = this.securityService.loadApps();
  }

  loadFathers() {
    this.securityService.loadFathers()
    .subscribe(
      data => {
        this.fathersAll = data;
        this.fathers = this.fathersAll;
        if (this.entity.readOnly) {
          this.grantSelected.app = this.apps.filter(app => app.id === 
            this.grantSelected.idApp)[0];
            this.grantSelected.father = this.fathersAll.filter(father => father.id === 
              this.grantSelected.idFather)[0];
          this.grantForm.patchValue(this.grantSelected);
          this.grantForm.disable()
        } else if (this.entity.edit) {
          this.grantSelected.app = this.apps.filter(app => app.id === 
            this.grantSelected.idApp)[0];
            this.grantSelected.father = this.fathersAll.filter(father => father.id === 
              this.grantSelected.idFather)[0];
          this.grantForm.patchValue(this.grantSelected);
        } else {
          this.grant = {} as Grant;
        }
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
      });
  }

  compareObjects(o1: any, o2: any): boolean {
    return Validate(o1) && Validate(o1.id) && Validate(o1.name)
    && Validate(o2) && Validate(o2.id) && Validate(o2.name)
        o1.name === o2.name && o1.id === o2.id;
  }

  changeFather(event) {
    this.isFather = event.checked;
    if(this.isFather) {
      this.fathers = this.fathersAll;
      return;
    } else if(Validate(this.grantForm.value.app)) {
      this.fathers = this.fathersAll.filter(father => father.idApp === 
        this.grantForm.value.app.id);
    }
  }

  selectApp(event) {
    if(this.isFather) {
      return;
    }
    this.grantForm.patchValue( {'father':null} )
    this.fathers = this.fathersAll.filter(father => father.idApp === event.id);
  }

  save(value) {
    this.grant = value;
    if(!this.grant.isFather 
      && !Validate(this.grant.father)) {
        this.toastr.errorToastr('Seleccione un padre', 'Lo siento,');
        return;
    }
    this.grant.id = (this.grantSelected !== null && this.grantSelected !== undefined &&
      this.grantSelected.id !== null && this.grantSelected.id !== undefined
    ) ? this.grantSelected.id : 0;
    this.grant.save = this.entity.new;
    if(!this.grant.isFather) {
      this.grant.idFather = this.grant.father.id;
    }
    this.grant.idApp = this.grant.app.id;
    this.securityService.saveGrant(this.grant)
      .subscribe(
        data => {
          this.eventService.sendMainSecurity(new EventMessage(7, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }

}
