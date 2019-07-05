
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';
import { LegalAgreementComponent } from 'src/app/compliance/business/legalAgreement/legalAgreement.component';
import { DashboardAComponent } from 'src/app/compliance/dashboards/dashboard-a/dashboard-a.component';
import { PlannedPowersPPAComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpa/plannedPowersPpa.component';
import { PlannedPowersPpaBComponent } from 'src/app/safe/business/mdaPlanningProcess/planned-powers-ppa-b/planned-powers-ppa-b.component';
import { PlannedPowersPpaCComponent } from 'src/app/safe/business/mdaPlanningProcess/planned-powers-ppa-c/planned-powers-ppa-c.component';
import { PlannedPowersPPADComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaD/plannedPowersPpaD.component';
import { PlannedPowersPPAEComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaE/plannedPowersPpaE.component';
import { HeatRateRecordComponent } from 'src/app/safe/business/mdaPlanningProcess/heatRateRecord/heatRateRecord.component';
import { SalesOffersComponent } from 'src/app/safe/business/mdaPlanningProcess/salesOffers/salesOffers.component';
import { ClientsComponent } from 'src/app/safe/admin/clients/clients.component';
import { SafeNewEventComponent } from 'src/app/safe/business/logBook/newEvent/safeNewEvent.component';
import { SalesOffersV2Component } from 'src/app/safe/business/mdaPlanningProcess/salesOffersV2/salesOffersV2.component';

@Component({
  selector: 'app-mockUpHome',
  templateUrl: './mockUpHome.component.html',
  styleUrls: ['./mockUpHome.component.scss'],
  entryComponents: [
    PlannedPowersPPAComponent, HeatRateRecordComponent, SalesOffersComponent, ClientsComponent,
    LegalAgreementComponent, SafeNewEventComponent,DashboardAComponent,SalesOffersV2Component
    ,PlannedPowersPpaBComponent,PlannedPowersPpaCComponent,PlannedPowersPPADComponent,PlannedPowersPPAEComponent
  ]
})
export class MockUpHomeComponent implements OnInit {
    menu = [
        {
          id:'Link-MockUp',
          label:'Link-MockUp',
          icon:'/assets/images/skins/layer_7_ek1.png',
          children:[
            {label:'planned-powers-ppa'},
            {label:'heat-rate-record'},
            {label:'sales-offers'},
            {label:'sales-offers-V2'},
            {label:'registration-customer'},
            {label:'Legal-Compliance'},
            {label:'New Event'},
            {label:'Monitoreo nivel 2'},
            {label:'planned-powers-ppa-B'},
            {label:'planned-powers-ppa-C'},
            {label:'planned-powers-ppa-D'},
            {label:'planned-powers-ppa-E'}

          ]
        },
      ];
      
  @Input() aside_open;
  public serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private route: ActivatedRoute,
    private globalService: GlobalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventService: EventService) {
    this.serviceSubscription = this.eventService.onChangeMainLinkMockUp.subscribe({
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
  
  toggleMenu() {
    this.eventService.sendLinkMockUp(new EventMessage(1, null));
  }
  clickMenu0(item) {
    console.log(item);
    let option = 0;
    let data = {};
    switch (item.label) {
        case 'Link-MockUp':
            option = 3;
            data = item;
            break;
        case 'planned-powers-ppa':
            option = 3;
            data = item;
            break;  
        case 'heat-rate-record':
            option = 4;
            data = item;
            break;  
        case 'sales-offers':
            option = 5;
            data = item;
            break;  
        case 'registration-customer':
            option = 6;
            data = item;
            break;  
        case 'Legal-Compliance':
            option = 7;
            data = item;
            break;  
        case 'New Event':
            option = 8;
            data = item;
            break;  
        case 'Monitoreo nivel 2':
            option = 9;
            data = item;
            break;  
        case 'sales-offers-V2':
            option = 10;
            data = item;
            break;  
        case 'planned-powers-ppa-B':
            option = 11;
            data = item;
            break;  
        case 'planned-powers-ppa-C':
            option = 12;
            data = item;
            break;  
        case 'planned-powers-ppa-D':
            option = 13;
            data = item;
            break;  
            
        case 'planned-powers-ppa-E':
          option = 14;
          data = item;
          break;  

            
    }
    //this.clickMenu(new EventMessage(option, data));
    this.eventService.sendLinkMockUp(new EventMessage(option, data));
    
  }
  private clickMenu(event: EventMessage): void {
    this.viewContainerRef.clear();
    switch (event.id) {
        case 3:
            const factoryProducts = this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAComponent);
            const refProducts =
            this.viewContainerRef.createComponent(factoryProducts);
            refProducts.changeDetectorRef.detectChanges();
            break;
        case 4:
            const factoryHeatRateRecord = this.componentFactoryResolver.resolveComponentFactory(HeatRateRecordComponent);
            const refHeatRateRecord =
            this.viewContainerRef.createComponent(factoryHeatRateRecord);
            refHeatRateRecord.changeDetectorRef.detectChanges();
            break;
        case 5:
            const factorySalesOffers = this.componentFactoryResolver.resolveComponentFactory(SalesOffersComponent);
            const refSalesOffers =
            this.viewContainerRef.createComponent(factorySalesOffers);
            refSalesOffers.changeDetectorRef.detectChanges();
            break;
        case 6:
            const factoryRegistrationCustomer = this.componentFactoryResolver.resolveComponentFactory(ClientsComponent);
            const refRegistrationCustomer =
            this.viewContainerRef.createComponent(factoryRegistrationCustomer);
            refRegistrationCustomer.changeDetectorRef.detectChanges();
            break;
 
        case 7:
          const factoryLegalCompliance = this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent);
          const refLegalCompliance =
          this.viewContainerRef.createComponent(factoryLegalCompliance);
          refLegalCompliance.changeDetectorRef.detectChanges();
          break;
        case 8:
          const factoryNewEvent = this.componentFactoryResolver.resolveComponentFactory(SafeNewEventComponent);
          const refNewEvent =
          this.viewContainerRef.createComponent(factoryNewEvent);
          refNewEvent.changeDetectorRef.detectChanges();
          break;
        case 9:
          const factoryDashboard = this.componentFactoryResolver.resolveComponentFactory(DashboardAComponent);
          const refDashboard =
          this.viewContainerRef.createComponent(factoryDashboard);
          refDashboard.changeDetectorRef.detectChanges();
          break;
          
        case 10:
          const factorySalesOffersV2 = this.componentFactoryResolver.resolveComponentFactory(SalesOffersV2Component);
          const refSalesOffersV2 =
          this.viewContainerRef.createComponent(factorySalesOffersV2);
          refSalesOffersV2.changeDetectorRef.detectChanges();
          break;
        case 11:
          this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPpaBComponent)
            ).changeDetectorRef.detectChanges();
          break;
        case 12:
          this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPpaCComponent)
            ).changeDetectorRef.detectChanges();
          break;
        case 13:
          this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPADComponent)
            ).changeDetectorRef.detectChanges();
          break;
        case 14:
          this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAEComponent)
            ).changeDetectorRef.detectChanges();
          break;

            
    }
  }

  
}
