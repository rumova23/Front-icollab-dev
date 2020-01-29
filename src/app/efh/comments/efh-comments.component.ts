import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../core/services/perfil-combo.service';
import {GlobalService} from '../../core/globals/global.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Comentario} from '../../core/models/comentario';
import {Comment} from '../models/Comment';
import {EfhService} from '../../core/services/efh.service';
import {EventMessage} from '../../core/models/EventMessage';
import {ConfirmationDialogService} from '../../core/services/confirmation-dialog.service';
import {first} from 'rxjs/operators';
import {debug} from 'util';
import {EventBlocked} from '../../core/models/EventBlocked';
import {EventService} from '../../core/services/event.service';

@Component({
  selector: 'app-efh-comments',
  templateUrl: './efh-comments.component.html',
  styleUrls: ['./efh-comments.component.scss']
})
export class EfhCommentsComponent implements OnInit, OnDestroy {
  @Input() inIdEventConfig: number;
  @Input() inAction: string;
  @Input() inTypeConfig: number;
  calificacionId: number;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación', 'Visible', 'Editar', 'Eliminar'];
  observationsArr: Array<any>;
  dataObservationSumbit = {};
  obsForm: FormGroup;
  submitted = false;
  isdisabled = false;
  resultService;
  isAddObvsDisabled = true;
  checkedEstatus = true;
  currentComment: any;
  obvsSaved = false;
  subscription;
  delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(public efhService: EfhService,
              public globalService: GlobalService,
              private eventService: EventService,
              private confirmationDialogService: ConfirmationDialogService,
              private formBuildier: FormBuilder, public toastr: ToastrManager) {
    this.observationsArr = [];
    this.subscription = this.efhService.accionComments.subscribe(
        async accion => {
          if (accion.includes('savenewcommentsevent|') && this.observationsArr.length !== 0) {
            const idEvent = Number((accion.split('|')[1]));
            this.saveObservations(idEvent);
            this.inIdEventConfig = idEvent;
            await this.delay(1000);
            this.ngOnInit();
          }
          if (accion === 'updatecommentscomponent') {
            this.observationsArr = [];
            this.ngOnInit();
          }
        }
    );
  }

  ngOnInit() {
    this.obsForm = this.formBuildier.group({
      observations: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    if (this.inAction === 'ver') {
      this.isAddObvsDisabled = true;
    }
    this.getObservations(this.inIdEventConfig);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  get f() { return this.obsForm.controls; }

  getObservations(idEventConfig: number) {
    this.addBlock(1, 'Cargando...');
    this.efhService.getObservations(this.inTypeConfig, idEventConfig).subscribe(
        data => {
          this.resultService = data;
          for (const element of this.resultService) {
              debugger;
            let idConfig = '';
            if (element.ideventconfig !== undefined && element.ideventconfig !== null) {
                idConfig = element.ideventconfig;
            }
            if (element.idindicatorconfig !== undefined && element.idindicatorconfig !== null) {
                idConfig = element.idindicatorconfig;
            }
            this.observationsArr.push(new Comment(element.id, idConfig, 'tester', element.observation, new Date(element.dateobservation), element.active, true));
          }
        }
    ).add(() => {
        this.addBlock(2, null);
    });
  }

  private addBlock(type, msg): void {
      this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  saveObservations(idEventConfig: number) {
    const observationsArrAux = this.observationsArr;
    for (const comment of observationsArrAux) {
      this.dataObservationSumbit = {};
      if (this.inTypeConfig === 1) {
          this.dataObservationSumbit['ideventconfig'] = idEventConfig;
      } else if (this.inTypeConfig === 2) {
          this.dataObservationSumbit['idindicatorconfig'] = idEventConfig;
      }
      this.dataObservationSumbit['observation'] = comment.observacion;
      this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
      this.dataObservationSumbit['active'] = comment.active;
      this.dataObservationSumbit['save'] = true;
      this.efhService.saveObservation(this.inTypeConfig, this.dataObservationSumbit).subscribe(
          data => {
              console.log('exito obs');
          },
          error => {
              console.log('error obs');
          }
      );
    }
     this.isAddObvsDisabled = true;
     this.observationsArr = [];
  }

  saveObservation(idEventConfig: number, comment: string) {
    this.dataObservationSumbit = {};
    if (this.inTypeConfig === 1) {
        this.dataObservationSumbit['ideventconfig'] = idEventConfig;
    } else if (this.inTypeConfig === 2) {
        this.dataObservationSumbit['idindicatorconfig'] = idEventConfig;
    }
    this.dataObservationSumbit['observation'] = comment;
    this.dataObservationSumbit['dateobservation'] = new Date();
    this.dataObservationSumbit['active'] = true;
    this.dataObservationSumbit['save'] = true;
    this.efhService.saveObservation(this.inTypeConfig, this.dataObservationSumbit).subscribe(
        data => {
          this.toastr.successToastr('La observación fue registrada con éxito.', '¡Se ha logrado!');
          this.efhService.accionComments.next('updatecommentscomponent');
        },
        error => {
          this.toastr.errorToastr(error.error['text'], 'Lo siento,');
        }
    );
  }

  updateObservation(comment: any) {
    this.dataObservationSumbit = {};
    this.dataObservationSumbit['id'] = comment.id;
    // this.dataObservationSumbit['ideventconfig'] = comment.ideventconfig;
    if (this.inTypeConfig === 1) {
        this.dataObservationSumbit['ideventconfig'] = comment.ideventconfig;
    } else if (this.inTypeConfig === 2) {
        this.dataObservationSumbit['idindicatorconfig'] = comment.ideventconfig;
    }
    this.dataObservationSumbit['observation'] = comment.observacion;
    this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
    this.dataObservationSumbit['active'] = comment.active;
    this.dataObservationSumbit['save'] = false;
    this.efhService.saveObservation(this.inTypeConfig, this.dataObservationSumbit).subscribe(
        data => {
          this.toastr.successToastr('La observación fue actualizada con éxito.', '¡Se ha logrado!');
          this.efhService.accionComments.next('updatecommentscomponent');
        },
        error => {
          this.toastr.errorToastr(error.error['text'], 'Lo siento, no fue posible eliminar la observación');
        }
    );
  }

  visibleObservation(comment: any) {
    this.dataObservationSumbit = {};
    this.dataObservationSumbit['id'] = comment.id;
    // this.dataObservationSumbit['ideventconfig'] = comment.ideventconfig;
    if (this.inTypeConfig === 1) {
        this.dataObservationSumbit['ideventconfig'] = comment.ideventconfig;
    } else if (this.inTypeConfig === 2) {
        this.dataObservationSumbit['idindicatorconfig'] = comment.ideventconfig;
    }
    this.dataObservationSumbit['observation'] = comment.observacion;
    this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
    this.dataObservationSumbit['active'] = !comment.active;
    this.dataObservationSumbit['save'] = false;
    this.efhService.saveObservation(this.inTypeConfig, this.dataObservationSumbit).subscribe(
        data => {
          this.toastr.successToastr('La observación fue actualizada con éxito.', '¡Se ha logrado!');
          this.efhService.accionComments.next('updatecommentscomponent');
        },
        error => {
          this.toastr.errorToastr(error.error['text'], 'Lo siento, no fue posible eliminar la observación');
        }
    );
  }

  setToEdit(comment: any) {
    this.currentComment = comment;
    this.obsForm.controls.observations.setValue(comment.observacion);
  }

  addObservation() {
    if (this.inAction === 'editar') {
      if (this.currentComment) {
        this.currentComment.observacion = this.obsForm.controls.observations.value;
        this.updateObservation(this.currentComment);
        this.currentComment = null;
      } else {
        this.saveObservation(this.inIdEventConfig, this.obsForm.controls.observations.value);
      }
    } else {
      const obser = this.obsForm.controls.observations.value;
      if (obser === null || obser === '') {
        this.toastr.errorToastr('No se puede agregar una observación vacía', 'Lo siento,');
      } else {
        this.obsForm.controls.observations.setValue('');
        if (this.inAction === 'nuevo') {
          this.observationsArr.push(new Comment('1', '', 'tester', obser, new Date(), true, false));
        } else {
          this.saveObservation(this.inIdEventConfig, obser);
        }
        this.isAddObvsDisabled = true;
      }
    }
  }

  enableSaveButton() {
    if (this.inAction !== 'ver') {
      this.isAddObvsDisabled = false;
    }
  }

  eliminarRegistro(id: number) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
        'Está seguro de eliminar la observación?')
        .then((confirmed) => {
          if (confirmed) {
            this.efhService.deleteObservation(this.inTypeConfig, id)
                .subscribe(
                    data => {
                      this.toastr.successToastr('La observación fué eliminada correctamente', '¡Se ha logrado!');
                      this.efhService.accionComments.next('updatecommentscomponent');
                    }
                    , error => {
                      if (error.error['text'] === 'OK') {
                        this.toastr.successToastr('La observación fué eliminada correctamente', '¡Se ha logrado!');
                        this.efhService.accionComments.next('updatecommentscomponent');
                      } else {
                        this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                      }
                    },
                );
          }
        })
        .catch(() => console.log('Canceló eliminar'));
  }

  dummy() {

  }

}
