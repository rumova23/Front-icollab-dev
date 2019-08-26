import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { ChangePasswordComponent } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { MonitoringPhase3Component } from '../boards/phase3/monitoringPhase3.component';
import { MonitoringPhase2Component } from '../boards/phase2/monitoringPhase2.component';
 
@Component({
  selector: 'app-monitoringHome',
  templateUrl: './monitoringHome.component.html',
  styleUrls: ['./monitoringHome.component.scss'],
  entryComponents: [
    ChangePasswordComponent, MonitoringPhase3Component, MonitoringPhase2Component
  ]
})
export class MonitoringHomeComponent implements OnInit {
  @Input() aside_open;
  serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;


  constructor(private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    public globalService: GlobalService,
    private eventService: EventService
   ,private securityService: SecurityService) {

      this.serviceSubscription = this.eventService.onChangeMainMonitoring.subscribe({
        next: (event: EventMessage) => {
          console.log("complianceHome.component.ts this.eventService.onChangeMainMonitoring.subscribe(..  (event: EventMessage)");
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
    setTimeout(() => this.periodo(), 1000);
  }

  getNameUser() {
    let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
    return name;
  }
  
  getgender(){
    let generoId = JSON.parse(localStorage.getItem('user'));
    //console.log("generoId");
    //console.dir(generoId);  
    generoId = generoId['generoId'];
    //console.log("generoId");
    //console.dir(generoId);
    return generoId;
  }
  private periodo(){
    this.eventService.sendMainMonitoring(new EventMessage(4, null));
  }
 
  private clickMenu(event: EventMessage): void {
      console.log("event");
      console.dir(event);
    this.viewContainerRef.clear();
    let factoryComplianceTypes;
    let refComplianceTypes;
    let factoryComplianceTypesEdit;
    let refComplianceTypesEdit;

    switch (event.id) {

      case 2:
        this.viewContainerRef.createComponent(
          this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component)
        ).changeDetectorRef.detectChanges();
        break;
      case 3:
        this.viewContainerRef.createComponent(
          this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component)
        ).changeDetectorRef.detectChanges();
        break;

      case 100:
          this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)
          ).changeDetectorRef.detectChanges();
        break;


    }
  }
}

