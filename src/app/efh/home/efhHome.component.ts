import { Component, OnInit, ViewChild     } from '@angular/core';
import { ComponentFactoryResolver         } from '@angular/core';
import { ViewContainerRef, Input          } from '@angular/core';
import { ActivatedRoute                   } from '@angular/router';
import { Subscription                     } from 'rxjs';
import { SecurityService                  } from 'src/app/core/services/security.service';
import { ThemeService                     } from 'src/app/core/globals/theme';
import { EventMessage                     } from 'src/app/core/models/EventMessage';
import { EventService                     } from 'src/app/core/services/event.service';
import { ChangePasswordComponent          } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService                    } from 'src/app/core/globals/global.service';
import { EfhWelcomeComponent              } from './welcome/efhWelcome.component';
import { EfhEventTypeComponent            } from '../catalogs/eventtype/efhEventType.component';
import { EfhEventTypeEditComponent        } from '../catalogs/eventtype/edit/efhEventTypeEdit.component';
import { EfhFuelTypeComponent             } from '../catalogs/fueltype/efhFuelType.component';
import { EfhFuelTypeEditComponent         } from '../catalogs/fueltype/edit/efhFuelTypeEdit.component';
import { EfhUnitComponent                 } from '../catalogs/unit/efhUnit.component';
import { EfhUnitEditComponent             } from '../catalogs/unit/edit/efhUnitEdit.component';
import { EfhAddEventComponent             } from '../configuration/event/addevent/efhAddEvent.component';
import { EfhEditEventComponent            } from '../configuration/event/addevent/edit/efhEditEvent.component';
import { EfhUploadCommonComponent         } from '../upload/efh-upload-common/efh-upload-common.component';
import { EfhIndicatorComponent            } from '../catalogs/indicator/efhIndicator.component';
import { EfhIndicatorEditComponent        } from '../catalogs/indicator/edit/efhIndicatorEdit.component';
import { EfhAnaliticsEventComponent       } from '../analysis/event/efhAnaliticsEvent.component';
import { EfhAddIndicatorComponent         } from '../configuration/indicator/addindicator/efhAddIndicator.component';
import { EfhEditIndicatorComponent        } from '../configuration/indicator/addindicator/edit/efhEditIndicator.component';

@Component({
  selector: 'app-efh-home',
  templateUrl: './efhHome.component.html',
  styleUrls: ['./efhHome.component.scss'],
  entryComponents: [
    ChangePasswordComponent,
    EfhWelcomeComponent,
    EfhEventTypeComponent,
    EfhEventTypeEditComponent,
    EfhFuelTypeComponent,
    EfhFuelTypeEditComponent,
    EfhUnitComponent,
    EfhUnitEditComponent,
    EfhAddEventComponent,
    EfhEditEventComponent,
    EfhUploadCommonComponent,
    EfhIndicatorComponent,
    EfhIndicatorEditComponent,
    EfhAnaliticsEventComponent,
    EfhAddIndicatorComponent,
    EfhEditIndicatorComponent
  ]
})
export class EfhHomeComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  private subscriptions: Subscription[] = [];

  constructor(
      private route: ActivatedRoute,
      private componentFactoryResolver: ComponentFactoryResolver,
      public theme: ThemeService,
      public globalService: GlobalService,
      private eventService: EventService,
      private securityService: SecurityService
  ) {
    globalService.setApp('Efh');
  }

  ngOnInit() {
    this.subscribeOnChangePage();
  }

  ngAfterViewInit() {
    this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhWelcomeComponent));
    /*
    const refEventTypes = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhUnitEditComponent));
    let catalog = { id: 1, action: 'ver' } as CatalogType;
    refEventTypes.instance.catalogType = catalog;
    refEventTypes.changeDetectorRef.detectChanges();*/
  }

  ngOnDestroy() {
    for (const iterator in this.subscriptions) {
      this.subscriptions[iterator].unsubscribe();
    }
  }

  subscribeOnChangePage() {
    this.subscriptions.push(this.eventService.onChangePage.subscribe({
      next: (event: EventMessage) => {
        this.globalService.setPage(event);
        this.viewContainerRef.clear();
        switch (event.descriptor) {
          case 'Efh.Inicio':
            this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhWelcomeComponent))
                .changeDetectorRef
                .detectChanges();
            break;
          case 'Efh.Tipo de evento':
            const refEventTypes = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhEventTypeComponent));
            refEventTypes.instance.nombreCatalogo = 'Tipo de evento';
            refEventTypes.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Tipo de evento.ABC':
            const refEventTypesEdit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhEventTypeEditComponent));
            refEventTypesEdit.instance.catalogType = event.data;
            refEventTypesEdit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Tipo de combustible':
            const refFuelTypes = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhFuelTypeComponent));
            refFuelTypes.instance.nombreCatalogo = 'Tipo de combustible';
            refFuelTypes.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Tipo de combustible.ABC':
            const refFuelTypesEdit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhFuelTypeEditComponent));
            refFuelTypesEdit.instance.catalogType = event.data;
            refFuelTypesEdit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Unidad':
            const refUnit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhUnitComponent));
            refUnit.instance.nombreCatalogo = 'Unidad';
            refUnit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Unidad.ABC':
            const refUnitEdit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhUnitEditComponent));
            refUnitEdit.instance.catalogType = event.data;
            refUnitEdit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.indicadorComponent':
            const refIndicator = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhIndicatorComponent));
            refIndicator.instance.nombreCatalogo = 'Tipo de Indicador';
            refIndicator.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Tipo de Indicador.ABC':
            const refIndicatorEdit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhIndicatorEditComponent));
            refIndicatorEdit.instance.catalogType = event.data;
            refIndicatorEdit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Agregar eventos':
            const refEvent = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhAddEventComponent));
            refEvent.instance.nombreCatalogo = 'Agregar eventos';
            refEvent.changeDetectorRef.detectChanges();
            break;
          case 'Efh.Agregar eventos.ABC':
            const refEventEdit = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhEditEventComponent));
            refEventEdit.instance.eventType = event.data;
            refEventEdit.changeDetectorRef.detectChanges();
            break;
          case 'Efh.addIndicadorComponent':
            const refAddIndicator = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhAddIndicatorComponent));
            refAddIndicator.instance.nombreCatalogo = 'Agregar indicador';
            refAddIndicator.changeDetectorRef.detectChanges();
            break;
          case 'Efh.addIndicadorComponent.ABC':
            const refEditIndicator = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhEditIndicatorComponent));
            refEditIndicator.instance.indicatorType = event.data;
            refEditIndicator.changeDetectorRef.detectChanges();
            break;
          case 'Efh.EventosComponent':
            const refAnalysisEvent = this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(EfhAnaliticsEventComponent));
            refAnalysisEvent.instance.nombreCatalogo = 'Eventos';
            refAnalysisEvent.changeDetectorRef.detectChanges();
            break;
          case 'shared.header.changePassword':
            this.viewContainerRef
                .createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)).changeDetectorRef.detectChanges();
            break;
          default:
        }
      }
    }));
  }

}
