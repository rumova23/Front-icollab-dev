import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { AuthoritiesComponent } from '../catalogs/authorities/authorities.component';
import { ChangePasswordComponent } from 'src/app/comun/changePassword/changePassword.component';


@Component({
  selector: 'app-complianceHome',
  templateUrl: './complianceHome.component.html',
  styleUrls: ['./complianceHome.component.scss'],
  entryComponents: [
    AuthoritiesComponent, ChangePasswordComponent
  ]
})
export class ComplianceHomeComponent implements OnInit {
  @Input() aside_open;
  serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventService: EventService) {
    this.serviceSubscription = this.eventService.onChangeMainCompliance.subscribe({
      next: (event: EventMessage) => {
        console.log(event);
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
  }

  private clickMenu(event: EventMessage): void {
    this.viewContainerRef.clear();
    switch (event.id) {
      case 3:
        const factoryChangePassword = this.componentFactoryResolver
          .resolveComponentFactory(ChangePasswordComponent);
        const refChangePassword =
          this.viewContainerRef.createComponent(factoryChangePassword);
        refChangePassword.changeDetectorRef.detectChanges();
        break;
      case 4:
        break;
    }
  }
}

