import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ActivatedRoute } from '@angular/router';
import { MaestroOpcion } from 'src/app/core/models/maestro-opcion';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { EstatusMaestroService } from 'src/app/core/services/estatus-maestro.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';



@Component({
  selector: 'app-complianceTypes',
  templateUrl: './complianceTypes.component.html',
  styleUrls: ['./complianceTypes.component.scss']
})
export class ComplianceTypesComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() nombreCatalogo: string;
  entidadEstatusId: string;

  // tslint:disable-next-line:ban-types
  titulo: String = 'Catálogos / ' + this.route.snapshot.params.nombreCatalogo;
  registros: MatTableDataSource<MaestroOpcion>;
  columnas: string[] = ['Orden', 'Opcion', 'Descripcion', 'Estatus', 'Ver', 'Modificar','Eliminar' ];
  filtros = [
    {label: 'Tipo de cumplimiento', inputtype: 'text'},
    {label: 'Activo', inputtype: 'text'},
  ];
  filtrobtn = {label: 'buscar'};
  // tslint:disable-next-line:variable-name
  registros_x_pagina = [50, 100, 250, 500];


  constructor(
                private catalogoMaestroService: CatalogoMaestroService,
                private estatusMaestroService: EstatusMaestroService,
                private route: ActivatedRoute,
                private confirmationDialogService: ConfirmationDialogService,
                public toastr: ToastrManager) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.nombreCatalogo = this.route.snapshot.params.nombreCatalogo;
    this.cargaDatos();
    this.estatusMaestroService.getEntidadEstatus( 'CAT_MAESTRO_OPCION', 'Activo').subscribe(data => {
      this.entidadEstatusId = data.entidadEstatusId;
    });
  }

  cargaDatos() {
    this.catalogoMaestroService.getCatalogo( this.nombreCatalogo ).subscribe(data => {
      this.registros =  new MatTableDataSource<MaestroOpcion>(data);
      this.registros.paginator = this.paginator;
      this.registros.sort = this.sort;

    });
  }

  eliminarRegistro(maestroOpcion: any) {
      this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el registro? ')
          .then((confirmed) => {
            if (confirmed) {
              this.catalogoMaestroService.borrarEstatus(
                  maestroOpcion.maestroOpcionId
              ).subscribe(data => {
                this.cargaDatos();
                this.toastr.successToastr('El registro fue correctamente eliminado', 'Success!');
              });
            }
          })
          .catch(() => console.log('Cancelo'));
  }
}
