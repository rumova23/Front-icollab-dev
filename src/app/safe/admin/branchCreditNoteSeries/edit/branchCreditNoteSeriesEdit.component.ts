import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { MarketService } from 'src/app/safe/services/market.service';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';
import { PlantBranchOffice } from 'src/app/safe/models/PlantBranchOffice';
import { BranchOfficeInvoiceSerie } from 'src/app/safe/models/BranchOfficeInvoiceSerie';
import { BranchOfficeCreditNoteSerie } from 'src/app/safe/models/BranchOfficeCreditNoteSerie';



@Component({
  selector: 'app-branchCreditNoteSeriesEdit',
  templateUrl: './branchCreditNoteSeriesEdit.component.html',
  styleUrls: ['./branchCreditNoteSeriesEdit.component.scss']
})
export class BranchCreditNoteSeriesEditComponent implements OnInit {
  branchInvoiceSeriesForm: FormGroup;
  entity: Entity;
  systems: Array<CatalogOrderGeneric> = [];
  plantBranches : Array<PlantBranchOffice> = [];
  branchOfficeCreditNoteSerie: BranchOfficeCreditNoteSerie;
  branchOfficeCreditNoteSerieSelected: BranchOfficeCreditNoteSerie;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private marketService: MarketService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getSystems();
    this.branchInvoiceSeriesForm = this.fb.group({
      'serie': new FormControl('', Validators.required),
      'plantBranchOffice': new FormControl('', Validators.required),
      'sys': new FormControl('', Validators.required),
      'active': new FormControl(false)
    });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + " Serie Factura";
  }

  private getSystems() {
    this.catalogService.get('sys')
      .subscribe(
        data => {
          this.systems = data;
          console.log(this.systems);
          this.getPlantBranches();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sistemas');
        });
  }

  getPlantBranches() {
    this.marketService.getPlantBranches(this.globalService.plantaDefaultId)
      .subscribe(
        data => {
          this.plantBranches = data;
          if (this.entity.readOnly) {
            this.branchOfficeCreditNoteSerie.plantBranchOffice 
            = this.plantBranches.filter(entity =>
              entity.id ===   this.branchOfficeCreditNoteSerie.idPlantBranchOffice)[0];
            this.branchOfficeCreditNoteSerie.sys 
            = this.systems.filter(entity =>
              entity.id ===   this.branchOfficeCreditNoteSerie.idSys)[0];
          } else {
            this.branchOfficeCreditNoteSerie = {} as BranchOfficeInvoiceSerie;
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sucursales de la planta');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.code === o2.code && o1.id === o2.id;
  }

  save(value) {
    this.branchOfficeCreditNoteSerie = value;
    this.branchOfficeCreditNoteSerie.idPlantBranchOffice = 
            this.branchOfficeCreditNoteSerie.plantBranchOffice.id;
    this.branchOfficeCreditNoteSerie.idSys = this.branchOfficeCreditNoteSerie.sys.id;
    this.marketService.saveBranchOfficeCreditNoteSerie(this.branchOfficeCreditNoteSerie)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(40, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
