import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { ChangePasswordComponent } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ComplianceTypesComponent } from '../catalogs/compliance/types/complianceTypes.component';
import { ComplianceTypesEditComponent } from '../catalogs/compliance/types/edit/complianceTypesEdit.component';
import { ActivitiesComponent } from '../catalogs/activities/activities.component';
import { ActivitiesEditComponent } from '../catalogs/activities/edit/activitiesEdit.component';
import { ComplianceConfigurationComponent } from '../catalogs/compliance/configuration/complianceConfiguration.component';
import { ConfigActivitiesComponent } from '../catalogs/compliance/configuration/configActivities/configActivities.component';
import { ComplianceWelcomeComponent } from './welcome/complianceWelcome.component';
import { AcquisitionsComponent } from '../business/acquisitions/acquisitions.component';
import { PerfilHomeComponent } from '../business/perfil/home/perfilHome.component';
import { SecurityService } from 'src/app/core/services/security.service';
import { LegalAgreementComponent } from 'src/app/compliance/business/legalAgreement/legalAgreement.component';
import { TaskPlanningComponent } from 'src/app/compliance/administration/task-planning/task-planning.component';

@Component({
  selector: 'app-complianceHome',
  templateUrl: './complianceHome.component.html',
  styleUrls: ['./complianceHome.component.scss'],
  entryComponents: [
    ChangePasswordComponent, ComplianceWelcomeComponent,
    ComplianceTypesComponent, ComplianceTypesEditComponent, ActivitiesComponent,
    ActivitiesEditComponent, ComplianceConfigurationComponent,
    ConfigActivitiesComponent, AcquisitionsComponent, PerfilHomeComponent, LegalAgreementComponent, TaskPlanningComponent
  ]
})
export class ComplianceHomeComponent implements OnInit {
  @Input() asideOpen;
  serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;


  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              public globalService: GlobalService,
              private eventService: EventService,
              private securityService: SecurityService) {

      this.serviceSubscription = this.eventService.onChangeMainCompliance.subscribe({
        next: (event: EventMessage) => {
          switch (event.id) {
            case 1:
              this.asideOpen = !this.asideOpen;
              break;
            default:
              this.clickMenu(event);
              break;
          }
        }
      });
  }

  ngOnInit() {
    setTimeout(() => this.periodo(), 5000);
  }

  getNameUser() {
    const name = this.securityService.getNameUser() + ' ' + this.securityService.getLastNameUser();
    return name;
  }

  getgender() {
    let generoId = JSON.parse(localStorage.getItem('user'));
    generoId = generoId.generoId;
    return generoId;
  }

  private periodo() {
    this.eventService.sendMainCompliance(new EventMessage(101, null));
  }

  private clickMenu(event: EventMessage): void {
    this.viewContainerRef.clear();
    let factoryComplianceTypes;
    let refComplianceTypes;
    let factoryComplianceTypesEdit;
    let refComplianceTypesEdit;
    switch (event.id) {
      case 101:
        const factoryHome =
          this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent);
        const refHome =
          this.viewContainerRef.createComponent(factoryHome);
        refHome.changeDetectorRef.detectChanges();
        break;

      case 4: // Autoridades
        factoryComplianceTypes =
          this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesComponent);
        refComplianceTypes =
          this.viewContainerRef.createComponent(factoryComplianceTypes);
        refComplianceTypes.instance.nombreCatalogo = 'Autoridades';
        refComplianceTypes.changeDetectorRef.detectChanges();
        break;
      case 5: // Agregar
        factoryComplianceTypesEdit =
          this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesEditComponent);
        refComplianceTypesEdit =
          this.viewContainerRef.createComponent(factoryComplianceTypesEdit);
        refComplianceTypesEdit.instance.catalogType = event.data;
        refComplianceTypesEdit.changeDetectorRef.detectChanges();
        break;


      case 6: // Categorias
        const factoryActivities =
          this.componentFactoryResolver.resolveComponentFactory(ActivitiesComponent);
        const refActivities =
          this.viewContainerRef.createComponent(factoryActivities);
        refActivities.instance.nombreCatalogo = 'Categorías';
        refActivities.changeDetectorRef.detectChanges();
        break;
      case 7: // Agregar
        const factoryActivitiesEdit =
          this.componentFactoryResolver.resolveComponentFactory(ActivitiesEditComponent);
        const refActivitiesEdit =
          this.viewContainerRef.createComponent(factoryActivitiesEdit);
        refActivitiesEdit.instance.catalogType = event.data;
        refActivitiesEdit.changeDetectorRef.detectChanges();
        break;


      case 8: // Caracteristicas
        const factoryComplianceConf =
          this.componentFactoryResolver.resolveComponentFactory(ComplianceConfigurationComponent);
        const refComplianceConf =
          this.viewContainerRef.createComponent(factoryComplianceConf);
        refComplianceConf.changeDetectorRef.detectChanges();
        break;
      case 9: // Agregar
         const factoryConfigActivities =
           this.componentFactoryResolver.resolveComponentFactory(ConfigActivitiesComponent);
         const refConfigActivities =
           this.viewContainerRef.createComponent(factoryConfigActivities);
         refConfigActivities.instance.catalogType = event.data;
         refConfigActivities.changeDetectorRef.detectChanges();
         break;


       case 10: // Personal Competente
          const factoryAdquisitions =
            this.componentFactoryResolver.resolveComponentFactory(AcquisitionsComponent);
          const refAdquisitions =
            this.viewContainerRef.createComponent(factoryAdquisitions);
          refAdquisitions.changeDetectorRef.detectChanges();
          break;
        case 11:
            const factoryPerfilHome =
              this.componentFactoryResolver.resolveComponentFactory(PerfilHomeComponent);
            const refPerfilHome =
              this.viewContainerRef.createComponent(factoryPerfilHome);
            refPerfilHome.instance.idEmpleado = event.data.idEmpleado;
            refPerfilHome.instance.isViewable = true;
            refPerfilHome.instance.isdisabled = event.data.isdisabled;
            refPerfilHome.instance.tipo = event.data.tipo;
            refPerfilHome.changeDetectorRef.detectChanges();
            break;
      case 12: // Caracteristicas
        this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent)).changeDetectorRef.detectChanges();
        break;
      case 13: // TaskPlanningComponent
        this.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(TaskPlanningComponent)).changeDetectorRef.detectChanges();
        break;

      case 100:
        const factoryChangePasword =
          this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent);
        const refChangePasword =
          this.viewContainerRef.createComponent(factoryChangePasword);
        refChangePasword.changeDetectorRef.detectChanges();
        break;
    }
  }
}

