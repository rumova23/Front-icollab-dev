import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PerfilComponent } from '../perfil.component';
import { BehaviorComponent } from '../behavior/behavior.component';
import { SkillsComponent } from '../skills/skills.component';
import { DashboardsComponent } from '../dashboards/dashboards.component';
import { ObsyCommentsComponent } from '../obsyComments/obsyComments.component';
import {EntidadEstausDTO} from '../../../models/entidad-estaus-dto';
import {PerfilComboService} from '../../../../core/services/perfil-combo.service';


@Component({
  selector: 'app-perfilHome',
  templateUrl: './perfilHome.component.html',
  styleUrls: ['./perfilHome.component.scss'],
  entryComponents: [
    PerfilComponent
   , BehaviorComponent
   , SkillsComponent
   , DashboardsComponent
   , ObsyCommentsComponent
  ]
})
export class PerfilHomeComponent implements OnInit {
  title = 'Perfil de Puesto';
  idEmpleado: number;
  tipo: string;
  isViewable = true;
  isdisabled = false;

  entidadEstausTerminado: EntidadEstausDTO;

  @ViewChild('perfil', { read: ViewContainerRef }) perfil: ViewContainerRef;
  @ViewChild('responsibilities', { read: ViewContainerRef }) responsibilities: ViewContainerRef;
  @ViewChild('behavior', { read: ViewContainerRef }) behavior: ViewContainerRef;
  @ViewChild('skills', { read: ViewContainerRef }) skills: ViewContainerRef;
  @ViewChild('dashboards', { read: ViewContainerRef }) dashboards: ViewContainerRef;
  @ViewChild('obsyComments', { read: ViewContainerRef }) obsyComments: ViewContainerRef;


  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private perfilComboService: PerfilComboService) {

  }

  ngOnInit() {
    this.perfilComboService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Terminado').subscribe(
        (entidadEstatus: EntidadEstausDTO) => {
          this.entidadEstausTerminado = entidadEstatus;
          if (this.idEmpleado === 0) {
            this.isViewable = false;
          }
          // this.isViewable = true;
          this.addFactoryPerfil();
          this.addFactoryBehavior();
          this.addFactorySkills();
          this.addFactoryDashboards();
          this.addFactoryObsyComments();
        });
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
    refBehavior.instance.entidadEstausTerminado = this.entidadEstausTerminado;
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
    refSkills.instance.entidadEstausTerminado = this.entidadEstausTerminado;
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
