
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
import { PlannedPowersPPAFComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaF/plannedPowersPpaF.component';
import { PlannedPowersPPAGComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaG/plannedPowersPpaG.component';
import { PlannedPowersPPAHComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaH/plannedPowersPpaH.component';
import { PlannedPowersPPAIComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaI/plannedPowersPpaI.component';
import { ThemeService } from 'src/app/core/globals/theme';
import { SecurityService } from 'src/app/core/services/security.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-mockUpHome',
  templateUrl: './mockUpHome.component.html',
  styleUrls: ['./mockUpHome.component.scss'],
  entryComponents: [
    PlannedPowersPPAComponent, HeatRateRecordComponent, SalesOffersComponent, ClientsComponent,
    LegalAgreementComponent, SafeNewEventComponent,DashboardAComponent,SalesOffersV2Component
    ,PlannedPowersPpaBComponent,PlannedPowersPpaCComponent,PlannedPowersPPADComponent,PlannedPowersPPAEComponent
    ,PlannedPowersPPAFComponent, PlannedPowersPPAGComponent,PlannedPowersPPAHComponent,PlannedPowersPPAIComponent
  ]
})
export class MockUpHomeComponent implements OnInit {

	private subscriptions : Subscription[]     = [];
      
  @Input() asideOpen;
  public serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private route: ActivatedRoute,
    public globalService: GlobalService,
		public  theme                    : ThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private securityService: SecurityService,
    private eventService: EventService) {

      
    try{
			this.theme.setApp("Mock_Up");
			if(this.globalService.plant == undefined) this.globalService.plant = this.securityService.loadPlants()[0];// para dev ya que no entro por el home
		}catch(err){
			// Para que funcione en la .201
			///*
			this.globalService.plant = {id: 1, name: "AGUILA"};
			this.globalService.app   = {id: 2, name: "Compliance"};
			//*/
    }
    


  }

  ngOnInit() {

  }
  
	subscribeOnChangePage(){
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
        this.viewContainerRef.clear();
				switch (event.data.label) {
          case 'Link-MockUp':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAComponent)).changeDetectorRef.detectChanges();
              break;
          case 'planned-powers-ppa':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'heat-rate-record':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(HeatRateRecordComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'sales-offers':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(SalesOffersComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'registration-customer':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ClientsComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'Legal-Compliance':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'New Event':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(SafeNewEventComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'Monitoreo nivel 2':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(DashboardAComponent)).changeDetectorRef.detectChanges();
              break;  
          case 'sales-offers-V2':
              this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(SalesOffersV2Component)).changeDetectorRef.detectChanges();
              break;  
          case 'planned-powers-ppa-B':
              this.viewContainerRef.createComponent(
                this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPpaBComponent)
              ).changeDetectorRef.detectChanges();
              break;  
          case 'planned-powers-ppa-C':
              
              this.viewContainerRef.createComponent(
                this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPpaCComponent)
              ).changeDetectorRef.detectChanges();
              break;  
          case 'Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaD':
              this.viewContainerRef.createComponent(
                this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPADComponent)
              ).changeDetectorRef.detectChanges();
              break;  
              
          case 'Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaE':
            
            this.viewContainerRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAEComponent)
            ).changeDetectorRef.detectChanges();
            break;  
  
          case 'Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaG':
            
            this.viewContainerRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAGComponent)
            ).changeDetectorRef.detectChanges();
            break;  
          case 'Planeación de variables':
            
            this.viewContainerRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAFComponent)
            ).changeDetectorRef.detectChanges();
            break; 
          case 'Importación':
            
            this.viewContainerRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAHComponent)
            ).changeDetectorRef.detectChanges();
            break; 
    
          case 'planned-powers-ppa-I':
            
            this.viewContainerRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(PlannedPowersPPAIComponent)
            ).changeDetectorRef.detectChanges();
            break;     
				}
			}
		}));
	}
	
  toggleMenu() {
    this.eventService.sendLinkMockUp(new EventMessage(1, null));
  }
  clickMenu0(item) {
    console.log(item);
    let option = 0;
    let data = {};
    switch (item.label) {    
    }
    //this.clickMenu(new EventMessage(option, data));
    this.eventService.sendLinkMockUp(new EventMessage(option, data));
    
  }
}
