import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';
import {Comentario} from '../../../../../core/models/comentario';
import {ObservacionCompliance} from '../../../../models/ObservacionCompliance';
import {Documents} from '../../../../models/Documents';
import {CarasDocument} from '../../../../models/CarasDocument';

@Component({
  selector: 'app-task-observacion',
  templateUrl: './task-observacion.component.html',
  styleUrls: ['./task-observacion.component.scss']
})
export class TaskObservacionComponent implements OnInit {
  @Input() accion: string;
  @Input() complianceId: number;
  obsForm: FormGroup;
  isdisabled = false;
  submitted = false;
  headObservaciones = ['#', 'Observaciones', 'Fecha de ultima modificación'];
  observacioes: Array<any>;

  typeDocuments = ['Documentos', 'Registros', 'Referencias'];
  titleDocument: Array<any>;

  constructor(
      private formBuildier: FormBuilder,
      public toastr: ToastrManager,
      private administratorComplianceService: AdministratorComplianceService) {
    this.observacioes = [];
    this.titleDocument = [];
    this.administratorComplianceService.accion.subscribe(accion => {
      this.titleDocument = [];
      if (accion === 'upload') {
        this.getDocumentos();
      }
    });
  }

  ngOnInit() {
    this.obsForm = this.formBuildier.group({
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.obtieneObservaciones();
    this.getDocumentos();
  }
  obtieneObservaciones() {
    this.administratorComplianceService.obtenObservaciones(this.complianceId).subscribe(
        (retorno: Array<ObservacionCompliance>) => {
          retorno.forEach(elementActual => {
            this.resuelveDS(elementActual);
          });
          this.toastr.successToastr('Observaciones Encontradas, cantidad: ' + retorno.length, 'Success!');
        },
        error => {
          this.toastr.errorToastr('Hubo error al guardar la observacion. Intentelo mas tarde.', 'Oops!');
        });
  }

  resuelveDS(comenta) {
    this.observacioes.push(
        new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
  }
  onSubmit() {
    this.submitted = true;
    if (this.obsForm.invalid) {
      this.toastr.errorToastr('Error, Debe de escribir un comentario.', 'Oops!');
      return;
    }
    this.administratorComplianceService.guardaObservacion(this.complianceId, this.obsForm.controls.fObserva.value).subscribe(
        (retorno: ObservacionCompliance) => {
          this.resuelveDS(retorno);
          this.toastr.successToastr('Observacion guardada satisfactoriamente.', 'Success!');
        });
  }
  get f() { return this.obsForm.controls; }

  getDocumentos() {
    for (let i = 0; i < this.typeDocuments.length; i++) {
      let documents: Documents;
      let carasDocumnts: Array<CarasDocument>;
      carasDocumnts =  [];
      this.administratorComplianceService.obtenDocumentos(this.complianceId, this.typeDocuments[i]).subscribe(docto => {
        for (let j = 0; j < docto.length; j++) {
          carasDocumnts.push(new CarasDocument(docto[j].fileName, 'png', docto[j].fileId));
        }
      });
      documents = new Documents(this.typeDocuments[i], carasDocumnts);
      this.titleDocument.push(documents);
    }
  }

  downloadFile(fileId: number) {
  }
}
