import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Role } from 'src/app/security/models/Role';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { App } from 'src/app/security/models/App';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Constants } from 'src/app/core/globals/Constants';



@Component({
  selector: 'app-rolesGrants',
  templateUrl: './rolesGrants.component.html',
  styleUrls: ['./rolesGrants.component.scss']
})
export class RolesGrantsComponent implements OnInit {
  role: Role;
  items: TreeviewItem[] = [];
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
    private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService
  ) { }
  ngOnInit() {
    this.loadApps();
    this.loadGrantsRole();
    //this.items = this.securityService.getTreeSample();
  }

  loadApps() {
    this.apps = this.securityService.loadApps();
  }

  selectedChange(event) {
    console.log(event);
  }

  private loadGrantsTree() {
    this.securityService.loadGrantsTree(this.role.idApp)
      .subscribe(
        data => {
          const fathers = data.resultado;
          for (var i = 0; i < fathers.length; i++) {
            for(var a = 0; a < fathers[i].children.length; a++) {
              console.log(fathers[i].children[a]);
              fathers[i].children[a].checked = this.values.includes(fathers[i].children[a].value);
            }
          }
          for (var i = 0; i < fathers.length; i++) {
            this.items.push(new TreeviewItem(fathers[i], false));
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Roles');
        });
  }

  private loadGrantsRole() {
    this.securityService.loadGrantsRole(this.role.id)
      .subscribe(
        data => {
          this.values = data.resultado;
          this.loadGrantsTree();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Roles');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }



}
