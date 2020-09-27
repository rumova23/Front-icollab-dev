import { Component, OnInit, ViewChild     } from '@angular/core';
import { ComponentFactoryResolver         } from '@angular/core';
import { ViewContainerRef, Input          } from '@angular/core';
import { ActivatedRoute                   } from '@angular/router';
import { Subscription                     } from 'rxjs';
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
import { TaskEditComponent                } from '../administration/task-planning/home-edit/task-edit/task-edit.component';
import { TemplateEditTaskComponent        } from '../administration/task-planning/home-edit/template-edit-task/template-edit-task.component';
import {ComplianceAddStaffComponent       } from '../business/competence/staff/addstaff/complianceAddStaff.component';
import {ComplianceProfileComponent        } from '../business/competence/staff/addstaff/profile/complianceProfile.component';
import {EvaluationComponent               } from '../business/competence/staff/evaluation/evaluation.component';
import {EditEvaluationHomeComponent} from '../business/competence/staff/evaluation/editevaluation/editEvaluationHome.component';
import {HistoryEvaluationComponent} from '../business/competence/staff/evaluation/historyevaluation/historyEvaluation.component';
import { TaskTrackingComponent } from '../business/legalCompliance/task-tracking/task-tracking.component';
import { ApprovalComplianceComponent } from '../business/legalCompliance/approval-compliance/approval-compliance.component';
import { GenerationTasksAssignmentResponsibilitiesComponent } from '../business/legalCompliance/generation-tasks-assignment-responsibilities/generation-tasks-assignment-responsibilities.component';
import { ICTaskTrackingComponent } from '../business/internalCompliance/ictask-tracking/ictask-tracking.component';
import { ICPlanningConfigurationComponent } from '../business/internalCompliance/icplanning-configuration/icplanning-configuration.component';
import { ICGenerationTasksAssignmentResponsibilitiesComponent } from '../business/internalCompliance/icgeneration-tasks-assignment-responsibilities/icgeneration-tasks-assignment-responsibilities.component';
import { ICComplianceConfigurationComponent } from '../business/internalCompliance/iccompliance-configuration/iccompliance-configuration.component';
import { ICApprovalComplianceComponent } from '../business/internalCompliance/icapproval-compliance/icapproval-compliance.component';

@Component({
	selector        : 'app-compliance-home',
	templateUrl     : './complianceHome.component.html',
	styleUrls       : ['./complianceHome.component.scss'],
	entryComponents : [ChangePasswordComponent,
		ComplianceWelcomeComponent,
		ComplianceTypesComponent,
		ComplianceTypesEditComponent,
		ActivitiesComponent,
		ActivitiesEditComponent,
		ComplianceConfigurationComponent,
		ConfigActivitiesComponent,
		AcquisitionsComponent,
		PerfilHomeComponent,
		LegalAgreementComponent,
		TaskPlanningComponent,
		TaskEditComponent,
		TemplateEditTaskComponent,
		ComplianceAddStaffComponent,
		ComplianceProfileComponent,
		EvaluationComponent,
		EditEvaluationHomeComponent,
		HistoryEvaluationComponent
	
		,TaskTrackingComponent
		,GenerationTasksAssignmentResponsibilitiesComponent
		,ApprovalComplianceComponent
		,ICTaskTrackingComponent
		,ICPlanningConfigurationComponent
		,ICGenerationTasksAssignmentResponsibilitiesComponent
		,ICComplianceConfigurationComponent
		,ICApprovalComplianceComponent
	]
})
export class ComplianceHomeComponent implements OnInit {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions: Subscription[] = [];

	constructor(
		private  route: ActivatedRoute,
		private componentFactoryResolver: ComponentFactoryResolver,
		public  theme: ThemeService,
		public  globalService: GlobalService,
		private eventService: EventService,
		private securityService: SecurityService
	) {
		globalService.setApp('Compliance');
	}

	ngOnInit() {
		this.subscribeOnChangePage();
	}

	ngAfterViewInit() {
		this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent));
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
					case 'Compliance.Home':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent))
							.changeDetectorRef
							.detectChanges();
						break;
						
					case 'Compliance.TaskTrackingComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(TaskTrackingComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.GenerationTasksAssignmentResponsibilitiesComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(GenerationTasksAssignmentResponsibilitiesComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ApprovalComplianceComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ApprovalComplianceComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ICTaskTrackingComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ICTaskTrackingComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ICPlanningConfigurationComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ICPlanningConfigurationComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ICGenerationTasksAssignmentResponsibilitiesComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ICGenerationTasksAssignmentResponsibilitiesComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ICComplianceConfigurationComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ICComplianceConfigurationComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.ICApprovalComplianceComponent':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ICApprovalComplianceComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.Autoridades':
					case 'Compliance.ComplianceTypesComponent':
						let refComplianceTypes = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesComponent));
						refComplianceTypes.instance.nombreCatalogo = 'authorities';
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
						refActivities.instance.nombreCatalogo = 'categories';
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
					
					case 'Compliance.Personal Competente.11':
						let refPerfilHome = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(PerfilHomeComponent));
							refPerfilHome.instance.idEmpleado = event.data.idEmpleado;
							refPerfilHome.instance.isViewable = true;
							refPerfilHome.instance.isdisabled = event.data.isdisabled;
							refPerfilHome.instance.tipo       = event.data.tipo;
							refPerfilHome.changeDetectorRef.detectChanges();
						break;
						
					case 'Compliance.Personal Competente.TaskEditComponent.14': // TaskEditComponent
						const _refTaskEdit = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(TemplateEditTaskComponent));
						_refTaskEdit.instance.complianceId = event.data.id;
						_refTaskEdit.instance.accion = event.data.action;
						_refTaskEdit.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Personal Competente.TaskEditComponent.14.hijo': // TaskEditComponent
						const factoryTaskEdit = this.componentFactoryResolver.resolveComponentFactory(TaskEditComponent);
						const refTaskEdit = this.viewContainerRef.createComponent(factoryTaskEdit);
						//refTaskEdit.instance.catalogType = event.data;
						refTaskEdit.changeDetectorRef.detectChanges();
						break;
				
					case 'Compliance.legalAgreement':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Cumplimiento Interno':
						break;
					case 'Compliance.Planeación':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskPlanningComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.registerPersonal':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceAddStaffComponent)).changeDetectorRef.detectChanges();
						break;
					case 'Compliance.registerPersonal.11':
						let refPerfil = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceProfileComponent));
						refPerfil.instance.inIdEmpleado = event.data.idEmpleado;
						refPerfil.instance.isViewable = 'true';
						refPerfil.instance.isdisabled =  event.data.isdisabled;
						refPerfil.instance.inTipo = event.data.tipo;
						refPerfil.instance.inElementData = event.data.elementData;
						refPerfil.changeDetectorRef.detectChanges();
						break;
					case 'shared.header.changePassword':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)).changeDetectorRef.detectChanges();
						break;
					case 'Compliance.evaluatePersonal':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(EvaluationComponent)).changeDetectorRef.detectChanges();
						break;
					case 'Compliance.evaluatePersonal.11':
						let refEditEvaluationHome = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(EditEvaluationHomeComponent));
						refEditEvaluationHome.instance.idEmpleado = event.data.idEmpleado;
						refEditEvaluationHome.instance.isViewable = true;
						refEditEvaluationHome.instance.isdisabled = event.data.isdisabled;
						refEditEvaluationHome.instance.tipo       = event.data.tipo;
						refEditEvaluationHome.instance.entidadEstatusTerminado = event.data.entidadEstatusTerminado;
						refEditEvaluationHome.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.evaluatePersonal.history':
						let refHistoryEvaluationHome = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(HistoryEvaluationComponent));
						refHistoryEvaluationHome.instance.inIdEmpleado = event.data.idEmpleado;
						refHistoryEvaluationHome.changeDetectorRef.detectChanges();
						break;
					default:
				}
			}
		}));
	}
}

