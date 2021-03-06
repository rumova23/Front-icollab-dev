import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

import { GlobalService } from 'src/app/core/globals/global.service';
import { Combo } from 'src/app/compliance/models/Combo';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';
import { TagService } from 'src/app/compliance/services/tag.service';
import { Tag } from 'src/app/compliance/models/Tag';
import { TagPrecedente } from 'src/app/compliance/models/TagPrecedente';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';

import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { MaestroOpcionDTO } from '../../../../models/maestro-opcion-dto';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { ColumnLabel } from 'src/app/core/models/ColumnLabel';

@Component({
	selector: 'app-configActivities',
	templateUrl: './configActivities.component.html'
})
export class ConfigActivitiesComponent implements OnInit {

	plantaDefault = this.globalService.plantaDefaultId; // "70"; //"Planta Tuxpan II";
	a326 = null;
	@Input() accion: string;
	@Input() tagId: string;
	comboActividades: Array<Combo>;
	comboTipoCumplimiento: Array<Combo>;
	comboAutoridad: Array<Combo>;
	comboTipoAplicacion: Array<Combo>;
	comboUnitPeriod: Array<Combo>;
	comboTipoDias: Array<Combo>;
	comboEstatus: Array<Combo>;
	comboGrupo: Array<Combo>;
	listaCombos: Array<any>;
	cabeceraTagPrecedentes: string[] = ['tagHijo', 'tagHijoNombreCumplimiento', 'opcion'];
	columnas: string[] = ['tag', 'descripcion', 'assignPrecedent'];
	titulo: string;

	precedents;
	activities;
	activitiesColDisplay: string[];
	activityesColLabel: ColumnLabel[];
	precedentsColDisplay: string[];
	precedentsColLabel: ColumnLabel[];

	registros_x_pagina = [100, 200, 300];
	registros_x_pagina1 = [100, 200, 300];
	data: any[] = [];

	configActividadesForm: FormGroup;

	existeTagId: boolean;   // Muestra la tabla correspondiente a los precedentes
	tablaAgregarPrecedentes: boolean // Muestra la tabla de los precedentes para poder asignar

	habilitarActividad: boolean;
	soloLectura: boolean;
	deshabiliarEstatus = true;
	idActivo: string;
	catalogType: CatalogType;
	serviceSubscription: any;

	checkedCheckBox = false;
	indeterminateCheckBox = false;
	labelPositionCheckBox = 'after';
	disabledCheckBox = false;
	checkedEstatus = false;
	valueActiveStatus;
	checkedActivoId;
	checkedInactivoId;

	constructor(
		private cdRef: ChangeDetectorRef,
		private tagService: TagService,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		public globalService: GlobalService,
		private eventService: EventService,
		private confirmationDialogService: ConfirmationDialogService) {

		this.serviceSubscription = this.eventService.onChangePlant.subscribe({
			next: (event: EventMessage) => {
				switch (event.id) {
					case 100:
						this.changePlant();
						break;
				}
			}
		});
	}

	ngOnInit() {

		this.addBlock(1, 'Cargando...');
		this.accion = this.catalogType.action;
		this.existeTagId = false;
		this.tablaAgregarPrecedentes = false;

		this.habilitarActividad = false;

		this.comboActividades = new Array<Combo>();
		this.comboTipoCumplimiento = new Array<Combo>();
		this.comboAutoridad = new Array<Combo>();
		this.comboTipoAplicacion = new Array<Combo>();
		this.comboUnitPeriod = new Array<Combo>();
		this.comboTipoDias = new Array<Combo>();
		this.comboEstatus = new Array<Combo>();
		this.comboGrupo = new Array<Combo>();
		let statusConsult: string = null;
		if (this.accion === 'edit' || 'ver') {
			statusConsult = 'TODOS';
		}

		this.listaCombos = Array<OrderCatalogDTO>();
		this.listaCombos.push(new OrderCatalogDTO('typeCompliance', 1, 3));
		this.listaCombos.push(new OrderCatalogDTO('authority', 1, 3));
		this.listaCombos.push(new OrderCatalogDTO('typeApplication', 1, 3));
		this.listaCombos.push(new OrderCatalogDTO('typeDay', 1, 3));
		this.listaCombos.push(new OrderCatalogDTO('group', 1, 3));
		this.tagService.getlistCatalogoOrdenados(this.listaCombos).subscribe(
			poRespuesta => {
				this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
				this.resuelveDS(poRespuesta, this.comboAutoridad, 'authority');
				this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
				this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
				this.resuelveDS(poRespuesta, this.comboGrupo, 'group');
			}
		).add(() => {
			this.addBlock(2, null);
		});
		this.addBlock(1, 'Cargando...');
		let statusConsultActivity = 'ACTIVOS';
		if (this.accion === 'edit' || this.accion === 'ver') {
			statusConsultActivity = 'TODOS';
		} else if (this.accion === 'nuevo') {
			statusConsultActivity = 'ACTIVOS';
		}
		this.tagService.getCatalogoActividades(statusConsultActivity).subscribe(
			catalogoResult => {
				console.log(catalogoResult)
				let actividad: any;
				actividad = catalogoResult;
				actividad.forEach(element => {
					let combo: Combo;
					combo = new Combo(element.idActivity, element.name);
					this.comboActividades.push(combo);
				});
				this.addBlock(2, null);
			},
			error => {
				console.log('Error al obtener catalgo de actividades.');
				this.addBlock(2, null);
				this.toastr.errorToastr('Error al cargar catálogo de actividades.', 'Lo siento,');
			}
		).add(() => {
			this.addBlock(2, null);
		});

		this.initComboUnitPeriod();

		this.configActividadesForm = this.formBuilder.group({
			fIdTag: ['', ''],
			fTag: ['', Validators.required],
			fDescripcion: ['', Validators.required],
			fActividad: ['', Validators.required],
			fClasificacionActividad: ['', Validators.required],
			fTipoCumplimiento: [{ value: '1', disabled: true }, Validators.required],
			fRequisitoLegal: ['', Validators.required],
			fAutoridad: ['', Validators.required],
			fTipoAplicacion: ['', Validators.required],
			fPeriodoEntregaCantidad: ['', [Validators.required, Validators.min(1)]],
			fPeriodoEntregaUnidad: ['', Validators.required],
			fcomboGrupo: ['', Validators.required],
			fTipoDias: [{ value: '2', disabled: true }, Validators.required]
		});

		if (this.accion === 'edit') {
			this.deshabiliarEstatus = false;
			this.titulo = 'Editar';
		} else if (this.accion === 'ver') {
			this.deshabiliarEstatus = true;
			this.titulo = 'Consultar';
		} else {
			this.checkedEstatus = true;
			this.deshabiliarEstatus = false;
			this.titulo = 'Agregar';
			this.configActividadesForm.controls['fTag'].disable();
		}

		if (this.accion === 'edit' || this.accion === 'ver') {
			this.obtenerActividadurl();
		}

		this.activitiesColDisplay = [
//			'tagId',
			'tag',
			'descripcion',
			'sys_checkbox',
		];
		this.activityesColLabel = [
//			{ key: 'tagId', label: 'TAG ID' },
			{ key: 'tag', label: 'TAG' },
			{ key: 'descripcion', label: 'DESCRIPCION' },
			{ key: 'visible', label: 'Visible' },
		];

		this.precedentsColDisplay = [
//			'tagId',
			'tagHijo',
			'tagHijoNombreCumplimiento',
			'sys_delete',
		];
		this.precedentsColLabel = [
//			{ key: 'tagId', label: 'TAG ID' },
			{ key: 'tagHijo', label: 'Actividad' },
			{ key: 'tagHijoNombreCumplimiento', label: 'Nombre del Cumplimiento' }
		];

	}

	get f() { return this.configActividadesForm.controls; }

	isnumeric(link) {
		if (isNaN(Number(this.a326)) || 0 === Number(this.a326)) {
			// para no permitir letras, que en firefox si permite insertarlas
			this.a326 = null;
			link.value = null;
			this.formatPeriodo_entrega(false);
		} else if (Number(this.a326) > 1) {
			this.formatPeriodo_entrega(true);
		} else if (Number(this.a326) <= 1) {
			this.formatPeriodo_entrega(false);
		}
	}

	formatPeriodo_entrega(plural) {
		for (const period of this.comboUnitPeriod) {
			if (plural) {
				switch (period.label) {
					case 'DIA':
					case 'AÑO':
					case 'SEMANA':
					case 'HORA':
						period.label = period.label + 'S';
						break;
					case 'MES':
						period.label = 'MESES';
						break;
					default:
						break;
				}
			} else {
				switch (period.label) {
					case 'DIAS':
						period.label = 'DIA';
						break;
					case 'AÑOS':
						period.label = 'AÑO';
						break;
					case 'SEMANAS':
						period.label = 'SEMANA';
						break;
					case 'HORAS':
						period.label = 'HORA';
						break;
					case 'MESES':
						period.label = 'MES';
						break;
					default:
						break;
				}
			}
		}
	}

	changePlant() {
		this.plantaDefault = this.globalService.plantaDefaultId;
	}

	resuelveDS(poRespuesta: object, combo: Array<any>, comp: string) {
		if (!poRespuesta) {
			console.log('El back no responde');
		} else {
			let catalogs: any;
			catalogs = poRespuesta;
			catalogs.forEach(element => {
				if (element.catalog === comp) {
					element.data.forEach(elementCatalog => {
						let value = elementCatalog.id;
						let label = elementCatalog.code;
						if (this.accion === 'nuevo') {
							if (elementCatalog.active) {
								combo.push(new Combo(value, label));
							}
						} else {
							combo.push(new Combo(value, label));
						}
					});
				}
			});
		}
	}

	submitted = false;
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.configActividadesForm.invalid) {
			this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
			return;
		}

		this.guardarConfiguracionActividad();

	}

	chanceCheck() {
		if (this.checkedEstatus)
			this.checkedEstatus = false;
		else {
			this.checkedEstatus = true;
		}
	}
	guardarConfiguracionActividad() {
		let tagId = 0; //ID TAG, AUTONUMERICO

		if (this.configActividadesForm.controls['fIdTag'].value > 0) {
			tagId = this.configActividadesForm.controls['fIdTag'].value;
		}
		let listTagPrecedentes = [];

		if (this.precedents != null) {
			listTagPrecedentes = new Array<TagPrecedente>();
			this.precedents.forEach(element => {
				listTagPrecedentes.push(element.elementTag);
			});
		}
		let actividad = new Tag(
			tagId,
			this.configActividadesForm.controls['fTag'].value,
			this.configActividadesForm.controls['fDescripcion'].value,
			this.configActividadesForm.controls['fActividad'].value,
			this.configActividadesForm.controls['fClasificacionActividad'].value,
			this.configActividadesForm.controls['fTipoCumplimiento'].value,
			this.configActividadesForm.controls['fRequisitoLegal'].value,
			this.configActividadesForm.controls['fAutoridad'].value,
			this.configActividadesForm.controls['fTipoAplicacion'].value,
			this.configActividadesForm.controls['fPeriodoEntregaUnidad'].value,
			this.configActividadesForm.controls['fPeriodoEntregaCantidad'].value,
			this.configActividadesForm.controls['fTipoDias'].value,
			this.configActividadesForm.controls['fcomboGrupo'].value,
			this.checkedEstatus,
			listTagPrecedentes,
		);

		this.tagService.save(actividad).subscribe(
			respuesta => {
				if (respuesta.clave === 0) {
					this.habilitarActividad = true;
					this.configActividadesForm.controls['fIdTag'].setValue(respuesta.entity.idTag);
					this.existeTagId = true;

					this.toastr.successToastr('Configuración de actividad guardada con éxito.', '¡Se ha logrado!');
				} else {
					this.toastr.errorToastr('Ya existe una actividad con los mismos datos capturados.', '¡Lo siento!');
				}
			},
			error => {
				this.existeTagId = false;
				this.toastr.errorToastr('Error al guardar la configuración de actividad.', 'Lo siento,');
			}
		);
	}

	regresar() {
		this.eventService.sendChangePage(new EventMessage(8, {}, 'Compliance.Características'));
	}

	// Obtiene la información de un TAG
	obtenerActividadurl() {
		this.addBlock(1, 'Cargando...');
		this.tagId = this.catalogType.id;
		this.tagService.getActividadPorTag(this.tagId).subscribe(
			(tagActividad: Tag) => {
				if (tagActividad != null && tagActividad.idTag) {
					this.configActividadesForm.controls['fTag'].setValue(tagActividad.tag);
					this.configActividadesForm.controls['fIdTag'].setValue(tagActividad.idTag);
					this.configActividadesForm.controls['fDescripcion'].setValue(tagActividad.description);
					this.configActividadesForm.controls['fClasificacionActividad'].setValue(tagActividad.classificationActivity);
					this.configActividadesForm.controls['fRequisitoLegal'].setValue(tagActividad.requisitoLegal);
					this.configActividadesForm.controls['fActividad'].patchValue(tagActividad.idActivity);
					this.configActividadesForm.controls['fTipoCumplimiento'].patchValue(tagActividad.idTypeCompliance);
					this.configActividadesForm.controls['fAutoridad'].patchValue(tagActividad.idAuthority);
					this.configActividadesForm.controls['fTipoAplicacion'].patchValue(tagActividad.idApplicationType);
					this.configActividadesForm.controls['fPeriodoEntregaCantidad'].patchValue(tagActividad.period);
					this.configActividadesForm.controls['fPeriodoEntregaUnidad'].patchValue(tagActividad.unitPeriod);
					this.configActividadesForm.controls['fTipoDias'].patchValue(tagActividad.idDaysType);
					this.configActividadesForm.controls['fcomboGrupo'].patchValue(tagActividad.idGroup);
					this.valueActiveStatus = tagActividad.active;
					this.checkedEstatus = tagActividad.active;

					if (tagActividad.precedents != null) {

						this.precedents = tagActividad.precedents
							.map((e: any) => {
								return {
									'tagId': e.idTagPrecedent,
									'tagPadre': e.tagPadre.tag,
									'tagHijo': e.tagHijo.tag,
									'tagHijoNombreCumplimiento': e.tagHijo.classificationActivity,
									'elementTag': e
								};
							});

						this.existeTagId = true;
					}

					if (this.accion === 'ver') {
						this.soloLectura = true;
						this.configActividadesForm.controls['fTag'].disable();
						this.configActividadesForm.controls['fDescripcion'].disable();
						this.configActividadesForm.controls['fActividad'].disable();
						this.configActividadesForm.controls['fClasificacionActividad'].disable();
						this.configActividadesForm.controls['fTipoCumplimiento'].disable();
						this.configActividadesForm.controls['fRequisitoLegal'].disable();
						this.configActividadesForm.controls['fAutoridad'].disable();
						this.configActividadesForm.controls['fTipoAplicacion'].disable();
						this.configActividadesForm.controls['fPeriodoEntregaCantidad'].disable();
						this.configActividadesForm.controls['fPeriodoEntregaUnidad'].disable();
						this.configActividadesForm.controls['fTipoDias'].disable();
						this.configActividadesForm.controls['fcomboGrupo'].disable();
						this.habilitarActividad = false;
						this.existeTagId = true;
					} else {
						this.soloLectura = false;
						this.configActividadesForm.controls['fTag'].disable();
						this.configActividadesForm.controls['fActividad'].disable();
						this.configActividadesForm.controls['fAutoridad'].disable();
						this.configActividadesForm.controls['fTipoAplicacion'].disable();
						this.configActividadesForm.controls['fPeriodoEntregaCantidad'].disable();
						this.configActividadesForm.controls['fPeriodoEntregaUnidad'].disable();
						this.configActividadesForm.controls['fTipoDias'].disable();
						this.configActividadesForm.controls['fcomboGrupo'].disable();
						this.configActividadesForm.controls['fTipoCumplimiento'].disable();
						this.configActividadesForm.controls['fDescripcion'].enable();
						this.configActividadesForm.controls['fClasificacionActividad'].enable();
						this.configActividadesForm.controls['fRequisitoLegal'].enable();
						this.tablaAgregarPrecedentes = false;
						this.existeTagId = true;
					}


				} else {
					this.limpiarFormulario();
					this.existeTagId = false;
					this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Lo siento,');
				}

				this.addBlock(2, null);
			},
			error => {
				this.addBlock(2, null);
				this.toastr.errorToastr('Error al cargar detalles de la actividad.', 'Lo siento,');
			}
		)
	}

	// Compara valores del combo para seleccionar la opción correspondiente
	compareFn(combo1: number, combo2: number) {
		console.log(combo1 && combo2 && combo1 === combo2);
		return combo1 && combo2 && combo1 === combo2;
	}

	limpiarFormulario() {
		this.habilitarActividad = false;
		let arreglo: Array<number>;
		arreglo = new Array<number>();

		this.configActividadesForm.reset({
			fIdTag: '', fDescripcion: '',
			fClasificacionActividad: '',
			fRequisitoLegal: '',
			fActividad: { value: '', disabled: false },
			fTipoCumplimiento: { value: '1', disabled: true },
			fAutoridad: { value: '', disabled: false },
			fTipoAplicacion: { value: '', disabled: false },
			fPeriodoEntregaCantidad: { value: '', disabled: false },
			fPeriodoEntregaUnidad: { value: '', disabled: false },
			fTipoDias: { value: '2', disabled: true },
			fcomboGrupo: { value: '', disabled: false }
		});
		this.existeTagId = false;
	}

	// Muestra las actividades que pueden ser agregadas como precedentes
	mostrarPrecedentes() {
		this.addBlock(1, 'Cargando...');
		let tag = this.configActividadesForm.controls['fTag'].value;
		this.tagService.getActividadesPrecedentes(tag).subscribe(
			data => {

				if (data.length > 0) {
					this.tablaAgregarPrecedentes = true;
					this.activities = data
						.map((e: any) => {
							return {
								'tagId' : e.idTag,
								'tag': e.tag,
								'descripcion': e.description,

							};
						});

				} else {
					this.tablaAgregarPrecedentes = false;
					this.toastr.errorToastr('No hay actividades que puedan ser asignadas como precedentes.', 'Lo siento,');
				}

				this.addBlock(2, null);

			},
			error => {
				this.addBlock(2, null);
				this.toastr.errorToastr('Error al cargar lista de precedentes.', 'Lo siento,');
			}
		)
	}

	// Agrega las actividades precedentes a la actividad actual
	agregarPrecedentes() {
		let tag = this.configActividadesForm.controls['fTag'].value;
		let selectActivities = [];
		this.activities.forEach(e => {
			if (e.visible === true) {
				selectActivities.push(e.tag);
			}
		});
		if (selectActivities.length > 0) {
			this.addBlock(1, 'Cargando...');
			this.tagService.agregarPrecedentes(tag, selectActivities.toString()).subscribe(
				respuesta => {

					this.precedents = respuesta
						.map((e: any) => {
							return {
								'tagId': e.idTagPrecedent,
								'tagPadre': e.tagPadre.tag,
								'tagHijo': e.tagHijo.tag,
								'tagHijoNombreCumplimiento': e.tagHijo.classificationActivity,
								'elementTag': e
							};
						});

					this.tablaAgregarPrecedentes = false;
					this.addBlock(2, null);

				},
				error => {
					this.addBlock(2, null);
					this.toastr.errorToastr('Error al agregar precedentes.', 'Lo siento,');
				}
			)

		} else {
			this.toastr.errorToastr('Debe seleccionar por lo menos 1 tag a asignar.', 'Lo siento,');
		}

		console.log('agregarPrecedente: precedents');
		console.log(this.precedents);

	}

	// Asigna el nombre del tag con base en el catalogo de actividades y un consecutivo
	asignarNombreTag(actividadId: any) {
		this.tagService.getPrefijoConsecutivo(actividadId).subscribe(
			(tagActividadDTO: TagActividadDTO) => {
				console.log(tagActividadDTO.siguienteCodigoTag);
				this.configActividadesForm.controls['fTag'].setValue(tagActividadDTO.siguienteCodigoTag);
			},
			error => {
				console.log(' Error al asignar nombre de TAG');
			}
		);
	}


	// Loadin
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}

	initComboUnitPeriod() {
		this.tagService.comboUnitPeriod().subscribe(
			(lista: Array<MaestroOpcionDTO>) => {
				console.dir(lista);
				lista.forEach((elemento: MaestroOpcionDTO) => {
					this.comboUnitPeriod.push(new Combo(elemento.maestroOpcionId.toString(), elemento.opcion.codigo));
				});
			});
	}

	onSelected(row: any) {
		this.activities.forEach(element => {
			if (element.tagId === row.tagId) {
				element.visible = !element.visible;
			}
		});
	}

	deletePrecedent($event) {
		if (!this.soloLectura) {
			this.addBlock(1, 'Cargando...');
			this.tagService.eliminarPrecedente($event.elementTag).subscribe(
				result => {
					console.log(result);

					if (result != null) {

						this.precedents = result
							.map((e: any) => {
								return {
									'tagId': e.idTagPrecedent,
									'tagPadre': e.tagPadre.tag,
									'tagHijo': e.tagHijo.tag,
									'tagHijoNombreCumplimiento': e.tagHijo.classificationActivity,
									'elementTag': e
								};
							});

					} else {
						this.precedents = null;
					}

					this.tablaAgregarPrecedentes = false;
					this.addBlock(2, null);
				},
				error => {
					this.addBlock(2, null);
					this.toastr.errorToastr('Error al eliminar precedente.', 'Lo siento,');
				})
		}
	}

}
