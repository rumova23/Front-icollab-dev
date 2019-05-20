
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';
import { PlannedPowersPPAComponent } from '../mda-planning-process/planned-powers-ppa/planned-powers-ppa.component';
import { HeatRateRecordComponent } from '../mda-planning-process/heat-rate-record/heat-rate-record.component';
import { SalesOffersComponent } from '../mda-planning-process/sales-offers/sales-offers.component';

@Component({
  selector: 'app-safeLinkMockUp',
  templateUrl: './safeLinkMockUp.component.html',
  styleUrls: ['./safeLinkMockUp.component.scss'],
  entryComponents: [
    PlannedPowersPPAComponent, HeatRateRecordComponent, SalesOffersComponent
  ]
})
export class SafeLinkMockUp implements OnInit {
    menu = [
        {
          id:'Safe-Link-MockUp',
          label:'Safe-Link-MockUp',
          icon:'/assets/images/skins/layer_7_ek1.png',
          children:[
            {label:'planned-powers-ppa'},
            {label:'heat-rate-record'},
            {label:'sales-offers'}
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
    this.serviceSubscription = this.eventService.onChangeMainSafe.subscribe({
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
  
  clickMenu0(item) {
    console.log(item);
    let option = 0;
    let data = {};
    switch (item.label) {
        case 'Safe-Link-MockUp':
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


    }
    this.clickMenu(new EventMessage(option, data));
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
 

    }
  }

  
}
