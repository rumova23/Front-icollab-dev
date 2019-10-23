import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TaskEditComponent} from 'src/app/compliance/administration/task-planning/home-edit/task-edit/task-edit.component';

@Component({
  selector: 'app-template-edit-task',
  templateUrl: './template-edit-task.component.html',
  styleUrls: ['./template-edit-task.component.scss'],
  entryComponents: [TaskEditComponent]
})
export class TemplateEditTaskComponent implements OnInit {

  @ViewChild('taskComponent', { read: ViewContainerRef }) taskComponent: ViewContainerRef;

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addFactoryTask();
  }

  private addFactoryTask() {
    const factoryTask =
        this.componentFactoryResolver.resolveComponentFactory(TaskEditComponent);
    const refTask = this.taskComponent.createComponent(factoryTask);
    refTask.changeDetectorRef.detectChanges();
  }
}
