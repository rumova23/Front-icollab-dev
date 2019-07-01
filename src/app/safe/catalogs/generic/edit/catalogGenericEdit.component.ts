import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogGeneric } from 'src/app/safe/models/CatalogGeneric';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { EventMessage } from 'src/app/core/models/EventMessage';



@Component({
  selector: 'app-catalogGenericEdit',
  templateUrl: './catalogGenericEdit.component.html',
  styleUrls: ['./catalogGenericEdit.component.scss']
})
export class CatalogGenericEditComponent implements OnInit {
  genericForm: FormGroup;
  entity: Entity;
  catalogGeneric: CatalogGeneric;
  catalogGenericSelected: CatalogGeneric;
  catalog: string;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.genericForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'order': new FormControl('', Validators.required)
    });
    if (this.entity.readOnly) {
      this.genericForm.patchValue(this.catalogGenericSelected);
      this.genericForm.disable()
    } else if (this.entity.edit) {
      this.genericForm.patchValue(this.catalogGenericSelected);
    } else {
      this.catalogGeneric = {} as CatalogGeneric;
    }
  }

  getTitle() {
    const verbose = ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ");
    let title = "";
    switch (this.catalog) {
      case 'gender':
        title = "Género";
        break;
      case 'educationLevel':
        title = "Nivel de Estudios";
        break;
      case 'position':
        title = "Posición";
        break;
      case 'department':
        title = "Departamento";
        break;
      case 'workstation':
        title = "Puesto de trabajo";
        break;
      case 'employeeBoss':
        title = "Jefe del empleado";
        break;
      case 'workingHour':
        title = "Horario de trabajo";
        break;
      case 'employeePlace':
        title = "Lugar de trabajo";
        break;
      case 'employeeDependent':
        title = "Personas a cargo del empleado";
        break;
      case 'ethicalValue':
        title = "Valores";
        break;
      case 'aptitud':
        title = "Aptitudes";
        break;
      case 'typeCompliance':
        title = "Tipo de Cumplimiento";
        break;
      case 'authority':
        title = "Autoridades";
        break;
      case 'typeApplication':
        title = "Tipo de aplicación";
        break;
      case 'deliveryPeriod':
        title = "Periodo de entrega";
        break;
      case 'typeDay':
        title = "Tipo de días";
        break;
      case 'legalRequirement':
        title = "Requisito Legal";
        break;
      case 'responsible':
        title = "Responsable";
        break;
      case 'supervisor':
        title = "Supervisor";
        break;
      case 'typeEmployee':
        title = "Tipo de Empleado";
        break;
      case 'actorProfile':
        title = "Perfil Actor";
        break;

      case 'sys':
        title = "Sistema";
        break;
      case 'typeProduct':
        title = "Tipo de Producto";
        break;
      case 'paymentCondition':
        title = "Condición de Pago";
        break;
      case 'typeClient':
        title = "Tipo de Cliente";
        break;
      case 'country':
        title = "País";
        break;
      case 'bank':
        title = "Banco";
        break;
      case 'contractAffected':
        title = "Contrato Afectado";
        break;
      case 'listEquipment':
        title = "Equipo";
        break;
      case 'generationUnits':
        title = "Unidad de Generación";
        break;
      case 'valuesTolerance':
        title = "Valor de Tolerancia";
        break;
      case 'generatingSources':
          title = "Fuente Generadora";
          break;  
      case 'typesOffice':
        title = "Tipo de Despacho";
        break;
    }
    return verbose + ' ' + title;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    console.log(value);
    this.catalogGeneric = value;
    this.catalogGeneric.id = (this.catalogGenericSelected !== null && this.catalogGenericSelected !== undefined &&
      this.catalogGenericSelected.id !== null && this.catalogGenericSelected.id !== undefined
    ) ? this.catalogGenericSelected.id : 0;
    this.catalogGeneric.save = this.entity.new;
    this.catalogGeneric.catalog = this.catalog;
    console.log(this.catalogGeneric);
    this.catalogService.saveGeneric(this.catalogGeneric)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Clientes');
        });

  }

}
