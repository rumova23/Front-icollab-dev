import { Component, OnInit, Input } from '@angular/core';
import { Scala } from 'src/app/compliance/models/Scala';
import { Rango } from 'src/app/compliance/models/Rango';
import { Grafica } from 'src/app/compliance/models/Grafica';
import { ExamenReservacion } from 'src/app/compliance/models/examen-reservacion';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboardsV2.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  scalas: Array<Scala>;
  charResul: Array<Grafica>
  cd_1: Array<any>;
  cl_1: Array<any>;
  cc_1: Array<any>;
  values: Array<ExamenReservacion>;
  public chartType = 'pie';

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  constructor(private scalaServ: PerfilComboService) {
    this.scalaServ.accion.subscribe(accion => {
      if(accion === 'califica') {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.charResul = [];
    this.cl_1 = ['Aciertos', 'Desacierto'];

    console.log('RTC this.scalaServ.obtenCalificacion: ' + this.inIdEmpleado);
    this.scalaServ.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {

        this.scalaServ.getReservacionesEmpleado(calificacion.calificacionId).subscribe(
         data => {

          for (const examenreservacion of data) {
            this.scalaServ.getGraficas(examenreservacion.examenReservacionId).subscribe(
              resultado => {

                this.resuelveGrafica(resultado, 'pie', 1, true);
              });
          }
        });
      });

    this.scalas = [];
    this.scalaServ.getScalas('DEFAULT').subscribe(
      resultado => {
        this.resuelveScalas(resultado, 'scalasArry');
      }
    );
  }


  resuelveScalas(poRespuesta: Object, camp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['status'];
      if (estatus === 'exito') {
        Object.keys(poRespuesta[camp]).forEach(key => {
          this.scalas.push(new Scala(poRespuesta[camp][key].value,
            poRespuesta[camp][key].label,
            new Rango(poRespuesta[camp][key].max,
              poRespuesta[camp][key].min,
              poRespuesta[camp][key].color,
              poRespuesta[camp][key].menssa)));
        });
      } else {
        console.log('El sistema indica diferente a exito');
      }
    }
  }

  
  resuelveGrafica(poRespuesta: object, chartType: string, border: number, respon: boolean) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['status'];
      if (estatus === 'exito') {
        Object.keys(poRespuesta['graficos']).forEach(key => {
          let strlabel = poRespuesta['graficos'][key].label;
          this.cd_1 = [
            { data: [poRespuesta['graficos'][key].aciertos, poRespuesta['graficos'][key].desasiertos], label: strlabel }
          ];
          this.cc_1 = [{
            backgroundColor: [poRespuesta['graficos'][key].color, '#ccc'],
            borderWidth: border,
          }];
          this.charResul.push(new Grafica(chartType, this.cd_1, this.cl_1, this.cc_1, border, respon,
            poRespuesta['graficos'][key].evaluacionFinal,
            poRespuesta['graficos'][key].totalReactivos,
            poRespuesta['graficos'][key].puntacion))
        });
      } else {
        console.log('El sistema indica diferente a exito');
      }
    }
  }

}
