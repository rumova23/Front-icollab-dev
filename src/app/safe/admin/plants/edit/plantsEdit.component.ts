import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/globals/Constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Entity } from 'src/app/core/models/Entity';
import { Bank } from 'src/app/safe/models/Bank';
import { Country } from 'src/app/safe/models/Country';
import { State } from 'src/app/safe/models/State';
import { TypePerson } from 'src/app/safe/models/TypePerson';
import { MarketService } from 'src/app/safe/services/market.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { ItemPlant } from 'src/app/safe/models/ItemPlant';
import { Plant } from 'src/app/security/models/Plant';
import { PlantAccount } from 'src/app/safe/models/PlantAccount';
import { Money } from 'src/app/safe/models/Money';
import { FiscalRegimeSat } from 'src/app/safe/models/FiscalRegimeSat';
import { PlantDirection } from 'src/app/safe/models/PlantDirection';
import { PlantCertificate } from 'src/app/safe/models/PlantCertificate';
import { PlantBranchOffice } from 'src/app/safe/models/PlantBranchOffice';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogOrderSatFind } from 'src/app/core/models/CatalogOrderSatFind';
import { CatalogOrderSat } from 'src/app/core/models/CatalogOrderSat';
import { PlantFiscalData } from 'src/app/safe/models/PlantFiscalData';

import * as moment from 'moment';

@Component({
  selector: 'app-plantsEdit',
  templateUrl: './plantsEdit.component.html',
  styleUrls: ['./plantsEdit.component.scss']
})

export class PlantsEditComponent implements OnInit {
  itemPlant: ItemPlant = new ItemPlant();
  formControls = this.itemPlant.formControls;
  formControlsAccount = this.itemPlant.formControlsAccount;
  formControlsDirection = this.itemPlant.formControlsDirection;
  formControlsCertificate = this.itemPlant.formControlsCertificate;
  formControlsBranch = this.itemPlant.formControlsBranch;
  plantForm: FormGroup;

  entity: Entity;
  banks: Array<Bank>;
  countries: Array<Country>;
  states: Array<State>;
  typesPerson: Array<TypePerson>;
  moneys: Array<Money>;
  fiscalRegimens: Array<FiscalRegimeSat>;

  accountForm: FormGroup;
  plantAccounts: Array<PlantAccount> = [];
  accountsDataSource = new MatTableDataSource<PlantAccount>();
  accountsColumns =
    ['bank', 'branchOffice', 'account', 'clabe', 'key', 'reference',
    'edit', 'rm'];
  editingAccount: boolean = false;
  idAccount = 0;

  directionForm: FormGroup;
  plantDirections: Array<PlantDirection> = [];
  directionsDataSource = new MatTableDataSource<PlantDirection>();
  directionsColumns =
    ['street', 'outdoorNumber', 'interiorNumber',
      'country', 'state', 'colony', 'city', 'location', 'cp', 
      'edit', 'rm'];
  editingDirection: boolean = false;
  idDirection = 0;

  certificateForm: FormGroup;
  plantCertificates: Array<PlantCertificate> = [];
  certificatesDataSource = new MatTableDataSource<PlantCertificate>();
  certificatesColumns =
    ['number', 'dateUpload', 'dateExpiration',
      'password', 'pathCer', 'pathKey', 
      'edit', 'rm'];
  editingCertificate: boolean = false;
  idCertificate = 0; 

  branchForm: FormGroup;
  plantBranches: Array<PlantBranchOffice> = [];
  branchesDataSource = new MatTableDataSource<PlantBranchOffice>();
  branchesColumns =
    ['name', 'clientNumber',
      'country', 'state', 
      'edit', 'rm'];
  editingBranch: boolean = false;
  idBranch = 0;  
      
  idPlant: number = 0;
  plant: Plant = {}
  plantSelected: Plant = {}
  catalogs: Array<CatalogOrder> = new CatalogOrderFind().plant;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().product;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private fb: FormBuilder,
    private eventService: EventService,
    private catalogService: CatalogService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.plantForm = this.fb.group({
      //datos de general
      'businessName': new FormControl('', Validators.required),
      'rfc': new FormControl('', Validators.required),
      'curp': new FormControl('', Validators.required),
      'phone1': new FormControl('', Validators.required),
      'phone2': new FormControl('', Validators.required),
      'emailDefault': new FormControl('', Validators.email),
      'observations': new FormControl('', Validators.required),
      'logo1': new FormControl('', Validators.required),
      'logo2': new FormControl('', Validators.required),
      'logo3': new FormControl('', Validators.required),
      'clientNumber': new FormControl('', Validators.required),
      'typePerson': new FormControl('', Validators.required),
      'fiscalRegimeSat': new FormControl('', Validators.required),
      'money': new FormControl('', Validators.required),
      'active': new FormControl(false),

    });
    this.accountForm = this.fb.group({
      'bank': new FormControl('', Validators.required),
      'branchOffice': new FormControl('', Validators.required),
      'account': new FormControl('', Validators.required),
      'clabe': new FormControl('', Validators.required),
      'key': new FormControl('', Validators.required),
      'reference': new FormControl('', Validators.required)
    });
    this.directionForm = this.fb.group({
      'street': new FormControl('', Validators.required),
      'outdoorNumber': new FormControl('', Validators.required),
      'interiorNumber': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'colony': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'cp': new FormControl('', Validators.required)
    });
    this.certificateForm = this.fb.group({
      'number': new FormControl('', Validators.required),
      'dateUpload': new FormControl('', Validators.required),
      'dateExpiration': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'pathCer': new FormControl('', Validators.required),
      'pathKey': new FormControl('', Validators.required),
      'active': new FormControl(false)
    });

    this.branchForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'observations': new FormControl('', Validators.required),
      'logo1': new FormControl('', Validators.required),
      'logo2': new FormControl('', Validators.required),
      'logo3': new FormControl('', Validators.required),
      'clientNumber': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'outdoorNumber': new FormControl('', Validators.required),
      'interiorNumber': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'colony': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'cp': new FormControl('', Validators.required),
      'active': new FormControl(false)
    });
    this.loadCatalogs();
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
      .subscribe(
        data => {
          const result = data;
          this.banks = result.filter(entity =>
            entity.catalog === 'bank')[0].data;
          this.countries = result.filter(entity =>
            entity.catalog === 'country')[0].data;
          this.typesPerson = result.filter(entity =>
            entity.catalog === 'typePerson')[0].data;
          this.moneys = data.moneys;
          this.fiscalRegimens = data.fiscalRegimens;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'typePerson':
                  inputs[a].options = this.typesPerson;
                  break;
              }
            }
          }
          for (var a = 0; a < this.formControlsAccount.length; a++) {
            switch (this.formControlsAccount[a].formControlName) {
              case 'bank':
                this.formControlsAccount[a].options = this.banks;
                break;
            }
          }
          for (var a = 0; a < this.formControlsDirection.length; a++) {
            switch (this.formControlsDirection[a].formControlName) {
              case 'country':
                this.formControlsDirection[a].options = this.countries;
                break;
            }
          }
          for (var a = 0; a < this.formControlsBranch.length; a++) {
            switch (this.formControlsBranch[a].formControlName) {
              case 'country':
                this.formControlsBranch[a].options = this.countries;
                break;
            }
          }
          this.getFiscalRegime();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Datos de Clientes');
        });
  }

  getFiscalRegime() {
    this.catalogService.getSat('fiscalRegime')
      .subscribe(
        data => {
          this.fiscalRegimens = data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {

              switch (inputs[a].formControlName) {
                case 'fiscalRegimeSat':
                  inputs[a].options = this.fiscalRegimens;
                  break;
              }
            }
          }
          this.loadMoneys();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Regimén Fiscal');
        });
  }

  loadMoneys() {
    this.catalogService.loadMoneys(1)
      .subscribe(
        data => {
          this.moneys = data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'money':
                  inputs[a].options = this.moneys;
                  break;
              }
            }
          }
          this.setData();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
        });
  }

  setData() {
    this.marketService.getPlant(this.idPlant)
      .subscribe(
        data => {
          this.plantSelected = data;
          if (Validate(this.plantSelected.fiscalData)) {
            this.plantSelected.fiscalData.typePerson = this.typesPerson.filter(entity =>
              entity.id === this.plantSelected.fiscalData.idTypePerson)[0];
              this.plantSelected.fiscalData.fiscalRegimeSat = this.fiscalRegimens.filter(entity =>
                entity.id === this.plantSelected.fiscalData.idFiscalRegimeSat)[0];
              this.plantSelected.fiscalData.money = this.moneys.filter(entity =>
                  entity.id === this.plantSelected.fiscalData.idMoney)[0];  
             this.plantForm.patchValue(this.plantSelected.fiscalData); 
          }
          if(Validate(this.plantSelected.plantAccounts)) {
            this.plantAccounts = this.plantSelected.plantAccounts;
            for(var i = 0; i<this.plantAccounts.length; i++) {
              this.plantAccounts[i].bank = this.banks.filter(entity =>
                entity.id ===   this.plantAccounts[i].idBank)[0]; 
            }
            this.accountsDataSource.data = this.plantAccounts;
          }
          if(Validate(this.plantSelected.plantBranches)) {
            this.plantBranches = this.plantSelected.plantBranches;
            let ids = [];
            for(var i = 0; i< this.plantBranches.length; i++) {
              ids.push(this.plantBranches[i].idCountry);
              this.plantBranches[i].country = this.countries.filter(entity =>
                entity.id ===   this.plantBranches[i].idCountry)[0];        
            }
            this.catalogService.loadStatesAll({ids:ids, option: 1})
            .subscribe(
              dat => {  
                const result = dat;
                for(var i = 0; i< this.plantBranches.length; i++) {
                  this.plantBranches[i].state = result.filter(entity =>
                    entity.id ===   this.plantBranches[i].idState)[0];        
                }
                this.branchesDataSource.data = this.plantBranches;
              },
              errorDat => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Países');
              }); 
          }
          if(Validate(this.plantSelected.plantCertificates)) {
            this.plantCertificates = this.plantSelected.plantCertificates;
            this.certificatesDataSource.data =   this.plantCertificates;
          }

          if(Validate(this.plantSelected.plantDirections)) {
            this.plantDirections = this.plantSelected.plantDirections;
            let ids = [];
            for(var i = 0; i< this.plantDirections.length; i++) {
              ids.push(this.plantDirections[i].idCountry);
              this.plantDirections[i].country = this.countries.filter(entity =>
                entity.id ===   this.plantDirections[i].idCountry)[0];        
            }
            this.catalogService.loadStatesAll({ids:ids, option: 1})
            .subscribe(
              dat => {  
                const result = dat;
                for(var i = 0; i< this.plantDirections.length; i++) {
                  this.plantDirections[i].state = result.filter(entity =>
                    entity.id ===   this.plantDirections[i].idState)[0];        
                }
                this.directionsDataSource.data = this.plantDirections;
              },
              errorDat => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Países');
              }); 
          }
          /*
          if (this.entity.readOnly) {
            this.setData(1);
          } else if (this.entity.edit) {
            this.setData(2);
          } else {
            this.toastr.errorToastr(Constants.ERROR_LOAD, 'Regimén Fiscal');
          } */
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : " ") + 
      " Planta " + this.plantSelected.name;
  }

  onSelect(value, input) {
    if (input.formControlName !== "country") {
      return;
    }
    this.catalogService.loadStates(value.id, 1)
      .subscribe(
        data => {
          for (var i = 0; i < this.formControlsDirection.length; i++) {
            const options = this.formControlsDirection[i].options;
            if (Validate(options)) {
              switch (this.formControlsDirection[i].formControlName) {
                case 'state':
                  this.states = data;
                  this.formControlsDirection[i].options = this.states
                  break;
              }
            }
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');
        });
  }

  onSelect2(value, input) {
    if (input.formControlName !== "country") {
      return;
    }
    this.catalogService.loadStates(value.id, 1)
      .subscribe(
        data => {
          for (var i = 0; i < this.formControlsBranch.length; i++) {
            const options = this.formControlsBranch[i].options;
            if (Validate(options)) {
              switch (this.formControlsBranch[i].formControlName) {
                case 'state':
                  this.states = data;
                  this.formControlsBranch[i].options = this.states
                  break;
              }
            }
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');
        });
  }

  editAccount(account) {
    this.accountForm.reset();
    this.idAccount = account.id;
    this.accountForm.patchValue(account);
    this.editingAccount = true;
  }

  cancelAccount() {
    if(this.editingAccount) {
      this.editingAccount = false;
    }
    this.idAccount = 0;
    this.accountForm.reset();
  }

  saveAccount(account) {
    if(this.editingAccount) {
      account.edit = true;
      this.plantAccounts.splice(account, 1);
      this.editingAccount = false;
    }
    account.id =  this.idAccount;
    this.idAccount = 0;
    this.plantAccounts.push(account);
    this.accountsDataSource.data = this.plantAccounts;
    this.plantAccounts.slice();
    this.accountForm.reset();
  }

  deleteAccount(i) {
    this.plantAccounts.splice(i, 1);
    this.accountsDataSource.data = this.plantAccounts;
  }

  editDirection(direction) {
    this.directionForm.reset();
    this.idDirection = direction.id;
    this.directionForm.patchValue(direction);
    this.editingDirection = true;
  }

  cancelDirection() {
    if(this.editingDirection) {
      this.editingDirection = false;
    }
    this.idDirection = 0;
    this.directionForm.reset();
  }

  saveDirection(direction) {
    if(this.editingDirection) {
      direction.edit = true;
      this.plantDirections.splice(direction, 1);
      this.editingDirection = false;
    }
    direction.id =  this.idAccount;
    this.idAccount = 0;
    this.plantDirections.push(direction);
    this.directionsDataSource.data = this.plantDirections;
    this.plantDirections.slice();
    this.directionForm.reset();
  }

  deleteDirection(i) {
    this.plantDirections.splice(i, 1);
    this.directionsDataSource.data = this.plantDirections;
  }

  editCertificate(certificate) {
    this.certificateForm.reset();
    this.idCertificate = certificate.id;
    this.certificateForm.patchValue(certificate);
    this.editingCertificate = true;
  }

  cancelCertificate() {
    if(this.editingCertificate) {
      this.editingCertificate = false;
    }
    this.idCertificate = 0;
    this.certificateForm.reset();
  }

  saveCertificate(certificate) {
    if(this.editingCertificate) {
      certificate.edit = true;
      this.plantCertificates.splice(certificate, 1);
      this.editingCertificate = false;
    }
    certificate.id =  this.idCertificate;
    this.idCertificate = 0;
    certificate.dateUpload = 
            moment(certificate.dateUpload).format(Constants.DATE_FORMAT_PLANT);
    certificate.dateExpiration = 
            moment(certificate.dateExpiration).format(Constants.DATE_FORMAT_PLANT);
    this.plantCertificates.push(certificate);
    this.certificatesDataSource.data = this.plantCertificates;
    this.plantCertificates.slice();
    this.certificateForm.reset();
  }

  deleteCertificate(i) {
    this.plantCertificates.splice(i, 1);
    this.certificatesDataSource.data = this.plantCertificates;
  }

  editBranch(branch) {
    this.branchForm.reset();
    this.idBranch = branch.id;
    this.branchForm.patchValue(branch);
    this.editingBranch = true;
  }

  cancelBranch() {
    if(this.editingBranch) {
      this.editingBranch = false;
    }
    this.idBranch = 0;
    this.branchForm.reset();
  }

  saveBranch(branch) {
    if(this.editingBranch) {
      branch.edit = true;
      this.plantBranches.splice(branch, 1);
      this.editingBranch = false;
    }
    branch.id =  this.idBranch;
    this.idBranch = 0;
    this.plantBranches.push(branch);
    this.branchesDataSource.data = this.plantBranches;
    this.plantBranches.slice();
    this.branchForm.reset();
  }

  deleteBranch(i) {
    this.plantBranches.splice(i, 1);
    this.branchesDataSource.data = this.plantBranches;
  }

  save(value) {
    if (!Validate(this.plantAccounts)
      || this.plantAccounts.length === 0) {
      this.toastr.errorToastr("Las cuentas de la planta no pueden ser vacías",
        'Cuentas');
      return;
    }
    if (!Validate(this.plantBranches)
      || this.plantBranches.length === 0) {
      this.toastr.errorToastr("Las sucursales de la planta no pueden ser vacías",
        'Sucursales');
      return;
    }
    if (!Validate(this.plantCertificates)
      || this.plantCertificates.length === 0) {
      this.toastr.errorToastr("Los certificados de la planta no pueden ser vacías",
        'Certificados');
      return;
    }
    if (!Validate(this.plantDirections)
      || this.plantDirections.length === 0) {
      this.toastr.errorToastr("Las direcciones de la planta no pueden ser vacías",
        'Direcciones');
      return;
    }
    this.plant = {};
    this.plant.id = (this.plantSelected !== null && this.plantSelected !== undefined &&
      this.plantSelected.id !== null && this.plantSelected.id !== undefined
    ) ? this.plantSelected.id : 0;
    let fiscalData: PlantFiscalData = {}; 
    this.plant.save = this.entity.new;
    this.plant.name = value.name;
    this.plant.active = value.active;
    fiscalData.businessName = value.businessName;
    fiscalData.rfc = value.rfc;
    fiscalData.curp = value.curp;
    fiscalData.idTypePerson = value.typePerson.id;
    fiscalData.idFiscalRegimeSat = value.fiscalRegimeSat.id
    fiscalData.idMoney = value.money.id;
    fiscalData.phone1 = value.phone1;
    fiscalData.phone2 = value.phone2;
    fiscalData.emailDefault = value.emailDefault;
    fiscalData.observations = value.observations;
    fiscalData.logo1 = value.logo1;
    fiscalData.logo2 = value.logo2;
    fiscalData.logo3 = value.logo3;
    fiscalData.clientNumber = value.clientNumber;
    this.plant.fiscalData = fiscalData;
    for (var i = 0; i < this.plantAccounts.length; i++) {
      this.plantAccounts[i].idBank = this.plantAccounts[i].bank.id;
      this.plantAccounts[i].idPlant = this.plant.id;
    }
    for (var i = 0; i < this.plantDirections.length; i++) {
      this.plantDirections[i].idCountry = this.plantDirections[i].country.id;
      this.plantDirections[i].idState = this.plantDirections[i].state.id;
      this.plantDirections[i].idPlant = this.plant.id;
    }
    for (var i = 0; i < this.plantCertificates.length; i++) {
      this.plantCertificates[i].idPlant = this.plant.id;
    }
    for (var i = 0; i < this.plantBranches.length; i++) {
      this.plantBranches[i].idCountry = this.plantBranches[i].country.id;
      this.plantBranches[i].idState = this.plantBranches[i].state.id;
      this.plantBranches[i].idPlant = this.plant.id;
    }
    this.plant.plantAccounts = this.plantAccounts;
    this.plant.plantDirections = this.plantDirections;
    this.plant.plantCertificates = this.plantCertificates;
    this.plant.plantBranches = this.plantBranches;
    this.marketService.savePlant(this.plant)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(12, {}));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Plantas');
        });
  }
}
