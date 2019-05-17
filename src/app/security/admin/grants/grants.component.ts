import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/services/security.service';
import { Role } from '../../models/Role';
import { MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Grant } from '../../models/Grant';
import { Constants } from 'src/app/core/globals/Constants';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.css']
})

export class GrantsComponent implements OnInit {
  loading: boolean;
  cols: any[];
  grants: MatTableDataSource<Grant>;
  rowsPorPage = [50, 100, 250, 500];

  constructor(private securityService: SecurityService,
    public toastr: ToastrManager,
    private globalService: GlobalService,
    private eventService: EventService) { }

  ngOnInit() {
    this.loadGrants();
    this.cols = [
      'id',
      'name',
      'ver',
      'modificar'
    ];
    this.loading = false;
  }

  private loadGrants() {
    this.securityService.loadGrants()
      .subscribe(
        data => {
          this.grants = data.resultado;
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Permisos');

        });
  }

  newEntity() {
    this.eventService.sendMainSecurity(new
      EventMessage(8, { readOnly: false, edit: false, new: true, grant: {}}));
  }

  action(grant : Grant, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSecurity(new
          EventMessage(8, { readOnly: true, edit: false, new: false, grant: grant }));
        break;
      case 3:
        this.eventService.sendMainSecurity(new
          EventMessage(8, { readOnly: false, edit: true, new: false,grant: grant }));
        break;
    }
  }

}
