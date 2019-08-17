import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PerfilComponent } from '../perfil.component'; 
//import { ResponsibilitiesComponent } from '../responsibilities/responsibilities.component';
import { BehaviorComponent } from '../behavior/behavior.component';
import { SkillsComponent } from '../skills/skills.component';
import { DashboardsComponent } from '../dashboards/dashboards.component';
import { ObsyCommentsComponent } from '../obsyComments/obsyComments.component';
 

@Component({
  selector: 'app-perfilHome',
  templateUrl: './perfilHome.component.html',
  styleUrls: ['./perfilHome.component.scss'],
  entryComponents: [
    PerfilComponent
   ,BehaviorComponent
   ,SkillsComponent
   ,DashboardsComponent
   ,ObsyCommentsComponent
  ]
})
export class PerfilHomeComponent implements OnInit {

  idEmpleado: number;
  tipo: string;
  isViewable: boolean = true;
  isdisabled: boolean = false;

  @ViewChild('perfil', { read: ViewContainerRef }) perfil: ViewContainerRef;
  //@ViewChild('responsibilities', { read: ViewContainerRef }) responsibilities: ViewContainerRef;
  @ViewChild('behavior', { read: ViewContainerRef }) behavior: ViewContainerRef;
  @ViewChild('skills', { read: ViewContainerRef }) skills: ViewContainerRef;
  @ViewChild('dashboards', { read: ViewContainerRef }) dashboards: ViewContainerRef;
  @ViewChild('obsyComments', { read: ViewContainerRef }) obsyComments: ViewContainerRef;


  constructor(private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver, ) {
  }

  ngOnInit() {
    console.log(  this.isViewable);
    //this.idEmpleado = this.route.snapshot.params['idEmpleado'];
    console.log(this.idEmpleado);
    //this.tipo = this.route.snapshot.params['tipo'];
    console.log(this.tipo);
    //this.isdisabled = this.route.snapshot.params['isdisabled'];
    if (this.idEmpleado === 0) {
      this.isViewable = false;
    }
    console.log(  this.isViewable);
    //this.isViewable = true;
    this.addFactoryPerfil();
    this.addFactoryBehavior();
    this.addFactorySkills();
    this.addFactoryDashboards();
    this.addFactoryObsyComments();
  }

  private addFactoryPerfil() {
    const factoryPerfil = 
      this.componentFactoryResolver.resolveComponentFactory(PerfilComponent);
    const refPerfil = this.perfil.createComponent(factoryPerfil);
    refPerfil.instance.inTipo = this.tipo;
    refPerfil.instance.inIdEmpleado = this.idEmpleado;
    refPerfil.changeDetectorRef.detectChanges();
  }

  private addFactoryBehavior() {
    if (!this.isViewable) {
      return;
    }
    const factoryBehavior = 
      this.componentFactoryResolver.resolveComponentFactory(BehaviorComponent);
    const refBehavior = this.perfil.createComponent(factoryBehavior);
    refBehavior.instance.inTipo = this.tipo;
    refBehavior.instance.inIdEmpleado = this.idEmpleado;
    refBehavior.changeDetectorRef.detectChanges();
  }


  private addFactorySkills() {
    if (!this.isViewable) {
      return;
    }
    const factorySkills = 
      this.componentFactoryResolver.resolveComponentFactory(SkillsComponent);
    const refSkills = this.perfil.createComponent(factorySkills);
    refSkills.instance.inTipo = this.tipo;
    refSkills.instance.inIdEmpleado = this.idEmpleado;
    refSkills.changeDetectorRef.detectChanges();
  }


  private addFactoryDashboards() {
    if (!this.isViewable) {
      return;
    }
    const factoryDashboards = 
      this.componentFactoryResolver.resolveComponentFactory(DashboardsComponent);
    const refDashboards = this.perfil.createComponent(factoryDashboards);
    refDashboards.instance.inTipo = this.tipo;
    refDashboards.instance.inIdEmpleado = this.idEmpleado;
    refDashboards.changeDetectorRef.detectChanges();
  }


  private addFactoryObsyComments() {
    if (!this.isViewable) {
      return;
    }
    const factoryObsyComments = 
      this.componentFactoryResolver.resolveComponentFactory(ObsyCommentsComponent);
    const refObsyComments = this.perfil.createComponent(factoryObsyComments);
    refObsyComments.instance.inTipo = this.tipo;
    refObsyComments.instance.inIdEmpleado = this.idEmpleado;
    refObsyComments.changeDetectorRef.detectChanges();
  }


}
