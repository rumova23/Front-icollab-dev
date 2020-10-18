import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/core/services/security.service';
import { Role } from '../../models/Role';
import { User } from '../../models/User';
import { MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  loading: boolean;
  cols: any[];
  roles: Role[];
  users: MatTableDataSource<User>;
  rowsPorPage = [50, 100, 250, 500];

  constructor(private securityService: SecurityService,
    public toastr: ToastrManager,
    public globalService: GlobalService,
    private eventService: EventService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.loadUsers();
    this.cols = [
      'id',
      'user',
      'name',
      'lastName',
      'ver',
      'modificar'
    ];
    this.loading = false;
  }

  private loadUsers() {
    this.securityService.loadUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  newEntity() {
    this.eventService.sendMainSecurity(new
      EventMessage(4, { readOnly: false, edit: false, new: true, user: {} }));
  }

  action(user: User, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSecurity(new
          EventMessage(4, { readOnly: true, edit: false, new: false, user: user }));
        break;
      case 3:
        this.eventService.sendMainSecurity(new
          EventMessage(4, { readOnly: false, edit: true, new: false, user: user }));
        break;
    }
  }

}
