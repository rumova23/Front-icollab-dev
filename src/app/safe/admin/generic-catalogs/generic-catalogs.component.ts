import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventMessage} from '../../../core/models/EventMessage';
import {MasterCatalogService} from '../../services/master-catalog.service';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {EventService} from '../../../core/services/event.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MaestroDTO} from '../../../compliance/models/maestro-dto';
import {OpcionDTO} from '../../../compliance/models/opcion-dto';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ConceptDTO} from '../../models/concept-dto';

@Component({
  selector: 'app-generic-catalogs',
  templateUrl: './generic-catalogs.component.html',
  styleUrls: ['./generic-catalogs.component.scss']
})
export class GenericCatalogsComponent implements OnInit {
  title: string;
  genericsMaestro: MatTableDataSource <MaestroDTO>;
  @ViewChild('paginadorMaestro') paginadorMaestro: MatPaginator;
  genericsMaestroForm: FormGroup;
  cols: any[];
  colsCatalogo: any[];
  genericsOpciones: MatTableDataSource <OpcionDTO>;
  @ViewChild ('paginadorOpcion') paginadorOpcion: MatPaginator;
  genericOpcionForm: FormGroup;
  visibleDivOpcion: boolean;
  visibleDivMaestro: boolean;
  rowsPorPage = [5, 10, 25, 50];
  action: string;
  catalogName: string;

  constructor(
      private fbMaestro: FormBuilder,
      private fbOpcion: FormBuilder,
      public eventService: EventService,
      private toastr: ToastrManager,
      private masterCatalogService: MasterCatalogService) { }

  ngOnInit() {
    this.action = 'Guardar';
    this.visibleDivOpcion = false;
    this.colsCatalogo = [
      'codigo',
      'descripcion',
      'modificar'
    ];

    this.cols = [
      'nombre',
      'descripcion',
      'estatus',
      'ver',
      'modificar'
    ];
    this.title = 'Catalogos';
    this.genericOpcionForm = this.fbOpcion.group({
      codigo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
    this.genericsMaestroForm = this.fbMaestro.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      activo: new FormControl(false)
    });
    this.loadMasters();
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1,
        new EventBlocked(type, msg)));
  }

  loadMasters() {
    this.masterCatalogService.catalogosAll().subscribe(
        (data: Array<MaestroDTO>) => {
          this.genericsMaestro = new MatTableDataSource<MaestroDTO>(data);
          this.genericsMaestro.paginator = this.paginadorMaestro;
        },
        errorData => {
          console.dir(errorData);
        });
  }

  loadOpciones(catalogo) {
    this.masterCatalogService.getCatalogo(catalogo).subscribe(
        (data: Array<OpcionDTO>) => {
          console.dir(data);
          this.genericsOpciones = new MatTableDataSource<OpcionDTO>(data);
          this.genericsOpciones.paginator = this.paginadorOpcion;
        },
        errorData => {
          console.dir(errorData);
        });
  }

  newFrontOpcion() {
    this.action = 'Guardar'
    this.visibleDivOpcion = !this.visibleDivOpcion;
  }

  newFrontMaestro() {
    this.action = 'Guardar'
    this.visibleDivMaestro = !this.visibleDivMaestro;
  }

  saveMaestro(value: any) {
    if (this.action === 'Guardar') {
      this.addBlock(1, '');
      this.masterCatalogService.saveMaster(value).subscribe(
          data => {
            this.toastr.successToastr('Guradado Completo', 'Exito!.');
            this.addBlock(2, '');
          },
          errorData => {
            this.addBlock(2, '');
            this.toastr.errorToastr(errorData.error.message, 'Error!');
          },
          () => {
            this.loadMasters();
            this.visibleDivMaestro = false;
          });
    }
    if (this.action === 'Actualizar') {
      this.addBlock(1, '');
      console.dir(value);
      this.masterCatalogService.updateMaestro(value).subscribe(
          data => {
            this.toastr.successToastr('Actualizacion Completa', 'Exito!.');
            this.addBlock(2, '');
          },
          errorData => {
            this.addBlock(2, '');
            this.toastr.errorToastr(errorData.error.message, 'Error!');
          },
          () => {
            this.loadMasters();
            this.visibleDivMaestro = false;
          });
    }
  }

  saveOpcion(value: any) {
    if (this.action === 'Guardar') {
      this.addBlock(1, '');
      value.maestro = this.catalogName;
      this.masterCatalogService.saveCompleteOpcion(value).subscribe(
          data => {
            this.toastr.successToastr('Guardado Completo', 'Exito!.');
            this.addBlock(2, '');
          },
          errorData => {
            this.addBlock(2, '');
            this.toastr.errorToastr(errorData.error.message, 'Error!');
          },
          () => {
            console.log(this.catalogName);
            this.loadOpciones(this.catalogName);
            this.visibleDivOpcion = false;
          });
    }
    if (this.action === 'Actualizar') {
      this.addBlock(1, '');
      this.masterCatalogService.updateOpcion(value).subscribe(
          data => {
            this.toastr.successToastr('Actualizacion Completa', 'Exito!.');
            this.addBlock(2, '');
          },
          errorData => {
            this.addBlock(2, '');
            this.toastr.errorToastr(errorData.error.message, 'Error!');
          },
          () => {
            console.log(this.catalogName);
            this.loadOpciones(this.catalogName);
            this.visibleDivOpcion = false;
          });
    }
  }


  actionGeneral(generic: any, option: number) {
    switch (option) {
      case 0:
        this.visibleDivMaestro = true;
        this.action = 'Actualizar';
        this.genericsMaestroForm.patchValue(generic);
        break;
      case 1:
        console.dir(generic);
        this.visibleDivOpcion = true;
        this.action = 'Actualizar';
        this.genericOpcionForm.patchValue(generic);
        break;
      case 2:
        this.catalogName = generic.nombre;
        this.loadOpciones(this.catalogName);
        break;
    }
  }
}
