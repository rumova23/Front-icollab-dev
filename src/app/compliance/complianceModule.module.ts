import { COMPLIANCE_ROUTES                      } from './compliance.routes';
import { NgModule                               } from "@angular/core";
import { BrowserModule                          } from '@angular/platform-browser';
import { SharedModule                           } from 'src/app/shared/shared.module';
import { ComponentsModule                       } from 'src/app/common/components.module';
import { MaterialModule                         } from 'src/app/modules/material-module';

import { MDBBootstrapModule, DropdownModule     } from 'angular-bootstrap-md';
import { NgbModule                              } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule       } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS    } from '@angular/common/http';
import { BrowserAnimationsModule                } from '@angular/platform-browser/animations';
import { MatDatepickerModule                    } from '@angular/material';
import { MatNativeDateModule                    } from '@angular/material';
import { FlatpickrModule                        } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter            } from 'angular-calendar';
import { adapterFactory                         } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule                           } from 'ng6-toastr-notifications';
import { BlockUIModule                          } from 'ng-block-ui';

import { Constants                              } from '../core/globals/Constants';

import { ComplianceHomeComponent                } from './home/complianceHome.component';
import { ComplianceWelcomeComponent             } from './home/welcome/complianceWelcome.component';

import { ComplianceTypesComponent               } from './catalogs/compliance/types/complianceTypes.component';
import { ComplianceTypesEditComponent           } from './catalogs/compliance/types/edit/complianceTypesEdit.component';
import { ActivitiesComponent                    } from './catalogs/activities/activities.component';
import { ActivitiesEditComponent                } from './catalogs/activities/edit/activitiesEdit.component';
import { ComplianceConfigurationComponent       } from './catalogs/compliance/configuration/complianceConfiguration.component';
import { ConfigActivitiesComponent              } from './catalogs/compliance/configuration/configActivities/configActivities.component';
import { DepartmentsComponent                   } from './catalogs/departments/departments.component';
import { PeriodsComponent                       } from './catalogs/periods/periods.component';
import { DaysTypesComponent                     } from './catalogs/days/types/daysTypes.component';

import { AcquisitionsComponent                  } from './business/acquisitions/acquisitions.component';
import { PerfilHomeComponent                    } from './business/perfil/home/perfilHome.component';
import { LegalAgreementComponent                } from './business/legalAgreement/legalAgreement.component';
import { ObsyCommentsComponent                  } from './business/perfil/obsyComments/obsyComments.component';
import { CompetentStaffComponent                } from './business/acquisitions/competentStaff/competentStaff.component';
import { TablesLegalAgreementComponent          } from './business/legalAgreement/content/tablesLegalAgreement.component';
import { ResponsibilitiesComponent              } from './business/perfil/responsibilities/responsibilities.component';
import { EmployeesComponent                     } from './business/employees/employees.component';
import { PerfilComponent                        } from './business/perfil/perfil.component';
import { UploadComponent                        } from './business/perfil/upload/upload.component';
import { BehaviorComponent                      } from './business/perfil/behavior/behavior.component';
import { SkillsComponent                        } from './business/perfil/skills/skills.component';

import { DashboardAComponent                    } from './dashboards/dashboard-a/dashboard-a.component';
import { DashboardBComponent                    } from './dashboards/dashboard-b/dashboard-b.component';

import { DashboardsComponent                    } from './business/perfil/dashboards/dashboards.component';
import { TaskPlanningComponent                  } from './administration/task-planning/task-planning.component';
import { TaskEditComponent                      } from './administration/task-planning/home-edit/task-edit/task-edit.component';
import { TemplateEditTaskComponent } from './administration/task-planning/home-edit/template-edit-task/template-edit-task.component';







@NgModule({
    declarations:[
		 ComplianceHomeComponent
		,UploadComponent
		,ObsyCommentsComponent
		,TablesLegalAgreementComponent
		,CompetentStaffComponent
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
		,EmployeesComponent
		,ResponsibilitiesComponent
		,PerfilComponent
		,BehaviorComponent
		,SkillsComponent
		,DashboardAComponent
		,DashboardBComponent
		,DashboardsComponent
		,DepartmentsComponent
		,PeriodsComponent
		,DaysTypesComponent
		,TaskPlanningComponent
		,TaskEditComponent
		,TemplateEditTaskComponent
    ],
    exports:[
    ],
    imports:[
        COMPLIANCE_ROUTES,
        BrowserModule,
        SharedModule,
    	ComponentsModule,
    
        MDBBootstrapModule.forRoot(),
        NgbModule,
        FormsModule,
    	ReactiveFormsModule,
        MaterialModule,
      
		HttpClientModule,
		MatDatepickerModule,
		MatNativeDateModule, 
		FlatpickrModule.forRoot(),
		ToastrModule.forRoot(),
		BlockUIModule.forRoot({message: Constants.LOADING_MEESSAGE})
    ]
})
export class ComplianceModule{}
