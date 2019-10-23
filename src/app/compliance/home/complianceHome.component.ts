import { Component, OnInit, ViewChild     } from '@angular/core';
import { ComponentFactoryResolver         } from '@angular/core';
import { ViewContainerRef, Input          } from '@angular/core';
import { ActivatedRoute                   } from '@angular/router';
import { Observable, timer, Subscription  } from 'rxjs';
import { SecurityService                  } from 'src/app/core/services/security.service';
import { LegalAgreementComponent          } from 'src/app/compliance/business/legalAgreement/legalAgreement.component';
import { ThemeService                     } from 'src/app/core/globals/theme';
import { EventMessage                     } from 'src/app/core/models/EventMessage';
import { EventService                     } from 'src/app/core/services/event.service';
import { ChangePasswordComponent          } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService                    } from 'src/app/core/globals/global.service';
import { ComplianceWelcomeComponent       } from './welcome/complianceWelcome.component';
import { ComplianceTypesComponent         } from '../catalogs/compliance/types/complianceTypes.component';
import { ComplianceTypesEditComponent     } from '../catalogs/compliance/types/edit/complianceTypesEdit.component';
import { ActivitiesComponent              } from '../catalogs/activities/activities.component';
import { ActivitiesEditComponent          } from '../catalogs/activities/edit/activitiesEdit.component';
import { ComplianceConfigurationComponent } from '../catalogs/compliance/configuration/complianceConfiguration.component';
import { ConfigActivitiesComponent        } from '../catalogs/compliance/configuration/configActivities/configActivities.component';
import { AcquisitionsComponent            } from '../business/acquisitions/acquisitions.component';
import { PerfilHomeComponent              } from '../business/perfil/home/perfilHome.component';
import { TaskPlanningComponent            } from '../administration/task-planning/task-planning.component';

@Component({
	selector        : 'app-complianceHome',
	templateUrl     : './complianceHome.component.html',
	styleUrls       : ['./complianceHome.component.scss'],
	entryComponents : [
		 ChangePasswordComponent
		,ComplianceWelcomeComponent
		,ComplianceTypesComponent
		,ComplianceTypesEditComponent
		,ActivitiesComponent
		,ActivitiesEditComponent
		,ComplianceConfigurationComponent
		,ConfigActivitiesComponent
		,AcquisitionsComponent
		,PerfilHomeComponent
		,LegalAgreementComponent
		,TaskPlanningComponent
	]
})
export class ComplianceHomeComponent implements OnInit {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions : Subscription[] = [];


	constructor(
		private  route                    : ActivatedRoute
		,private componentFactoryResolver : ComponentFactoryResolver
		,public  theme                    : ThemeService
		,public  globalService            : GlobalService
		,private eventService             : EventService
		,private securityService          : SecurityService
	) {
		globalService.setApp("Compliance");
  	}

	ngOnInit() {
		
		let url = `/assets/css/base/respaldo.css`;
		//document.getElementById("content_theme").setAttribute('href',url);
		

		this.subscribeOnChangePage();
	}

	ngAfterViewInit() {

		//this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent));
		this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent));
	}

	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}
	  	
	subscribeOnChangePage(){
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
				//debugger;
				this.globalService.setPage(event);
				this.viewContainerRef.clear();
				switch (event.descriptor) {
					case 'Compliance.Inicio':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.Autoridades':
						let refComplianceTypes = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesComponent));
						refComplianceTypes.instance.nombreCatalogo = 'Autoridades';
						refComplianceTypes.changeDetectorRef.detectChanges();
						break;
					case "Compliance.Autoridades.ABC":
						let refComplianceTypesEdit = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesEditComponent));
						refComplianceTypesEdit.instance.catalogType = event.data;
						refComplianceTypesEdit.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Categorías':
						let refActivities =
							this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ActivitiesComponent));
						refActivities.instance.nombreCatalogo = 'Categorías';
						refActivities.changeDetectorRef.detectChanges();
						break;  
					case 'Compliance.Categorías.ABC':
						let refActivitiesEdit = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ActivitiesEditComponent));
						refActivitiesEdit.instance.catalogType = event.data;
						refActivitiesEdit.changeDetectorRef.detectChanges();
						break;  
					case 'Compliance.Características': //Compliance.ConfiguracionDeCumplimientos.CumplimientoLegal.Caracteristicas
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceConfigurationComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Características.ABC': //Compliance.ConfiguracionDeCumplimientos.CumplimientoLegal.Caracteristicas.ABC
						let refConfigActivities = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ConfigActivitiesComponent));
						refConfigActivities.instance.catalogType = event.data;
						refConfigActivities.changeDetectorRef.detectChanges();
					break;
					case 'Compliance.Personal Competente':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(AcquisitionsComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.legalAgreement':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Cumplimiento Interno':
						break;
					default:
				}
			}
		}));
	}

	private clickMenu(event: EventMessage): void {
		debugger;
		this.viewContainerRef.clear();
		switch (event.id) {
		case 101:
			break;

		case 4: // Autoridades
			break;
		case 5: // Agregar
			break;


		case 6: // Categorias
			break;
		case 7: // Agregar
			break;


		case 8: // Caracteristicas
			break;
		case 9: // Agregar
			break;


		case 10: // Personal Competente
			break;
		case 11:
				let refPerfilHome = this.viewContainerRef
					.createComponent(this.componentFactoryResolver.resolveComponentFactory(PerfilHomeComponent));
				refPerfilHome.instance.idEmpleado = event.data.idEmpleado;
				refPerfilHome.instance.isViewable = true;
				refPerfilHome.instance.isdisabled = event.data.isdisabled;
				refPerfilHome.instance.tipo       = event.data.tipo;
				refPerfilHome.changeDetectorRef.detectChanges();
				break;
		case 12: // Caracteristicas
			break;
		case 13: // TaskPlanningComponent
			this.viewContainerRef
				.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskPlanningComponent)).changeDetectorRef.detectChanges();
			break;

		case 100:
			let refChangePasword = this.viewContainerRef
				.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent));
			refChangePasword.changeDetectorRef.detectChanges();
			break;
		}
	}

}

