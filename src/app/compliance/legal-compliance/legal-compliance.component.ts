import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort} from '@angular/material';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import * as moment from 'moment';

import { Compliance } from '../models/compliance';
import { DiagramaGant } from '../models/diagramaGant';
import { SemanasPorMes } from '../models/semanasPorMes';
import { ComplianceService } from '../services/compliance.service';
import { TablasCumplimientoLegalComponent } from './contenido/tablas-cumplimiento-legal.component'

@Component({
  selector: 'app-legal-compliance',
  templateUrl: './legal-compliance.component.html',
  styleUrls: ['./legal-compliance.component.scss']
})
export class LegalComplianceComponent implements OnInit {

  @ViewChild('pagos') childPagos : TablasCumplimientoLegalComponent;
  @ViewChild('notificaciones') childNotificaciones : TablasCumplimientoLegalComponent;
  @ViewChild('reportes') childReportes : TablasCumplimientoLegalComponent;
  @ViewChild('analisis') childAnalisis : TablasCumplimientoLegalComponent;
  @ViewChild('actividades') childActividades : TablasCumplimientoLegalComponent;
  @ViewChild('compromisos') childCompromisos : TablasCumplimientoLegalComponent;
  @ViewChild('certificados') childCertificados : TablasCumplimientoLegalComponent;
  @ViewChild('actualizaciones') childActualizaciones : TablasCumplimientoLegalComponent;
  @ViewChild('otros') childOtros : TablasCumplimientoLegalComponent;

  titulo: String = "Cumplimiento Legal";
  maxDate = new Date();
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  columnas : string[] = ['tag','actividad','planta','elaboradoPor','responsable','supervisor','autoridad','tipo','periodo1','tipoDias','precedentes','documentos','doc1','registros','doc2','requisitoLegal','observaciones','fechaInicioEventoProgramada',
                        'fechaFinEventoProgramada', 'fechaInicioEventoReal', 'fechaFinProgramada', 'estatus', 'herramientas'];
  columnasGant : string[] = ['tag', 'actividad', 'planta', 'datosGant']
  semanasPorMes: Array<SemanasPorMes>;

  registros = new MatTableDataSource<Compliance>();
  registrosGant = new MatTableDataSource<DiagramaGant>();
  element_data: any;
  element_data_gant: any;

  indicePagos:number=0;
  indiceNotificaciones:number=0;
  indiceAnalisis:number=0;
  indiceReportes:number=0;    
  indiceActividades:number=0;
  indiceCompromisos:number=0;
  indiceCertificados:number=0;
  indiceActualizaciones:number=0;
  indiceOtros:number=0;

  constructor(
    private complianceService: ComplianceService
  ) { }

  obtenerActividad(
  ){

  }


  ngOnInit() {
    this.filtrarCompliance();
  }

    
  obtenerColumnasGant(){

    let anioActual= new Date().getFullYear();
    let firstOfMonth : Date;
    let lastOfMonth : Date;
    let numSemanaInicial: number;
    let numSemanaFinal: number;
    let numSemanasMes: number;
  
    this.semanasPorMes = new Array<SemanasPorMes>();
    for (let month_number=1; month_number<13; month_number++){
      firstOfMonth = new Date(anioActual, month_number-1, 1);
      lastOfMonth = new Date(anioActual, month_number, 0);
      numSemanaInicial = moment(firstOfMonth).week();
      numSemanaFinal = moment(lastOfMonth).week();
      numSemanasMes = numSemanaFinal-(numSemanaInicial-1); 
      if ( month_number == 12){
        numSemanasMes = 53-(numSemanaInicial-1);    
      }
      /*
      console.log("Fecha: " + new Date(anioActual, month_number-1, 1) + " - " + new Date(anioActual, month_number, 0) );
      console.log("Mes: " + month_number + 
      " Numero de semana inicio: " + numSemanaInicial + 
      " Numero de semana fin: " + numSemanaFinal +
      " Numero de semanas del mes: " + numSemanasMes);
      */
      this.semanasPorMes.push(new SemanasPorMes(month_number, numSemanasMes));
    }

  }

  filtrarCompliance(){
    this.complianceService.getAllCompliance().subscribe(
      result => {
        console.log(result);
        this.element_data = result;
        this.asignarRegistros();
        this.complianceService.getComplianceGant().subscribe(
          resultGant => {
            console.log(resultGant);
            this.element_data_gant = resultGant;
            this.asignarRegistrosGant();
          },
          error =>{
            console.log(<any> error);
          }
        );
      },
      error =>{
        console.log(<any> error);
      }
    );
    
  }

  asignarRegistros(){

    this.indicePagos=0;
    this.indiceNotificaciones=0;
    this.indiceAnalisis=0;
    this.indiceReportes=0;    
    this.indiceActividades=0;
    this.indiceCompromisos=0;
    this.indiceCertificados=0;
    this.indiceActualizaciones=0;
    this.indiceOtros=0

    for (let indice=0; indice < this.element_data.length; indice++ ){
      if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'PAGOS'){
        this.indicePagos = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'NOTIFICACIONES'){
        this.indiceNotificaciones = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ANALISIS'){
        this.indiceAnalisis = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'REPORTES'){
        this.indiceReportes = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ACTIVIDADES'){
        this.indiceActividades = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'COMPROMISOS CONTRACTUALES'){
        this.indiceCompromisos = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'CERTIFICADOS'){
        this.indiceCertificados = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ACTUALIZACIONES'){
        this.indiceActualizaciones = indice;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'OTROS'){
        this.indiceOtros = indice;
      }
    }
    
    if ( this.indicePagos > 0 ){
      this.childPagos.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indicePagos]);
      this.childPagos.registros = this.registros;
    }
    if ( this.indiceNotificaciones > 0 ){
      this.childNotificaciones.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceNotificaciones]);
      this.childNotificaciones.registros = this.registros;
    }
    if ( this.indiceReportes > 0 ){
      this.childReportes.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceReportes]);
      this.childReportes.registros = this.registros;
    }
    if ( this.indiceAnalisis > 0 ){
      this.childAnalisis.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceAnalisis]);
      this.childAnalisis.registros = this.registros;
    }
    if ( this.indiceActividades > 0 ){
      this.childActividades.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceActividades]);
      this.childActividades.registros = this.registros;
    }
    if ( this.indiceCompromisos > 0 ){
      this.childCompromisos.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceCompromisos]);
      this.childCompromisos.registros = this.registros;
    }
    if ( this.indiceCertificados > 0 ){
      this.childCertificados.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceCertificados]);
      this.childCertificados.registros = this.registros;
    }
    if ( this.indiceActualizaciones > 0 ){
      this.childActualizaciones.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceActualizaciones]);
      this.childActualizaciones.registros = this.registros;
    }
    if ( this.indiceOtros > 0 ){
      this.childOtros.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indiceOtros]);
      this.childOtros.registros = this.registros;
    }

  }

  asignarRegistrosGant(){

    let indicePagos=-1;
    let indiceNotificaciones=-1;
    let indiceAnalisis=-1;
    let indiceReportes=-1;    
    let indiceActividades=-1;
    let indiceCompromisos=-1;
    let indiceCertificados=-1;
    let indiceActualizaciones=-1;
    let indiceOtros=-1;

    for (let indice=0; indice < this.element_data_gant.length; indice++ ){
      if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'PAGOS'){
        indicePagos = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'NOTIFICACIONES'){
        indiceNotificaciones = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'ANALISIS'){
        indiceAnalisis = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'REPORTES'){
        indiceReportes = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'ACTIVIDADES'){
        indiceActividades = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'COMPROMISOS CONTRACTUALES'){
        indiceCompromisos = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'CERTIFICADOS'){
        indiceCertificados = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'ACTUALIZACIONES'){
        indiceActualizaciones = indice;
      }else if ( this.element_data_gant[indice].diagramaGant.length > 0 && this.element_data_gant[indice].actividad == 'OTROS'){
        indiceOtros = indice;
      }
    }
    
    if ( indicePagos >= 0 ){
      this.childPagos.columnasGant = this.columnasGant;
      this.childPagos.semanasPorMes = this.semanasPorMes;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indicePagos].diagramaGant);
      this.childPagos.registrosGant = this.registrosGant;
      this.childPagos.datosPie = this.element_data_gant[indicePagos].datosPie;
      this.childPagos.datosCumplimiento = this.element_data_gant[indicePagos].datosCumplimiento;
    }
    if ( indiceNotificaciones >= 0 ){
      this.childNotificaciones.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceNotificaciones].diagramaGant);
      this.childNotificaciones.registrosGant = this.registrosGant;
      this.childNotificaciones.datosPie = this.element_data_gant[indiceNotificaciones].datosPie;
      this.childNotificaciones.datosCumplimiento = this.element_data_gant[indiceNotificaciones].datosCumplimiento;
    }
    if ( indiceReportes >= 0 ){
      this.childReportes.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceReportes].diagramaGant);
      this.childReportes.registrosGant = this.registrosGant;
      this.childReportes.datosPie = this.element_data_gant[indiceReportes].datosPie;
      this.childReportes.datosCumplimiento = this.element_data_gant[indiceReportes].datosCumplimiento;
    }
    if ( indiceAnalisis >= 0 ){
      this.childAnalisis.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceAnalisis].diagramaGant);
      this.childAnalisis.registrosGant = this.registrosGant;
      this.childAnalisis.datosPie = this.element_data_gant[indiceAnalisis].datosPie;
      this.childAnalisis.datosCumplimiento = this.element_data_gant[indiceAnalisis].datosCumplimiento;
    }
    if ( indiceActividades >= 0 ){
      this.childActividades.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceActividades].diagramaGant);
      this.childActividades.registrosGant = this.registrosGant;
      this.childActividades.datosPie = this.element_data_gant[indiceActividades].datosPie;
      this.childActividades.datosCumplimiento = this.element_data_gant[indiceActividades].datosCumplimiento;
    }
    if ( indiceCompromisos >= 0 ){
      this.childCompromisos.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceCompromisos].diagramaGant);
      this.childCompromisos.registrosGant = this.registrosGant;
      this.childCompromisos.datosPie = this.element_data_gant[indiceCompromisos].datosPie;
      this.childCompromisos.datosCumplimiento = this.element_data_gant[indiceCompromisos].datosCumplimiento;
    }
    if ( indiceCertificados >= 0 ){
      this.childCertificados.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceCertificados].diagramaGant);
      this.childCertificados.registrosGant = this.registrosGant;
      this.childCertificados.datosPie = this.element_data_gant[indiceCertificados].datosPie;
      this.childCertificados.datosCumplimiento = this.element_data_gant[indiceCertificados].datosCumplimiento;
    }
    if ( indiceActualizaciones >= 0 ){
      this.childActualizaciones.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceActualizaciones].diagramaGant);
      this.childActualizaciones.registrosGant = this.registrosGant;
      this.childActualizaciones.datosPie = this.element_data_gant[indiceActualizaciones].datosPie;
      this.childActualizaciones.datosCumplimiento = this.element_data_gant[indiceActualizaciones].datosCumplimiento;
    }
    if ( indiceOtros >= 0 ){
      this.childOtros.columnasGant = this.columnasGant;
      this.registrosGant = new MatTableDataSource<DiagramaGant>(this.element_data_gant[indiceOtros].diagramaGant);
      this.childOtros.registrosGant = this.registrosGant;
      this.childOtros.datosPie = this.element_data_gant[indiceOtros].datosPie;
      this.childOtros.datosCumplimiento = this.element_data_gant[indiceOtros].datosCumplimiento;
    }

  }

}
