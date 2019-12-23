import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';
import { TagActividadInDTO } from 'src/app/compliance/models/TagActividadInDTO';
import { TagService } from 'src/app/compliance/services/tag.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { DatePipe } from '@angular/common';
import {GenerigResponseDTO} from '../../../models/GenerigResponseDTO';
import {log} from 'util';

@Component({
    selector: 'app-activitiesEdit',
    templateUrl: './activitiesEdit.component.html',
    providers: [DatePipe]
})
export class ActivitiesEditComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private tagService: TagService,
        private formBuilder: FormBuilder,
        public toastr: ToastrManager,
        private router: Router,
        public globalService: GlobalService,
        private eventService: EventService,
        private datePipe: DatePipe
    ) {

    }

    get f() {
        return this.actividadesForm.controls;
    }
    @Input() accion: string;
    @Input() actividadId: number;

    actividadesForm: FormGroup;
    soloLectura: boolean;
    isChecked: boolean;
    deshabiliarEstatus = true;
    idEstatusActivo;
    titulo: string;
    catalogType: CatalogType;
    tareaPorVencer = 40;
    tareaProximaVencer = 30;
    tareaTiempo = 30;
    checkedEstatus = false;
    checkedActivoId;
    checkedInactivoId;
    valueActiveStatus;
    disabledSave = false;

    showClone = false;
    showEditClonated = false;

    checkedClone = false;
    checkedEditClonated = false;

    origen: string;
    cloned = false;

    idStatus;
    actividad;
    result;
    idActividadByClonar: number;

    submitted = false;

    ngOnInit() {
        this.actividadesForm = this.formBuilder.group({
            fActividadId: ['', ''],
            fActividad: ['', Validators.required],
            fPrefijo: ['', Validators.required],
            fTareaPorVencer: ['40', [Validators.min(1), Validators.max(100)]],
            fTareaProximaVencer: [
                '30',
                [Validators.min(1), Validators.max(100)]
            ],
            fTareaTiempo: ['30', [Validators.min(1), Validators.max(100)]]
        });

        // this.accion = this.route.snapshot.params.accion;
        this.accion = this.catalogType.action;

        if (this.accion === 'editar') {
            this.deshabiliarEstatus = false;
            this.disabledSave = true;
            this.titulo = 'Editar / Catálogo de Categorías';
        } else if (this.accion === 'ver') {
            this.deshabiliarEstatus = true;
            this.titulo = 'Consultar / Catálogo de Categorías';
        } else {
            this.checkedEstatus = true;
            this.deshabiliarEstatus = false;
            this.titulo = 'Agregar / Catálogo de Categorías';
        }

        if (this.accion === 'editar' || this.accion === 'ver') {
            this.obtenerDatosActividad();
        }
    }

    obtenerDatosActividad() {
        this.actividadId = this.catalogType.id;

        if (this.actividadId > 0) {
            this.tagService.getActividad(this.actividadId).subscribe(
                respuesta => {
                    let tagActividad: TagActividadDTO;
                    tagActividad = respuesta as TagActividadDTO;
                    if (tagActividad != null && tagActividad.idActivity) {
                        this.actividadesForm.controls.fActividadId.setValue(
                            tagActividad.idActivity
                        );
                        this.actividadesForm.controls.fActividad.setValue(
                            tagActividad.name
                        );
                        this.actividadesForm.controls.fPrefijo.setValue(
                            tagActividad.prefix
                        );
                        this.actividadesForm.controls.fTareaPorVencer.setValue(tagActividad.timeTask);
                        this.actividadesForm.controls.fTareaProximaVencer.setValue(tagActividad.taskNextOvercome);
                        this.actividadesForm.controls.fTareaTiempo.setValue(
                            tagActividad.taskOvercome
                        );

                        this.checkedEstatus = tagActividad.active;
                        this.origen = tagActividad.referenceclone;
                        this.cloned = tagActividad.cloned;

                        if (this.accion === 'ver') {
                            this.soloLectura = true;
                            this.actividadesForm.controls.fPrefijo.disable();
                            this.actividadesForm.controls.fActividad.disable();
                        } else {
                            this.actividadesForm.controls.fPrefijo.disable();
                            this.actividadesForm.controls.fActividad.disable();
                            this.soloLectura = false;
                        }
                    } else {
                        this.toastr.infoToastr(
                            'No se encontró información del Tag buscado.',
                            'Lo siento,'
                        );
                    }
                    this.addBlock(2, null);
                },
                error => {
                    this.addBlock(2, null);
                    this.toastr.errorToastr(
                        'Error al obtener detalles de la actividad.',
                        'Lo siento,'
                    );
                }
            );
        }
    }
    onSubmit() {
        this.submitted = true;
        /*
    if ( (this.actividadesForm.controls['fTareaPorVencer'].value
          + this.actividadesForm.controls['fTareaProximaVencer'].value
          + this.actividadesForm.controls['fTareaTiempo'].value) != 100 ){
            this.toastr.errorToastr('La suma de todos los porcentajes, debe ser igual a 100.', 'Lo siento,');
            return;
          }
*/
        if (this.actividadesForm.invalid) {
            this.toastr.errorToastr(
                'Todos los campos son obligatorios, verifique.',
                'Lo siento,'
            );
            return;
        }

        if (this.actividadesForm.controls.fActividadId.value == 0) {
            this.crearActividad();
        } else {
            this.actualizarActividad();
        }
    }

    crearActividad() {
        if (this.checkedEstatus) {
            // this.idStatus = this.checkedActivoId;
            this.idStatus = true;
        } else {
            // this.idStatus = this.checkedInactivoId;
            this.idStatus = false;
        }

        this.origen = this.datePipe.transform(new Date(), 'ddMMyyyyHHmmssSSS');

        this.actividad = new TagActividadInDTO(
            0,
            this.actividadesForm.controls.fActividad.value,
            this.actividadesForm.controls.fPrefijo.value,
            this.idStatus,
            this.actividadesForm.controls.fTareaPorVencer.value,
            this.actividadesForm.controls.fTareaProximaVencer.value,
            this.actividadesForm.controls.fTareaTiempo.value,
            this.origen,
            0
        );

        this.tagService
            .crearActividad(this.actividad, this.globalService.plant.name)
            .subscribe(
                (result: GenerigResponseDTO) => {
                    if (result.clave === 99) {
                        this.toastr.errorToastr(
                            'El nombre del CATÁLOGO o del PREFIJO ya existe, favor de modificar.',
                            'Lo siento,'
                        );
                    } else {
                        this.idActividadByClonar = result.entity.idActivity;
                        this.toastr.successToastr(
                            'La actividad fue Creada con éxito.',
                            '¡Se ha logrado!'
                        );

                        if (this.accion === 'nuevo') {
                            this.soloLectura = true;
                            this.actividadesForm.controls.fActividad.disable();
                            this.actividadesForm.controls.fPrefijo.disable();
                            this.deshabiliarEstatus = true;
                            this.disabledSave = true;
                            this.showClone = true;
                        } else {
                            this.deshabiliarEstatus = true;
                            this.disabledSave = true;
                            this.showEditClonated = true;
                            // this.eventService.sendChangePage(new EventMessage(6, {} ,'Compliance.Categorías'));
                        }
                    }
                },
                error => {
                    this.toastr.errorToastr(
                        'Error al guardar la actividad.',
                        'Lo siento,'
                    );
                }
            );
    }

    clonar() {
        this.actividad = new TagActividadInDTO(
            0,
            this.actividadesForm.controls.fActividad.value,
            this.actividadesForm.controls.fPrefijo.value,
            this.idStatus,
            this.actividadesForm.controls.fTareaPorVencer.value,
            this.actividadesForm.controls.fTareaProximaVencer.value,
            this.actividadesForm.controls.fTareaTiempo.value,
            this.origen,
            1
        );

        const planta = (this.globalService.plant.name === 'SOL') ? 'AGUILA' : 'SOL';
        this.tagService.crearActividad(this.actividad, planta).subscribe((result: GenerigResponseDTO) => {
                if (result.clave === 99) {
                    this.toastr.errorToastr(
                        'El nombre del CATÁLOGO o del PREFIJO a Clonar ya existe, favor de modificar.',
                        'Lo siento,'
                    );
                } else {
                    this.tagService.actualizarPorClonacion(this.idActividadByClonar, result.entity.referenceclone).subscribe( (resultPadre: GenerigResponseDTO) => {
                        console.log('Se actualizo padre');
                    });
                    this.toastr.successToastr(
                        'La actividad fue Clonada con éxito.',
                        '¡Se ha logrado!'
                    );
                }

                this.eventService.sendChangePage(
                    new EventMessage(6, {}, 'Compliance.Categorías')
                );
            });
    }

    actualizarActividad() {
        if (this.checkedEstatus) {
            // this.idStatus = this.checkedActivoId;
            this.idStatus = true;
        } else {
            // this.idStatus = this.checkedInactivoId;
            this.idStatus = false;
        }

        this.actividad = new TagActividadInDTO(
            this.actividadesForm.controls.fActividadId.value,
            this.actividadesForm.controls.fActividad.value,
            this.actividadesForm.controls.fPrefijo.value,
            this.checkedEstatus,
            40, // this.actividadesForm.controls['fTareaPorVencer'].value,
            30, // this.actividadesForm.controls['fTareaProximaVencer'].value,
            30, // this.actividadesForm.controls['fTareaTiempo'].value);
            this.origen,
            0
        );

        this.tagService.editarActividad(this.actividad).subscribe(
            result => {
                this.toastr.successToastr(
                    'La actividad fue actualizada con éxito.',
                    '¡Se ha logrado!'
                );

                this.deshabiliarEstatus = true;
                this.disabledSave = true;
                this.showEditClonated = true;
                // this.eventService.sendChangePage(new EventMessage(6, {} ,'Compliance.Categorías'));
                // this.addBlock(2, null)
            },
            error => {
                this.addBlock(2, null);
                this.toastr.errorToastr(
                    'Error al Editar la actividad.',
                    'Lo siento,'
                );
            }
        );
    }

    editClonated() {
		/**
		 *
		 * Colocar un For para clonar en varias plantas
		 */
        this.tagService
            .setEditClonated(this.actividad, !this.globalService.aguila)
            .subscribe(dataBack => {
                this.toastr.successToastr(
                    'La actualización de elementos clonados se logró con éxito.',
                    '¡Se ha logrado!'
                );
                this.eventService.sendChangePage(
                    new EventMessage(6, {}, 'Compliance.Categorías')
                );
            });
    }

    // Compara valores del combo para seleccionar la opción correspondiente
    compareFn(combo1: number, combo2: number) {
        return combo1 && combo2 && combo1 === combo2;
    }

    chanceCheck() {
        if (this.checkedEstatus) { this.checkedEstatus = false; }
        else {
            this.checkedEstatus = true;
        }

        if (this.accion === 'editar') {
            this.disabledSave = false;
        }
    }

    // Loading
    private addBlock(type, msg): void {
        this.eventService.sendApp(
            new EventMessage(1, new EventBlocked(type, msg))
        );
    }

    regresar() {
        if (this.accion === 'nuevo' && !this.checkedClone) {
            let element_id;

            this.tagService
                .getCatalogoActividades('TODOS')
                .subscribe(dataBack => {
                    this.result = dataBack;

                    for (const element of this.result) {
                        if (
                            element.name ===
                            this.actividadesForm.controls.fActividad.value
                        ) {
                            element_id = element.idActivity;
                        }
                    }

                    if (this.checkedEstatus) {
                        this.idStatus = true;
                    } else {
                        this.idStatus = false;
                    }

                    this.actividad = new TagActividadInDTO(
                        element_id,
                        this.actividadesForm.controls.fActividad.value,
                        this.actividadesForm.controls.fPrefijo.value,
                        this.checkedEstatus,
                        40, // this.actividadesForm.controls['fTareaPorVencer'].value,
                        30, // this.actividadesForm.controls['fTareaProximaVencer'].value,
                        30, // this.actividadesForm.controls['fTareaTiempo'].value);
                        'NO_CLONADO',
                        0
                    );

                    this.tagService.editarActividad(this.actividad).subscribe(
                        result => {},
                        error => {
                            console.log(error as any);
                        }
                    );
                });
        }

        this.eventService.sendChangePage(
            new EventMessage(6, {}, 'Compliance.Categorías')
        );
    }

    changeClone() {
        this.checkedClone = !this.checkedClone;
    }

    changeEditClonated() {
        this.checkedEditClonated = !this.checkedEditClonated;
    }
}
