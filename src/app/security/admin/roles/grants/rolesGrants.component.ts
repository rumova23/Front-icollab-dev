import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Role } from 'src/app/security/models/Role';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventService } from 'src/app/core/services/event.service';
import { App } from 'src/app/security/models/App';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Validate } from 'src/app/core/helpers/util.validator.';


@Component({
  selector: 'app-rolesGrants',
  templateUrl: './rolesGrants.component.html',
  styleUrls: ['./rolesGrants.component.scss']
})
export class RolesGrantsComponent implements OnInit {
  role: Role;
  items: TreeviewItem[] = [];
  grants: any [] = [];
  fathers: number[] = [];
  values: number[] = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  apps: Array<App>;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    public globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ) { }
  ngOnInit() {
    this.loadGrantsRole();
    //this.items = this.securityService.getTreeSample();
  }

  private loadGrantsRole() {
    this.securityService.loadGrantsRole(this.role.id)
      .subscribe(
        data => {
          this.values = data;
          this.loadGrantsTree();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  private loadGrantsTree() {
    this.securityService.loadGrantsTree(this.role.idApp)
      .subscribe(
        data => {
          this.grants = data;
          const grants = data;
          for (var i = 0; i < grants.length; i++) {
            this.fathers.push(grants[i].value);
            if(Validate(grants[i].children)) {
              for(var a = 0; a < grants[i].children.length; a++) {
                grants[i].children[a].checked =
                 this.values.includes(grants[i].children[a].value);
              }
            }
          }
          for (var i = 0; i < grants.length; i++) {
            this.items.push(new TreeviewItem(grants[i], false));
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  getTitle() {
    return "Permiso para " + this.role.name;
  }

  selectedChange(event) {
    this.values = event;
    for (var i = 0; i < event.length; i++) {
      
    }
  }

  save() {
    this.securityService.saveRoleGrants({
      idApp: this.role.idApp,
      idRole: this.role.id,
      grants: this.values
    })
    .subscribe(
      data => {
         this.eventService.sendMainSecurity(new EventMessage(5, null));
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
      });
  }

}
