import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/services/security.service';
import { Role } from '../../models/Role';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { ToastrManager } from 'ng6-toastr-notifications';
import { App } from '../../models/App';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  loading: boolean;
  cols: any[];
  roles: Array<Role>;
  rowsPorPage = [50, 100, 250, 500];
  apps: Array<App>;
  constructor(private securityService: SecurityService,
    public toastr: ToastrManager,
    public globalService: GlobalService,
    private eventService: EventService) { }

  ngOnInit() {
    this.loading = true;
    this.loadRoles();
    this.cols = [
      'id',
      'name',
      'app',
      'ver',
      'modificar',
      'permisos'
    ];
    this.loading = false;
  }

  private loadRoles() {
    this.securityService.loadRoles()
      .subscribe(
        data => {
          this.roles = data;
          this.loadApps();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  loadApps() {
    this.apps = this.securityService.loadApps();
    let data =  this.roles;
    for(var i = 0; i< data.length; i++) {
        data[i].app = this.apps.filter(app => app.id === data[i].idApp)[0];
    }
  }

  newEntity() {
    this.eventService.sendMainSecurity(new
      EventMessage(6, { readOnly: false, edit: false, new: true, user: {}}));
  }

  action(role : Role, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSecurity(new
          EventMessage(6, { readOnly: true, edit: false, new: false, role: role }));
        break;role
      case 3:
        this.eventService.sendMainSecurity(new
          EventMessage(6, { readOnly: false, edit: true, new: false,role: role }));
        break;
      case 4:
        this.eventService.sendMainSecurity(new
          EventMessage(9, {role: role }));
        break;  
    }
  }

}
