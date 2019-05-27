import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Compliance } from '../../models/Compliance';
import { DatosGraficaGant } from '../../models/datosGraficaGant';
import { ComplianceService } from '../../services/compliance.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TablesLegalAgreementComponent } from './content/tablesLegalAgreement.component'
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-legalAgreement',
  templateUrl: './legalAgreement.component.html',
  styleUrls: ['./legalAgreement.component.scss']
})
export class LegalAgreementComponent implements OnInit {
  
  @ViewChild('pagos') childPagos : TablesLegalAgreementComponent;
  @ViewChild('notificaciones') childNotificaciones : TablesLegalAgreementComponent;
  @ViewChild('reportes') childReportes : TablesLegalAgreementComponent;
  @ViewChild('analisis') childAnalisis : TablesLegalAgreementComponent;
  @ViewChild('actividades') childActividades : TablesLegalAgreementComponent;
  @ViewChild('compromisos') childCompromisos : TablesLegalAgreementComponent;
  @ViewChild('certificados') childCertificados : TablesLegalAgreementComponent;
  @ViewChild('actualizaciones') childActualizaciones : TablesLegalAgreementComponent;
  @ViewChild('otros') childOtros : TablesLegalAgreementComponent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatSort) sort: MatSort;
  
  displayMode: string = 'default';
  multi = true;
  expandCloseAll = false;
  
  titulo: String = "Cumplimiento Legal";
  maxDate = new Date();
  fFechaInicio = new FormControl(new Date());
  fFechaFin = new FormControl((new Date()).toISOString());
  filtrosForm: FormGroup;

  columnas : string[] = ['tag','actividad','planta','elaboradoPor','responsable','supervisor',
                        'autoridad','tipo','periodo','tipoDias','precedentes','documentos',
                        'registros','requisitoLegal','observaciones',
                        'fechaInicioEventoProgramada','fechaFinEventoProgramada', 'periodoProgramado',
                        'fechaInicioEventoReal', 'fechaFinEventoReal', 'periodoReal', 
                        'estatus', 'estatusInterno', 'ver', 'modificar', 'eliminar'];
  columnasGant : string[] = ['datosGant']

  registros = new MatTableDataSource<Compliance>();
  registrosGant = new MatTableDataSource<DatosGraficaGant>();
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
    private complianceService: ComplianceService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.filtrosForm = this.formBuilder.group({
      fFechaInicio: ['', Validators.required],
      fFechaFin: ['', Validators.required]
    });
  }

  filtrarCompliance(){
    this.limpiarTablas();

    this.complianceService.getCompliancePorPlantaYFechas( this.globalService.plantaDefaultId, new Date(this.fFechaInicio.value), new Date(this.fFechaFin.value)).subscribe(
      result => {
        console.log("PRIMERA TABLA");
        console.log(result);
        this.element_data = result;
        this.asignarRegistros();
        this.complianceService.getDiagramas(this.globalService.plantaDefaultId, new Date(this.fFechaInicio.value), new Date(this.fFechaFin.value)).subscribe(
          resultGant => {
            console.log("DATOS DIAGRAMAS");
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

  limpiarTablas(){
    this.accordion.closeAll();
    this.expandCloseAll = false;

    this.indicePagos = 0;
    this.indiceNotificaciones = 0;
    this.indiceAnalisis = 0;
    this.indiceReportes = 0;
    this.indiceActividades = 0;
    this.indiceCompromisos = 0;
    this.indiceCertificados = 0;
    this.indiceActualizaciones = 0;
    this.indiceOtros = 0;
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
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'NOTIFICACIONES'){
        this.indiceNotificaciones = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ANALISIS'){
        this.indiceAnalisis = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'REPORTES'){
        this.indiceReportes = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ACTIVIDADES'){
        this.indiceActividades = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'COMPROMISOS CONTRACTUALES'){
        this.indiceCompromisos = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'CERTIFICADOS'){
        this.indiceCertificados = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'ACTUALIZACIONES'){
        this.indiceActualizaciones = indice;
        this.expandCloseAll = true;
      }else if ( this.element_data[indice].length > 0 && this.element_data[indice][0].actividad == 'OTROS'){
        this.indiceOtros = indice;
        this.expandCloseAll = true;
      }
    }
    
    if ( this.indicePagos > 0 ){
      this.childPagos.columnas = this.columnas;
      this.registros = new MatTableDataSource<Compliance>(this.element_data[this.indicePagos]);
      this.childPagos.registros = this.registros;
      this.childPagos.registros.sort = this.sort;
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
      if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'PAGOS'){
        indicePagos = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'NOTIFICACIONES'){
        indiceNotificaciones = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'ANALISIS'){
        indiceAnalisis = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'REPORTES'){
        indiceReportes = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'ACTIVIDADES'){
        indiceActividades = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'COMPROMISOS CONTRACTUALES'){
        indiceCompromisos = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'CERTIFICADOS'){
        indiceCertificados = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'ACTUALIZACIONES'){
        indiceActualizaciones = indice;
      }else if ( this.element_data_gant[indice].datosGraficaGantDTO.listaDatoslineaDeTiempo.length > 0 && this.element_data_gant[indice].actividad == 'OTROS'){
        indiceOtros = indice;
      }
    }
    
    if ( indicePagos >= 0 ){
      this.childPagos.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indicePagos].datosGraficaGantDTO;
      this.childPagos.registrosGant = this.registrosGant;
      this.childPagos.datosPie = this.element_data_gant[indicePagos].datosPie;
      this.childPagos.datosCumplimiento = this.element_data_gant[indicePagos].datosCumplimiento;
    }
    if ( indiceNotificaciones >= 0 ){
      this.childNotificaciones.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceNotificaciones].datosGraficaGantDTO;
      this.childNotificaciones.registrosGant = this.registrosGant;
      this.childNotificaciones.datosPie = this.element_data_gant[indiceNotificaciones].datosPie;
      this.childNotificaciones.datosCumplimiento = this.element_data_gant[indiceNotificaciones].datosCumplimiento;
    }
    if ( indiceReportes >= 0 ){
      this.childReportes.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceReportes].datosGraficaGantDTO;
      this.childReportes.registrosGant = this.registrosGant;
      this.childReportes.datosPie = this.element_data_gant[indiceReportes].datosPie;
      this.childReportes.datosCumplimiento = this.element_data_gant[indiceReportes].datosCumplimiento;
    }
    if ( indiceAnalisis >= 0 ){
      this.childAnalisis.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceAnalisis].datosGraficaGantDTO;
      this.childAnalisis.registrosGant = this.registrosGant;
      this.childAnalisis.datosPie = this.element_data_gant[indiceAnalisis].datosPie;
      this.childAnalisis.datosCumplimiento = this.element_data_gant[indiceAnalisis].datosCumplimiento;
    }
    if ( indiceActividades >= 0 ){
      this.childActividades.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceActividades].datosGraficaGantDTO;
      this.childActividades.registrosGant = this.registrosGant;
      this.childActividades.datosPie = this.element_data_gant[indiceActividades].datosPie;
      this.childActividades.datosCumplimiento = this.element_data_gant[indiceActividades].datosCumplimiento;
    }
    if ( indiceCompromisos >= 0 ){
      this.childCompromisos.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceCompromisos].datosGraficaGantDTO;
      this.childCompromisos.registrosGant = this.registrosGant;
      this.childCompromisos.datosPie = this.element_data_gant[indiceCompromisos].datosPie;
      this.childCompromisos.datosCumplimiento = this.element_data_gant[indiceCompromisos].datosCumplimiento;
    }
    if ( indiceCertificados >= 0 ){
      this.childCertificados.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceCertificados].datosGraficaGantDTO;
      this.childCertificados.registrosGant = this.registrosGant;
      this.childCertificados.datosPie = this.element_data_gant[indiceCertificados].datosPie;
      this.childCertificados.datosCumplimiento = this.element_data_gant[indiceCertificados].datosCumplimiento;
    }
    if ( indiceActualizaciones >= 0 ){
      this.childActualizaciones.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceActualizaciones].datosGraficaGantDTO;
      this.childActualizaciones.registrosGant = this.registrosGant;
      this.childActualizaciones.datosPie = this.element_data_gant[indiceActualizaciones].datosPie;
      this.childActualizaciones.datosCumplimiento = this.element_data_gant[indiceActualizaciones].datosCumplimiento;
    }
    if ( indiceOtros >= 0 ){
      this.childOtros.columnasGant = this.columnasGant;
      this.registrosGant = this.element_data_gant[indiceOtros].datosGraficaGantDTO;
      this.childOtros.registrosGant = this.registrosGant;
      this.childOtros.datosPie = this.element_data_gant[indiceOtros].datosPie;
      this.childOtros.datosCumplimiento = this.element_data_gant[indiceOtros].datosCumplimiento;
    }
  }

}
