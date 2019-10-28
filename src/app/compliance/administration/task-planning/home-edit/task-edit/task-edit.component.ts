import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import {CatalogType} from 'src/app/compliance/models/CatalogType';
import {Combo} from '../../../../models/Combo';
import { TagService } from 'src/app/compliance/services/tag.service';
import { AdministratorComplianceService } from 'src/app/compliance/administration/services/administrator-compliance.service';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  titulo = 'Edicion Tareas';
  @Input() accion: string;
  @Input() complianceId: number;
  configActividadesForm: FormGroup;
  plantaDefault = this.globalService.plantaDefaultId;
  submitted = false;

  comboActividades: Array<Combo>;
  comboTipoCumplimiento: Array<Combo>;
  comboAutoridad: Array<Combo>;
  comboTipoAplicacion: Array<Combo>;
  comboPeriodoEntrega: Array<Combo>;
  comboTipoDias: Array<Combo>;
  comboEstatus: Array<Combo>;
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
      fActividad: [{ value: '', disabled: false }, Validators.required]
    });

    this.configActividadesForm = this.formBuilder.group({
      fIdTag: ['', ''],
      fTag: ['', Validators.required],
      fDescripcion: ['', Validators.required],
      fActividad: ['', Validators.required],
      fClasificacionActividad: ['', Validators.required],
      fTipoCumplimiento: ['', Validators.required],
      fRequisitoLegal: ['', Validators.required],
      fAutoridad: ['', Validators.required],
      fTipoAplicacion: ['', Validators.required],
      fPeriodoEntrega: ['', Validators.required],
      fTipoDias: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('TaskEditComponent complianceId: ' + this.complianceId);
    console.log('TaskEditComponent accion: ' + this.accion);
    this.comboActividades = new Array<Combo>();
    this.comboTipoCumplimiento = new Array<Combo>();
    this.comboAutoridad = new Array<Combo>();
    this.comboTipoAplicacion = new Array<Combo>();
    this.comboPeriodoEntrega = new Array<Combo>();
    this.comboTipoDias = new Array<Combo>();
    this.comboEstatus = new Array<Combo>();

    this.listaCombos = Array<OrderCatalogDTO>();
    this.listaCombos.push( new OrderCatalogDTO('typeCompliance', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('authority', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeApplication', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('deliveryPeriod', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeDay', 1, 1));
    this.tagService.getlistCatalogoOrdenados(this.listaCombos).subscribe(
        poRespuesta => {
          this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
          this.resuelveDS(poRespuesta, this.comboAutoridad, 'authority');
          this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
          this.resuelveDS(poRespuesta, this.comboPeriodoEntrega, 'deliveryPeriod');
          this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
        }
    ).add(() => {
      // this.addBlock(2, null);
    });
    this.administratorComplianceService.complianceById(this.complianceId).subscribe( compliance => {
      console.dir(compliance);
      this.configActividadesForm.controls.fIdTag.setValue(compliance['tagDTO'].idTag);
      this.configActividadesForm.controls.fTag.setValue(compliance['tagDTO'].tag);
      this.configActividadesForm.controls.fDescripcion.setValue(compliance['tagDTO'].description);
      this.configActividadesForm.controls.fActividad.setValue(compliance['tagDTO']['activity'].idActivity);
      this.configActividadesForm.controls.fClasificacionActividad.setValue(compliance['tagDTO'].classificationActivity);
      this.configActividadesForm.controls.fTipoCumplimiento.setValue(compliance['tagDTO']['typeCompliance'].id);
      this.configActividadesForm.controls.fRequisitoLegal.setValue(compliance['tagDTO'].requisitoLegal);
      this.configActividadesForm.controls.fAutoridad.setValue(compliance['tagDTO']['authority'].id);
      this.configActividadesForm.controls.fTipoAplicacion.setValue(compliance['tagDTO']['applicationType'].id);
      this.configActividadesForm.controls.fPeriodoEntrega.setValue(compliance['tagDTO']['deliveryPeriod'].id);
      this.configActividadesForm.controls.fTipoDias.setValue(compliance['tagDTO']['daysType'].id);
    });

    let statusConsultActivity = 'ACTIVOS';
    if ( this.accion === 'edit' || this.accion === 'ver' ) {
      statusConsultActivity = 'TODOS';
    } else if ( this.accion === 'nuevo') {
      statusConsultActivity = 'ACTIVOS';
    }
    this.tagService.getCatalogoActividades(statusConsultActivity).subscribe(
        catalogoResult => {
          console.log(catalogoResult)
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
  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  resuelveDS(poRespuesta: any, combo: Array<any>, comp: string) {
    if (!poRespuesta) {
      console.log('El back no responde');
    } else {
      let catalogs: any;
      catalogs = poRespuesta;
      catalogs.forEach(element => {
        if ( element.catalog === comp ) {
          element.data.forEach ( elementCatalog => {
            combo.push(new Combo(elementCatalog.id, elementCatalog.code));
          });
        }
      });
    }
  }
  get f() { return this.configActividadesForm.controls; }
}
