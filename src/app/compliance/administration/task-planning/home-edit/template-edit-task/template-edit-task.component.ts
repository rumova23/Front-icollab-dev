import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TaskEditComponent} from 'src/app/compliance/administration/task-planning/home-edit/task-edit/task-edit.component';
import {TaskObservacionComponent} from '../task-observacion/task-observacion.component';
import {TaskEstatusComponent} from '../task-estatus/task-estatus.component';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';
import {TagService} from '../../../../services/tag.service';
import {OrderCatalogDTO} from '../../../../models/OrderCatalogDTO';
import {Combo} from '../../../../models/Combo';
import {ComplianceDTO} from '../../../../models/compliance-dto';
import {EntidadEstausDTO} from '../../../../models/entidad-estaus-dto';
import {TaskFilesComponent} from '../task-files/task-files.component';
import {TaskGanttComponent} from '../task-gantt/task-gantt.component';
import {MaestroOpcionDTO} from '../../../../models/maestro-opcion-dto';

@Component({
  selector: 'app-template-edit-task',
  templateUrl: './template-edit-task.component.html',
  styleUrls: ['./template-edit-task.component.scss'],
  entryComponents: [
    TaskEditComponent,
    TaskObservacionComponent,
    TaskEstatusComponent, TaskGanttComponent]
})
export class TemplateEditTaskComponent implements OnInit {
  complianceId: string;
  accion: string;
  @ViewChild('taskComponent', { read: ViewContainerRef }) taskComponent: ViewContainerRef;
  @ViewChild('taskObservacion', { read: ViewContainerRef }) taskObservacion: ViewContainerRef;
  @ViewChild('taskEstatus', { read: ViewContainerRef }) taskEstatus: ViewContainerRef;
  @ViewChild('taskGantt', { read: ViewContainerRef }) taskGantt: ViewContainerRef;

  compliance: ComplianceDTO;
  comboTipoCumplimiento: Array<Combo>;
  comboAutoridad: Array<Combo>;
  comboTipoAplicacion: Array<Combo>;
  comboUnitPeriod: Array<Combo>;
  comboTipoDias: Array<Combo>;
  comboEstatus: Array<Combo>;
  comboEstatusInterno: Array<Combo>;
  listaCombos: Array<any>;
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private administratorComplianceService: AdministratorComplianceService,
      private tagService: TagService) {

    this.comboTipoCumplimiento = new Array<Combo>();
    this.comboAutoridad = new Array<Combo>();
    this.comboTipoAplicacion = new Array<Combo>();
    this.comboUnitPeriod = new Array<Combo>();
    this.comboTipoDias = new Array<Combo>();
    this.listaCombos = Array<OrderCatalogDTO>();
    this.listaCombos.push( new OrderCatalogDTO('typeCompliance', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('authority', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeApplication', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeDay', 1, 1));
    this.comboEstatus = new Array<Combo>();
    this.comboEstatusInterno = new Array<Combo>();
    this.tagService.getlistCatalogoOrdenados(this.listaCombos).subscribe(
        poRespuesta => {
          console.dir(poRespuesta);
          this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
          this.resuelveDS(poRespuesta, this.comboAutoridad, 'authority');
          this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
          this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
          this.administratorComplianceService.obtenEstatusMaestro('CAT_SEGUIMIENTO_ESTATUS').subscribe(
              (combos: Array<MaestroOpcionDTO>) => {
                this.resuelveMaestro(combos, this.comboEstatus);
              }
          );
          this.administratorComplianceService.obtenEstatusMaestro('CAT_SEGUIMIENTO_ESTATUS_INTERNO').subscribe(
              (combos: Array<MaestroOpcionDTO>) => {
                this.resuelveMaestro(combos, this.comboEstatusInterno);
              }
          );

          this.administratorComplianceService.obtenEstatusMaestro('UNIT_PERIOD').subscribe(
              (combos: Array<MaestroOpcionDTO>) => {
                this.resuelveMaestro(combos, this.comboUnitPeriod);
              }
          );
        }
    );
  }

  ngOnInit() {
    this.administratorComplianceService.complianceById(+this.complianceId).subscribe( (responseValue: ComplianceDTO) => {
      this.compliance = responseValue;
      this.addFactoryTask();
      this.addFactoryObservacion();
      this.addFactoryEstatus();
      this.addFactoryGantt();
    });
  }

  private addFactoryTask() {
    const refTask = this.taskComponent.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskEditComponent));
    refTask.instance.accion = this.accion;
    refTask.instance.compliance = this.compliance;
    refTask.instance.comboTipoCumplimiento = this.comboTipoCumplimiento;
    refTask.instance.comboAutoridad = this.comboAutoridad;
    refTask.instance.comboTipoAplicacion = this.comboTipoAplicacion;
    refTask.instance.comboUnitPeriod = this.comboUnitPeriod;
    refTask.instance.comboTipoDias = this.comboTipoDias;
    refTask.instance.comboEstatus = this.comboEstatus;
    refTask.changeDetectorRef.detectChanges();
  }

  private addFactoryObservacion() {
    const refObservacion = this.taskObservacion.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskObservacionComponent));
    refObservacion.instance.accion = this.accion;
    refObservacion.instance.complianceId = +this.complianceId;
    refObservacion.changeDetectorRef.detectChanges();
  }

  private addFactoryEstatus() {
    const refEstatus = this.taskEstatus.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskEstatusComponent));
    refEstatus.instance.accion = this.accion;
    refEstatus.instance.compliance = this.compliance;
    refEstatus.instance.comboUnitPeriod = this.comboUnitPeriod;
    refEstatus.instance.comboTipoDias = this.comboTipoDias;
    refEstatus.instance.comboEstatus = this.comboEstatus;
    refEstatus.instance.comboEstatusInterno = this.comboEstatusInterno;
    refEstatus.changeDetectorRef.detectChanges();
  }

  private addFactoryGantt() {
    const refGantt = this.taskGantt.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskGanttComponent));
    refGantt.instance.complianceId = +this.complianceId;
    refGantt.changeDetectorRef.detectChanges();
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

  resuelveMaestro(responseValue: Array<MaestroOpcionDTO>, combo: Array<any>) {
    if (!responseValue) {
      console.log('El back no responde');
    } else {
      responseValue.forEach((element: MaestroOpcionDTO) => {
        combo.push(new Combo( element.maestroOpcionId.toString(), '' + element.opcion.codigo));
      });
    }
  }
}
