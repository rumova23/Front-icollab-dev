import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IdLabel} from '../../../../core/models/IdLabel';
import {MaestroOpcionDTO} from '../../../../compliance/models/maestro-opcion-dto';
import * as moment from 'moment';
import {GlobalService} from '../../../../core/globals/global.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventService} from '../../../../core/services/event.service';
import {SecurityService} from '../../../../core/services/security.service';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';
import {MasterCatalogService} from '../../../services/master-catalog.service';
import {BinnacleService} from '../../../services/binnacle.service';
import {EventMessage} from '../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../core/models/EventBlocked';

@Component({
  selector: 'app-safe-configuration-binnacle-edit',
  templateUrl: './safe-configuration-binnacle-edit.component.html',
  styleUrls: ['./safe-configuration-binnacle-edit.component.scss']
})
export class SafeConfigurationBinnacleEditComponent implements OnInit {
  formNewEvent: FormGroup;
  catalogType: any;
  lstEventClassification: IdLabel[] = [];
  lstEventClassificationDTO: Array<MaestroOpcionDTO>;
  lstFuels: IdLabel[] = [];
  lstEventsDTO: Array<MaestroOpcionDTO>;
  lstEvents: IdLabel[] = [];
  lstUnits: IdLabel[] = [];
  lstImpactContracts: IdLabel[] = [];
  lstRealsCcdv: IdLabel[] = [];
  lstToleranceBands: IdLabel[] = [];
  lstMarketTypes: IdLabel[] = [];
  lstSelatedServices: IdLabel[] = [];
  lstEquipment: IdLabel[] = [];
  lstWorkOrder: IdLabel[] = [];
  lstOperatorPlantOpen: IdLabel[] = [];
  lstOperatorPlantClose: IdLabel[] = [];
  lstSourceEvent: IdLabel[] = [];
  lstEventStatus: IdLabel[] = [];
  lstApprovalStatus: IdLabel[] = [];
  progress;
  constructor(
      private formBuilder: FormBuilder,
      public globalService: GlobalService,
      public toastr: ToastrManager,
      public eventService: EventService,
      private securityService: SecurityService,
      private confirmationDialogService: ConfirmationDialogService,
      private masterCatalogService: MasterCatalogService,
      private binnacleService: BinnacleService
  ) { }

  ngOnInit() {
      console.dir(this.catalogType);
      this.formNewEvent = this.formBuilder.group({
          binnacleEventID: ['', null],
        eventsClassificationId   : [{ value: null, disabled: false }],
        eventsId: [{ value: null, disabled: false }],
        fuelsId: [null],
        disabledFuelsId   : [false],
        powerMw: [{ value: null, disabled: false }],
        disabledPowerMw   : [false],
        unitsId: [null],
        disabledUnitsId   : [false],
        impactContractsId: [null],
        disabledImpactContractsId   : [false],
        realsCcdvId: [null],
        disabledRealsCcdvId: [false],
        toleranceBandsId: [null],
        disabledToleranceBandsId: [false],
        marketTypesId: [null],
        disabledMarketTypesId: [false],
        mwOffered: [{ value: null, disabled: false }],
        disabledMwOffered: [false],
        relatedServicesId: [null],
        disabledRelatedServicesId: [false],
        disabledlicenseNumber: [false],
        licenseNumber: [{ value: null, disabled: false }],
        disabledKLicenseNumber: [false],
        equipmentId: [null],
        disabledEquipmentId: [false],
        initialCharge: [{ value: null, disabled: false }],
        disabledInitialCharge: [false],
        finalCharge: [{ value: null, disabled: false }],
        disabledFinalCharge: [false],
        mwPowerLoss: [{ value: null, disabled: false }],
        disabledMwPowerLoss: [false],
        workOrderId: [null],
        disabledWorkOrderId: [false],
        licenseDescription: [{ value: null, disabled: false }],
        disabledLicenseDescription: [false]
        }
    );
    this.loadCatalog();
  }
    get fuelsId() {
        return this.formNewEvent.get('fuelsId');
    }
  loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
      if (catalog !== null) {
          catalog.forEach((element: MaestroOpcionDTO ) => {
              selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
          });
      }
  }
  onBuildEventAssociated(event) {
    this.lstEvents = [];
    this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === event.value));
  }

    compareTech(t1, t2): boolean {
        return t1 && t2 ? t1.id === t2.id : t1 === t2;
    }

    loadCatalog() {
    const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'REAL/CCDV', 'BANDA TOLERANCIA',
      'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'ORDEN TRABAJO'];
    this.masterCatalogService.listCatalog(names).subscribe(data  => {
      this.loadSelect(this.lstEventClassification, data['CLASIFICA EVENTO']);
      this.lstEventClassificationDTO = data['CLASIFICA EVENTO'];
      this.lstEventsDTO = data['EVENTO'];
      this.loadSelect(this.lstFuels, data['COMBUSTIBLE']);
      this.loadSelect(this.lstUnits, data['UNIDAD']);
      this.loadSelect(this.lstImpactContracts, data['CONTRATO IMPACTADO']);
      this.loadSelect(this.lstRealsCcdv, data['REAL/CCDV']);
      this.loadSelect(this.lstToleranceBands, data['BANDA TOLERANCIA']);
      this.loadSelect(this.lstMarketTypes, data['TIPO MERCADO MEM']);
      this.loadSelect(this.lstSelatedServices, data['SERVICIOS CONEXOS MEM']);
      this.loadSelect(this.lstEquipment, data['EQUIPO']);
      this.loadSelect(this.lstWorkOrder, data['ORDEN TRABAJO']);
    }, errorData => {
        this.toastr.errorToastr(errorData.error.message, 'Error!');
    }, () => {
        if (this.catalogType.action === 'editar') {
            this.formNewEvent.patchValue(this.catalogType.dto);
            this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.dto.eventsClassificationId));
            this.formNewEvent.controls.eventsClassificationId.disable();
            this.formNewEvent.controls.eventsId.disable();
        }
    });
  }
  onSubmitFormNewEvent(v) {
      if (this.catalogType.action === 'Guardar') {
          this.addBlock(1, '');
          this.binnacleService.saveBinnacleConfiguration(v).subscribe(
              data => {
                  this.toastr.successToastr('Guardado Completo', 'Exito!.');
                  this.addBlock(2, '');
              },
              errorData => {
                  this.addBlock(2, '');
                  this.toastr.errorToastr(errorData.error.message, 'Error!');
              });
      }

      if (this.catalogType.action === 'editar') {
          this.addBlock(1, '');
          this.formNewEvent.controls.eventsClassificationId.enable();
          this.formNewEvent.controls.eventsId.enable();
          this.binnacleService.updateBinnacleConfiguration(this.formNewEvent.value).subscribe(
              data => {
                  this.toastr.successToastr('Actualzacion Completa', 'Exito!.');
                  this.addBlock(2, '');
              },
              errorData => {
                  this.addBlock(2, '');
                  this.toastr.errorToastr(errorData.error.message, 'Error!');
              });
      }

  }
  btnClickBack() {
  }
  btnFinish() {
  }
  tableRowEdit(element) {
  }
  getNameUser() {
    return this.securityService.getNameUser() + ' ' + this.securityService.getLastNameUser();
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1,
        new EventBlocked(type, msg)));
  }
}
