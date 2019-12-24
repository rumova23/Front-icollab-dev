import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Compliance } from '../../models/Compliance';
import { DatosGraficaGant } from '../../models/datosGraficaGant';
import { ComplianceService } from '../../services/compliance.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TablesLegalAgreementComponent } from './content/tablesLegalAgreement.component';
import { MatAccordion } from '@angular/material';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventService } from 'src/app/core/services/event.service';
import * as DEMO from './Demo';
import {MatrizCumplimientoDTO} from '../../models/matriz-cumplimiento-dto';
import {Combo} from '../../models/Combo';
import {ComplianceDTO} from '../../models/compliance-dto';
@Component({
  selector: 'app-legalAgreement',
  templateUrl: './legalAgreement.component.html',
  styleUrls: ['./legalAgreement.component.scss']
})
export class LegalAgreementComponent implements OnInit {
  @Input() asideOpen;

  @ViewChild('pagos') childPagos: TablesLegalAgreementComponent;
  @ViewChild('notificaciones') childNotificaciones: TablesLegalAgreementComponent;
  @ViewChild('reportes') childReportes: TablesLegalAgreementComponent;
  @ViewChild('analisis') childAnalisis: TablesLegalAgreementComponent;
  @ViewChild('actividades') childActividades: TablesLegalAgreementComponent;
  @ViewChild('compromisos') childCompromisos: TablesLegalAgreementComponent;
  @ViewChild('certificados') childCertificados: TablesLegalAgreementComponent;
  @ViewChild('actualizaciones') childActualizaciones: TablesLegalAgreementComponent;
  @ViewChild('otros') childOtros: TablesLegalAgreementComponent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatSort) sort: MatSort;

  displayMode = 'default';
  multi = true;
  expandCloseAll = false;
  anios: Array<any>;
  titulo = 'Cumplimiento Legal';
  filtrosForm: FormGroup;

  columnas: string[] = ['tag', 'actividad', 'elaboradoPor', 'responsable', 'supervisor',
                        'autoridad', 'tipo', 'periodo', 'tipoDias', 'precedentes', 'documentos',
                        'registros', 'requisitoLegal', 'observaciones',
                        'fechaInicioEventoProgramada', 'fechaFinEventoProgramada', 'periodoProgramado',
                        'fechaInicioEventoReal', 'fechaFinEventoReal', 'periodoReal',
                        'estatus', 'estatusInterno', 'ver', 'modificar'];
  columnasGant: string[] = ['datosGant'];

  registros = new MatTableDataSource<ComplianceDTO>();
  registrosGant = new MatTableDataSource<DatosGraficaGant>();
  elementData: any;
  elementDataGant: any;

  indicePagos = 0;
  indiceNotificaciones = 0;
  indiceAnalisis = 0;
  indiceReportes = 0;
  indiceActividades = 0;
  indiceCompromisos = 0;
  indiceCertificados = 0;
  indiceActualizaciones = 0;
  indiceOtros = 0;

  constructor(
    private complianceService: ComplianceService,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private eventService: EventService) {
    this.anios = [];
  }

  ngOnInit() {
    this.filtrosForm = this.formBuilder.group({
      fAnio: ['', Validators.required]
    });
    this.listaMatriz();
  }

  filtrarCompliance() {
    const bandera = false;
    this.addBlock(1, null);
    this.limpiarTablas();
    if (1) {
        this.limpiarTablas();
        this.complianceService.getCompliancePorPlantaYFechas(this.filtrosForm.controls.fAnio.value).subscribe(result => {
              console.log('RTC');
          console.dir(result);
              console.log('RTC');
              this.elementData = result;
              this.asignarRegistros();
              this.addBlock(2, null);
          },
          error => {
            console.log(error as any);
            this.addBlock(2, null);
          });

    }
  }

  listaMatriz() {
    this.complianceService.getListMatrizCumplimiento().subscribe((lista: Array<MatrizCumplimientoDTO>) => {
      lista.forEach((cumplimiento: MatrizCumplimientoDTO) => {
        this.anios.push(new Combo(cumplimiento.anio.toString(), cumplimiento.anio.toString()));
      });
    });
  }

  limpiarTablas() {
    // this.accordion.closeAll();
    this.expandCloseAll = false;

    this.indicePagos = -1;
    this.indiceNotificaciones = -1;
    this.indiceAnalisis = -1;
    this.indiceReportes = -1;
    this.indiceActividades = -1;
    this.indiceCompromisos = -1;
    this.indiceCertificados =  -1;
    this.indiceActualizaciones = -1;
    this.indiceOtros = -1;
  }

  asignarRegistros() {
    this.indicePagos = -1;
    this.indiceNotificaciones = -1;
    this.indiceAnalisis = -1;
    this.indiceReportes = -1;
    this.indiceActividades = -1;
    this.indiceCompromisos = -1;
    this.indiceCertificados =  -1;
    this.indiceActualizaciones = -1;
    this.indiceOtros = -1;

    for (let indice = 0; indice < this.elementData.length; indice++ ) {
      console.log(this.elementData[indice][0].actividad);
      if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'Pago') {
        this.indicePagos = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'NOTIFICACIONES') {
        this.indiceNotificaciones = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'ANALISIS') {
        this.indiceAnalisis = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'REPORTES') {
        this.indiceReportes = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'ACTIVIDADES') {
        this.indiceActividades = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'COMPROMISOS CONTRACTUALES') {
        this.indiceCompromisos = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'CERTIFICADOS') {
        this.indiceCertificados = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'ACTUALIZACIONES') {
        this.indiceActualizaciones = indice;
        this.expandCloseAll = true;
      } else if ( this.elementData[indice].length > 0 && this.elementData[indice][0].actividad === 'OTROS') {
        this.indiceOtros = indice;
        this.expandCloseAll = true;
      }
    }

    console.log(this.indicePagos);
    if ( this.indicePagos >= 0 ) {
      this.childPagos.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indicePagos]);
      this.childPagos.registros = this.registros;
      this.childPagos.registros.sort = this.sort;
    }
    if ( this.indiceNotificaciones >= 0 ) {
      this.childNotificaciones.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceNotificaciones]);
      this.childNotificaciones.registros = this.registros;
    }
    if ( this.indiceReportes >= 0 ) {
      this.childReportes.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceReportes]);
      this.childReportes.registros = this.registros;
    }
    if ( this.indiceAnalisis >= 0 ) {
      this.childAnalisis.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceAnalisis]);
      this.childAnalisis.registros = this.registros;
    }
    if ( this.indiceActividades >= 0 ) {
      this.childActividades.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceActividades]);
      this.childActividades.registros = this.registros;
    }
    if ( this.indiceCompromisos >= 0 ) {
      this.childCompromisos.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceCompromisos]);
      this.childCompromisos.registros = this.registros;
    }
    if ( this.indiceCertificados >= 0 ) {
      this.childCertificados.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceCertificados]);
      this.childCertificados.registros = this.registros;
    }
    if ( this.indiceActualizaciones >= 0 ) {
      this.childActualizaciones.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceActualizaciones]);
      this.childActualizaciones.registros = this.registros;
    }
    if ( this.indiceOtros >= 0 ) {
      this.childOtros.columnas = this.columnas;
      this.registros = new MatTableDataSource<ComplianceDTO>(this.elementData[this.indiceOtros]);
      this.childOtros.registros = this.registros;
    }

  }

  asignarRegistrosGant() {
    let indicePagos = -1;
    let indiceNotificaciones = -1;
    let indiceAnalisis = -1;
    let indiceReportes = -1;
    let indiceActividades = -1;
    let indiceCompromisos = -1;
    let indiceCertificados = -1;
    let indiceActualizaciones = -1;
    let indiceOtros = -1;

    for (let indice = 0; indice < this.elementDataGant.length; indice++ ) {
      if (this.elementDataGant[indice].actividad === 'Pago') {
        indicePagos = indice;
      } else if (this.elementDataGant[indice].actividad === 'NOTIFICACIONES') {
        indiceNotificaciones = indice;
      } else if (this.elementDataGant[indice].actividad === 'ANALISIS') {
        indiceAnalisis = indice;
      } else if (this.elementDataGant[indice].actividad === 'REPORTES') {
        indiceReportes = indice;
      } else if (this.elementDataGant[indice].actividad === 'ACTIVIDADES') {
        indiceActividades = indice;
      } else if (this.elementDataGant[indice].actividad === 'COMPROMISOS CONTRACTUALES') {
        indiceCompromisos = indice;
      } else if (this.elementDataGant[indice].actividad === 'CERTIFICADOS') {
        indiceCertificados = indice;
      } else if (
          this.elementDataGant[indice].actividad === 'ACTUALIZACIONES') {
        indiceActualizaciones = indice;
      } else if (this.elementDataGant[indice].actividad === 'OTROS') {
        indiceOtros = indice;
      }
    }



    if ( indicePagos >= 0 ) {
      this.childPagos.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indicePagos].datosGraficaGantDTO;
      this.childPagos.registrosGant = this.registrosGant;
      this.childPagos.datosPie = this.elementDataGant[indicePagos].datosPie;
      this.childPagos.datosCumplimiento = this.elementDataGant[indicePagos].datosCumplimiento;
    }
    if ( indiceNotificaciones >= 0 ) {
      this.childNotificaciones.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceNotificaciones].datosGraficaGantDTO;
      this.childNotificaciones.registrosGant = this.registrosGant;
      this.childNotificaciones.datosPie = this.elementDataGant[indiceNotificaciones].datosPie;
      this.childNotificaciones.datosCumplimiento = this.elementDataGant[indiceNotificaciones].datosCumplimiento;
    }
    if ( indiceReportes >= 0 ) {
      this.childReportes.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceReportes].datosGraficaGantDTO;
      this.childReportes.registrosGant = this.registrosGant;
      this.childReportes.datosPie = this.elementDataGant[indiceReportes].datosPie;
      this.childReportes.datosCumplimiento = this.elementDataGant[indiceReportes].datosCumplimiento;
    }
    if ( indiceAnalisis >= 0 ) {
      this.childAnalisis.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceAnalisis].datosGraficaGantDTO;
      this.childAnalisis.registrosGant = this.registrosGant;
      this.childAnalisis.datosPie = this.elementDataGant[indiceAnalisis].datosPie;
      this.childAnalisis.datosCumplimiento = this.elementDataGant[indiceAnalisis].datosCumplimiento;
    }
    if ( indiceActividades >= 0 ) {
      this.childActividades.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceActividades].datosGraficaGantDTO;
      this.childActividades.registrosGant = this.registrosGant;
      this.childActividades.datosPie = this.elementDataGant[indiceActividades].datosPie;
      this.childActividades.datosCumplimiento = this.elementDataGant[indiceActividades].datosCumplimiento;
    }
    if ( indiceCompromisos >= 0 ) {
      this.childCompromisos.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceCompromisos].datosGraficaGantDTO;
      this.childCompromisos.registrosGant = this.registrosGant;
      this.childCompromisos.datosPie = this.elementDataGant[indiceCompromisos].datosPie;
      this.childCompromisos.datosCumplimiento = this.elementDataGant[indiceCompromisos].datosCumplimiento;
    }
    if ( indiceCertificados >= 0 ) {
      this.childCertificados.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceCertificados].datosGraficaGantDTO;
      this.childCertificados.registrosGant = this.registrosGant;
      this.childCertificados.datosPie = this.elementDataGant[indiceCertificados].datosPie;
      this.childCertificados.datosCumplimiento = this.elementDataGant[indiceCertificados].datosCumplimiento;
    }
    if ( indiceActualizaciones >= 0 ) {
      this.childActualizaciones.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceActualizaciones].datosGraficaGantDTO;
      this.childActualizaciones.registrosGant = this.registrosGant;
      this.childActualizaciones.datosPie = this.elementDataGant[indiceActualizaciones].datosPie;
      this.childActualizaciones.datosCumplimiento = this.elementDataGant[indiceActualizaciones].datosCumplimiento;
    }
    if ( indiceOtros >= 0 ) {
      this.childOtros.columnasGant = this.columnasGant;
      this.registrosGant = this.elementDataGant[indiceOtros].datosGraficaGantDTO;
      this.childOtros.registrosGant = this.registrosGant;
      this.childOtros.datosPie = this.elementDataGant[indiceOtros].datosPie;
      this.childOtros.datosCumplimiento = this.elementDataGant[indiceOtros].datosCumplimiento;
    }
  }
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
