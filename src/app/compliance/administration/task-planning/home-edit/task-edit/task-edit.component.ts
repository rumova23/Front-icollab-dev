import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import {CatalogType} from 'src/app/compliance/models/CatalogType';
import {Combo} from '../../../../models/Combo';
import { TagService } from 'src/app/compliance/services/tag.service';
import { AdministratorComplianceService } from 'src/app/compliance/administration/services/administrator-compliance.service';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';
import {ComplianceDTO} from '../../../../models/compliance-dto';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  titulo = 'Edicion Tareas';
  @Input() accion: string;
  @Input() compliance: ComplianceDTO;
  configActividadesForm: FormGroup;
  plantaDefault = this.globalService.plantaDefaultId;
  submitted = false;

  comboActividades: Array<Combo>;
  @Input() comboTipoCumplimiento: Array<Combo>;
  @Input() comboAutoridad: Array<Combo>;
  @Input() comboTipoAplicacion: Array<Combo>;
  @Input() comboPeriodoEntrega: Array<Combo>;
  @Input() comboTipoDias: Array<Combo>;
  @Input() comboEstatus: Array<Combo>;
  @Input() comboUnitPeriod: Array<Combo>;
  listaCombos: Array<any>;
  constructor(
      private formBuilder: FormBuilder,
      public globalService: GlobalService,
      private tagService: TagService,
      private administratorComplianceService: AdministratorComplianceService) {
        this.configActividadesForm = this.formBuilder.group({
        fFechaInicio: ['', Validators.required],
        fFechaFin: ['', Validators.required],
        fPersonaId: [{ value: '', disabled: false }, Validators.required],
        fTipoCumplimiento: [{ value: '', disabled: false }, Validators.required],
        fActividad: [{ value: '', disabled: false }, Validators.required],
        fIdTag: ['', ''],
        fTag: ['', Validators.required],
        fDescripcion: ['', Validators.required],
        fClasificacionActividad: ['', Validators.required],
        fRequisitoLegal: ['', Validators.required],
        fAutoridad: ['', Validators.required],
        fTipoAplicacion: ['', Validators.required],
        fPeriod: ['', Validators.required],
        fUnitPeriod: ['', Validators.required],
        fTipoDias: ['', Validators.required],
      });
    }

  ngOnInit() {
      console.log('RTC');
      console.dir(this.compliance);
      console.log('RTC');
      this.comboActividades = new Array<Combo>();
      this.configActividadesForm.controls.fIdTag.setValue(this.compliance.tagDTO.idTag);
      this.configActividadesForm.controls.fTag.setValue(this.compliance.tagDTO.tag);
      this.configActividadesForm.controls.fDescripcion.setValue(this.compliance.tagDTO.description);
      this.configActividadesForm.controls.fActividad.setValue(this.compliance.tagDTO.activity.idActivity);
      this.configActividadesForm.controls.fClasificacionActividad.setValue(this.compliance.tagDTO.classificationActivity);
      this.configActividadesForm.controls.fTipoCumplimiento.setValue(this.compliance.tagDTO.typeCompliance.id);
      this.configActividadesForm.controls.fRequisitoLegal.setValue(this.compliance.tagDTO.requisitoLegal);
      this.configActividadesForm.controls.fAutoridad.setValue(this.compliance.tagDTO.authority.id);
      this.configActividadesForm.controls.fTipoAplicacion.setValue(this.compliance.tagDTO.applicationType.id);
      this.configActividadesForm.controls.fPeriod.setValue(this.compliance.tagDTO.period);
      this.configActividadesForm.controls.fUnitPeriod.setValue(this.compliance.tagDTO.unitPeriod.id);
      this.configActividadesForm.controls.fTipoDias.setValue(this.compliance.tagDTO.daysType.id);

      let statusConsultActivity = 'ACTIVOS';
      if ( this.accion === 'edit' || this.accion === 'ver' ) {
      statusConsultActivity = 'TODOS';
    } else if ( this.accion === 'nuevo') {
      statusConsultActivity = 'ACTIVOS';
    }
      this.tagService.getCatalogoActividades(statusConsultActivity).subscribe(
        catalogoResult => {
          console.log(catalogoResult);
          let actividad: any;
          actividad = catalogoResult;
          actividad.forEach(element => {
            let combo: Combo;
            combo = new Combo(element.idActivity, element.name);
            this.comboActividades.push(combo);
          });
        },
        error => {
          console.log('Error al obtener catalgo de actividades.');
        }
    ).add(() => {
      // this.addBlock(2, null);
    });
      this.configActividadesForm.disable();
  }

  onSubmit() {
  }
  asignarNombreTag(e) {

  }
  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  get f() { return this.configActividadesForm.controls; }
}
