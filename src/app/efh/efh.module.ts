import { EFH_ROUTES                             } from './efh.routes';
import { NgModule                               } from '@angular/core';
import { BrowserModule                          } from '@angular/platform-browser';
import { SharedModule                           } from 'src/app/shared/shared.module';
import { ComponentsModule                       } from 'src/app/common/components.module';
import { MaterialModule                         } from 'src/app/modules/material-module';
import { MDBBootstrapModule, DropdownModule     } from 'angular-bootstrap-md';
import { NgbModule                              } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule       } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS    } from '@angular/common/http';
import { MatDatepickerModule                    } from '@angular/material';
import { MatNativeDateModule                    } from '@angular/material';
import { FlatpickrModule                        } from 'angularx-flatpickr';
import { ToastrModule                           } from 'ng6-toastr-notifications';
import { BlockUIModule                          } from 'ng-block-ui';
import { Constants                              } from '../core/globals/Constants';
import { EfhHomeComponent                       } from './home/efhHome.component';
import { EfhWelcomeComponent                    } from './home/welcome/efhWelcome.component';
import { EfhEventTypeComponent                  } from './catalogs/eventtype/efhEventType.component';
import { EfhEventTypeEditComponent              } from './catalogs/eventtype/edit/efhEventTypeEdit.component';
import { EfhFuelTypeComponent                   } from './catalogs/fueltype/efhFuelType.component';
import { EfhFuelTypeEditComponent               } from './catalogs/fueltype/edit/efhFuelTypeEdit.component';
import { EfhUnitComponent                       } from './catalogs/unit/efhUnit.component';
import { EfhUnitEditComponent                   } from './catalogs/unit/edit/efhUnitEdit.component';
import { EfhAddEventComponent                   } from './configuration/event/addevent/efhAddEvent.component';
import { EfhEditEventComponent                  } from './configuration/event/addevent/edit/efhEditEvent.component';
import { EfhCommentsComponent } from './comments/efh-comments.component';
import { EfhUploadComponent } from './upload/efh-upload.component';
import { EfhUploadCommonComponent } from './upload/efh-upload-common/efh-upload-common.component';
import { EfhIndicatorComponent } from './catalogs/indicator/efhIndicator.component';
import { EfhIndicatorEditComponent } from './catalogs/indicator/edit/efhIndicatorEdit.component';
import { EfhAnaliticsEventComponent } from './analysis/event/efhAnaliticsEvent.component';
import { EfhAddIndicatorComponent } from './configuration/indicator/addindicator/efhAddIndicator.component';
import { EfhEditIndicatorComponent } from './configuration/indicator/addindicator/edit/efhEditIndicator.component';

@NgModule({
  declarations: [EfhHomeComponent, EfhWelcomeComponent, EfhEventTypeComponent, EfhEventTypeEditComponent, EfhFuelTypeComponent, EfhFuelTypeEditComponent, EfhUnitComponent, EfhUnitEditComponent, EfhAddEventComponent, EfhEditEventComponent, EfhCommentsComponent, EfhUploadComponent, EfhUploadCommonComponent, EfhIndicatorComponent, EfhIndicatorEditComponent, EfhAnaliticsEventComponent, EfhAddIndicatorComponent, EfhEditIndicatorComponent ],
  imports: [
    EFH_ROUTES,
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
export class EfhModule { }
