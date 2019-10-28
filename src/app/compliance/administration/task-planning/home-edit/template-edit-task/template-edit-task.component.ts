import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TaskEditComponent} from 'src/app/compliance/administration/task-planning/home-edit/task-edit/task-edit.component';
import {TaskObservacionComponent} from '../task-observacion/task-observacion.component';

@Component({
  selector: 'app-template-edit-task',
  templateUrl: './template-edit-task.component.html',
  styleUrls: ['./template-edit-task.component.scss'],
  entryComponents: [
    TaskEditComponent,
    TaskObservacionComponent]
})
export class TemplateEditTaskComponent implements OnInit {
  complianceId: string;
  accion: string;
  @ViewChild('taskComponent', { read: ViewContainerRef }) taskComponent: ViewContainerRef;
  @ViewChild('taskObservacion', { read: ViewContainerRef }) taskObservacion: ViewContainerRef;

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log('complianceId: ' + this.complianceId);
    console.log('accion: ' + this.accion);
    this.addFactoryTask();
    this.addFactoryObservacion();
  }

  private addFactoryTask() {
    const factoryTask =
        this.componentFactoryResolver.resolveComponentFactory(TaskEditComponent);
    const refTask = this.taskComponent.createComponent(factoryTask);
    refTask.instance.accion = this.accion;
    refTask.instance.complianceId = +this.complianceId
    refTask.changeDetectorRef.detectChanges();
  }

  private addFactoryObservacion() {
    const factoryObservacion =
        this.componentFactoryResolver.resolveComponentFactory(TaskObservacionComponent);
    const refObservacion = this.taskObservacion.createComponent(factoryObservacion);
    refObservacion.instance.accion = this.accion;
    refObservacion.instance.complianceId = +this.complianceId
    refObservacion.changeDetectorRef.detectChanges();
  }
}
