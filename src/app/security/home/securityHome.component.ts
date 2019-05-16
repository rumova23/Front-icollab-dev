import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { UsersComponent } from '../admin/users/users.component';
import { UsersEditComponent } from '../admin/users/edit/usersEdit.component';
import { RolesComponent } from '../admin/roles/roles.component';
import { RolesEditComponent } from '../admin/roles/edit/rolesEdit.component';
import { GrantsComponent } from '../admin/grants/grants.component';
import { GrantsEditComponent } from '../admin/grants/edit/grantsEdit.component';
import { RolesGrantsComponent } from '../admin/roles/grants/rolesGrants.component';


@Component({
  selector: 'app-securityHome',
  templateUrl: './securityHome.component.html',
  styleUrls: ['./securityHome.component.scss'],
  entryComponents: [
    UsersComponent, UsersEditComponent, RolesComponent, RolesEditComponent, 
    GrantsComponent,GrantsEditComponent,RolesGrantsComponent,
  ]
})
export class SecurityHomeComponent implements OnInit {
  @Input() aside_open;
  serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventService: EventService) {
    this.serviceSubscription = this.eventService.onChangeMainSecurity.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 1:
            this.aside_open = !this.aside_open;
            break;
          default:
            this.clickMenu(event);

            break;
        }
      }
    });
  }

  ngOnInit() {
    //this.clickMenu({ id: 3, data: null });
    /*
    this.clickMenu(new EventMessage(2 ,  {
      readOnly: false,
      edit: false,
      new: true
    })); */
  }

  private clickMenu(event: EventMessage): void {

    this.viewContainerRef.clear();
    switch (event.id) {
      case 3:
        const factoryUsers = this.componentFactoryResolver.resolveComponentFactory(UsersComponent);
        const refUsers =
          this.viewContainerRef.createComponent(factoryUsers);
        refUsers.changeDetectorRef.detectChanges();
        break;
      case 4:
        const factoryUsersEdit = this.componentFactoryResolver.resolveComponentFactory(UsersEditComponent);
        const refUsersEdit =
          this.viewContainerRef.createComponent(factoryUsersEdit);
        refUsersEdit.instance.entity = event.data;
        refUsersEdit.instance.userSelected = event.data.user;
        refUsersEdit.changeDetectorRef.detectChanges();
        break;
      case 5:
        const factoryRoles = this.componentFactoryResolver.resolveComponentFactory(RolesComponent);
        const refRoles =
          this.viewContainerRef.createComponent(factoryRoles);
        refRoles.changeDetectorRef.detectChanges();
        break;
      case 6:
        const factoryRolesEdit = this.componentFactoryResolver.resolveComponentFactory(RolesEditComponent);
        const refRolesEdit =
          this.viewContainerRef.createComponent(factoryRolesEdit);
        refRolesEdit.instance.entity = event.data;
        refRolesEdit.instance.roleSelected = event.data.role;
        refRolesEdit.changeDetectorRef.detectChanges();
        break;
      case 7:
        const factoryGrants = this.componentFactoryResolver.resolveComponentFactory(GrantsComponent);
        const refGrants =
          this.viewContainerRef.createComponent(factoryGrants);
        refGrants.changeDetectorRef.detectChanges();
        break;
      case 8:
        const factoryGrantsEdit =
          this.componentFactoryResolver.resolveComponentFactory(GrantsEditComponent);
        const refGrantsEdit =
          this.viewContainerRef.createComponent(factoryGrantsEdit);
        refGrantsEdit.instance.entity = event.data;
        refGrantsEdit.instance.grant = event.data.grant;
        refGrantsEdit.changeDetectorRef.detectChanges();
        break;
      case 100:
        const factoryRolesGrants =
          this.componentFactoryResolver.resolveComponentFactory(RolesGrantsComponent);
        const refRolesGrants =
          this.viewContainerRef.createComponent(factoryRolesGrants);
          refRolesGrants.instance.role = event.data.role;
          refRolesGrants.changeDetectorRef.detectChanges();
        break;  

    }
  }
}

