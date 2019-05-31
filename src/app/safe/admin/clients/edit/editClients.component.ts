import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/globals/Constants';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Entity } from 'src/app/core/models/Entity';
import { ItemClient } from 'src/app/safe/models/ItemClient';
import { Bank } from 'src/app/safe/models/Bank';
import { Country } from 'src/app/safe/models/Country';
import { State } from 'src/app/safe/models/State';
import { PaymentCondition } from 'src/app/safe/models/PaymentCondition';
import { PaymentMethod } from 'src/app/safe/models/PaymentMethod';
import { PaymentWay } from 'src/app/safe/models/PaymentWay';
import { TypeClient } from 'src/app/safe/models/TypeClient';
import { TypePerson } from 'src/app/safe/models/TypePerson';
import { UseCfdi } from 'src/app/safe/models/UseCfdi';
import { Product } from 'src/app/safe/models/Product';
import { ClientAccount } from 'src/app/safe/models/ClientAccount';
import { ClientContact } from 'src/app/safe/models/ClientContact';
import { ClientProduct } from 'src/app/safe/models/ClientProduct';
import { Client } from 'src/app/safe/models/Client';
import { MarketService } from 'src/app/safe/services/market.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { ClientFiscalData } from 'src/app/safe/models/ClientFiscalData';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';


@Component({
  selector: 'app-editClients',
  templateUrl: './editClients.component.html',
  styleUrls: ['./editClients.component.scss']
})

export class EditClientsComponent implements OnInit {
  title = "Registro de Clientes: Nuevo registro";
  itemClient: ItemClient = new ItemClient();
  formControls = this.itemClient.formControls;
  formControlsAccount = this.itemClient.formControlsAccount;
  formControlsContact = this.itemClient.formControlsContact;
  formControlsProduct = this.itemClient.formControlsProduct;
  clientForm: FormGroup;
  accountForm: FormGroup;
  //entity: Entity = { new: false, edit: true, readOnly: false };
  entity: Entity;
  banks: Array<Bank>;
  countries: Array<Country>;
  states: Array<State>;
  paymentConditions: Array<PaymentCondition>;
  paymentMethods: Array<PaymentMethod>;
  paymentWays: Array<PaymentWay>;
  typesClient: Array<TypeClient>;
  typesPerson: Array<TypePerson>;
  usesCfdi: Array<UseCfdi>;
  products: Array<Product>;
  clientAccounts: Array<ClientAccount> = [];
  accountsDataSource = new MatTableDataSource<ClientAccount>();
  accountsColumns =
    ['bank', 'branchOffice', 'account', 'clabe', 'reference', 'rm'];

  contactForm: FormGroup;
  clientContacts: Array<ClientContact> = [];
  contactsDatasource = new MatTableDataSource<ClientContact>();
  clientsColumns =
    ['name', 'lastName', 'maidenName', 'email', 'phone',
      'movilPhone',
      'position',
      'title',
      'observations',
      'rm'];

  productForm: FormGroup;
  clientProducts: Array<ClientProduct> = [];
  productsDatasource = new MatTableDataSource<ClientContact>();
  productsColumns = ['product', 'code', 'active', 'rm'];
  idClient: number = 8;
  client: Client = {}
  clientSelected: Client = {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private fb: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.clientForm = this.fb.group({
      //datos de general
      'typeClient': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'classification': new FormControl('', Validators.required),
      'businessGroup': new FormControl('', Validators.required),
      'commercialBusiness': new FormControl('', Validators.required),
      'tradename': new FormControl('', Validators.required),
      'supplierNumber': new FormControl('', Validators.required),
      'paymentCondition': new FormControl('', Validators.required),
      'requireAddenda': new FormControl(false),

      //datos fiscales
      'useCfdi': new FormControl('', Validators.required),
      'paymentMethod': new FormControl('', Validators.required),
      'typePerson': new FormControl('', Validators.required),
      'businessName': new FormControl('', Validators.required),
      'rfc': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'outdoorNumber': new FormControl('', Validators.required),
      'interiorNumber': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'cp': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.email),
      'phone': new FormControl('', Validators.required),

      //datos de pago
      'startTimeInvoiceReview': new FormControl('', Validators.required),
      'endTimeInvoiceReview': new FormControl('', Validators.required),
      'paymentPhone': new FormControl('', Validators.required),
      'addendaNumber': new FormControl('', Validators.required),
      'paymentWay': new FormControl('', Validators.required),
      'emailInvoice': new FormControl('', Validators.email),

      'locked': new FormControl(false),
      'active': new FormControl(false),
      'observations': new FormControl('', Validators.required),

    });
    this.accountForm = this.fb.group({
      'bank': new FormControl('', Validators.required),
      'branchOffice': new FormControl('', Validators.required),
      'account': new FormControl('', Validators.required),
      'clabe': new FormControl('', Validators.required),
      'reference': new FormControl('', Validators.required)
    });
    this.contactForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'maidenName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.email),
      'phone': new FormControl('', Validators.required),
      'movilPhone': new FormControl('', Validators.required),
      'position': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'observations': new FormControl('', Validators.required)
    });
    this.productForm = this.fb.group({
      'product': new FormControl('', Validators.required),
      'code': new FormControl('', Validators.required),
      'active': new FormControl(false),
    });
    this.loadDataClients();
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  private loadDataClients() {
    this.marketService.loadDataClients(1)
      .subscribe(
        data => {
          this.banks = data.resultado.banks
          this.countries = data.resultado.countries;
          this.paymentConditions = data.resultado.paymentConditions;
          this.paymentMethods = data.resultado.paymentMethods;
          this.paymentWays = data.resultado.paymentWays;
          this.typesClient = data.resultado.typesClient;
          this.typesPerson = data.resultado.typesPerson;
          this.usesCfdi = data.resultado.usesCfdi;
          this.products = data.resultado.products;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'typeClient':
                  inputs[a].options = this.typesClient;
                  break;
                case 'paymentCondition':
                  inputs[a].options = this.paymentConditions;
                  break;
                case 'useCfdi':
                  inputs[a].options = this.usesCfdi;
                  break;
                case 'paymentMethod':
                  inputs[a].options = this.paymentMethods;
                  break;
                case 'paymentWay':
                  inputs[a].options = this.paymentWays;
                  break;
                case 'typePerson':
                  inputs[a].options = this.typesPerson;
                  break;
                case 'country':
                  inputs[a].options = this.countries;
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
          for (var a = 0; a < this.formControlsProduct.length; a++) {
            switch (this.formControlsProduct[a].formControlName) {
              case 'product':
                this.formControlsProduct[a].options = this.products;
                break;
            }
          }
          if (this.entity.readOnly) {
            this.setData(1);
          } else if (this.entity.edit) {
            this.setData(2);
          } else {
            this.client = {} as Client;
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Datos de Clientes');
        });
  }


  setData(option: number) {
    this.marketService.getClient(this.idClient)
      .subscribe(
        data => {
          this.clientSelected = data.resultado;
          this.states = data.resultado.states;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'state':
                  inputs[a].options = this.states
                  break;
              }
            }
          }
          this.clientSelected.typeClient = this.typesClient.filter(entity =>
            entity.id === this.clientSelected.idTypeClient)[0];

          this.clientSelected.paymentCondition = this.paymentConditions.filter(entity =>
            entity.id === this.clientSelected.idPaymentCondition)[0];

          this.clientSelected.paymentWay = this.paymentWays.filter(entity =>
            entity.id === this.clientSelected.idPaymentWay)[0];

          this.clientSelected.fiscalData.useCfdi = this.usesCfdi.filter(entity =>
            entity.id === this.clientSelected.fiscalData.idUseCfdi)[0];

          this.clientSelected.fiscalData.paymentMethod = this.paymentMethods.filter(entity =>
            entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0];

          this.clientSelected.fiscalData.typePerson = this.typesPerson.filter(entity =>
            entity.id === this.clientSelected.fiscalData.idTypePerson)[0];

          this.clientSelected.fiscalData.country = this.countries.filter(entity =>
            entity.id === this.clientSelected.fiscalData.idCountry)[0];

            this.clientSelected.fiscalData.state = this.states.filter(entity =>
              entity.id === this.clientSelected.fiscalData.idState)[0];

            this.clientAccounts = this.clientSelected.clientAccounts;
            for (var i = 0; i < this.clientAccounts.length; i++) {
              this.clientAccounts[i].bank = this.banks.filter(entity =>
                entity.id === this.clientAccounts[i].idBank)[0];
            }
            this.clientProducts = this.clientSelected.clientProducts;
            for (var i = 0; i < this.clientProducts.length; i++) {
              this.clientProducts[i].product = this.products.filter(entity =>
                entity.id === this.clientProducts[i].idProduct)[0];
            }
            this.clientForm.patchValue(this.clientSelected);
            this.clientForm.patchValue({ paymentPhone: this.clientSelected.phone });
            this.clientForm.patchValue(this.clientSelected.fiscalData);
            this.accountsDataSource.data = this.clientAccounts;
            this.clientContacts = this.clientSelected.clientContacts;
            this.contactsDatasource.data = this.clientContacts;
            this.productsDatasource.data = this.clientProducts;
            if (option == 1) {
              this.clientForm.disable();
            }  
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + " Cliente";
  }

  onSelect(value, input) {
    if (input.formControlName !== "country") {
      return;
    }
    this.marketService.loadStates(value.id, 1)
      .subscribe(
        data => {
          console.log(data);
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'state':
                  this.states = data.resultado;
                  inputs[a].options = this.states
                  break;
              }
            }
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');
        });
  }

  saveAccount(value) {
    this.clientAccounts.push(value);
    this.accountsDataSource.data = this.clientAccounts;
    this.clientAccounts.slice();
    this.accountForm.reset();
  }

  deleteAccount(i) {
    this.clientAccounts.splice(i, 1);
    this.accountsDataSource.data = this.clientAccounts;
  }

  saveContact(value) {
    this.clientContacts.push(value);
    console.log(this.clientContacts);
    this.contactsDatasource.data = this.clientContacts;
    this.clientContacts.slice();
    this.contactForm.reset();
  }

  deleteContact(i) {
    this.clientContacts.splice(i, 1);
    this.contactsDatasource.data = this.clientAccounts;
  }

  saveProduct(value) {
    this.clientProducts.push(value);
    console.log(this.clientProducts);
    this.productsDatasource.data = this.clientProducts;
    this.clientProducts.slice();
    this.productForm.reset();
  }

  deleteProduct(i) {
    this.clientProducts.splice(i, 1);
    this.productsDatasource.data = this.clientProducts;
  }

  save(value) {
    if (!Validate(this.clientAccounts) || this.clientAccounts.length === 0) {
      this.toastr.errorToastr("Las cuentas del cliente no pueden ser vacías", 'Cuentas del cliente');
      return;
    }
    if (!Validate(this.clientContacts) || this.clientContacts.length === 0) {
      this.toastr.errorToastr("Los contactos del cliente no pueden ser vaciós", 'Contactos del cliente');
      return;
    }
    if (!Validate(this.clientProducts) || this.clientProducts.length === 0) {
      this.toastr.errorToastr("Los productos del cliente no pueden ser vaciós", 'Prouctos del cliente');
      return;
    }
    this.client = {};
    this.client.id = (this.clientSelected !== null && this.clientSelected !== undefined &&
      this.clientSelected.id !== null && this.clientSelected.id !== undefined
    ) ? this.clientSelected.id : 0;
    console.log(value);
    this.client.save = this.entity.new;
    this.client.idTypeClient = value.typeClient.id;
    this.client.number = value.number;
    this.client.classification = value.classification;
    this.client.businessGroup = value.businessGroup;
    this.client.commercialBusiness = value.commercialBusiness;
    this.client.tradename = value.tradename;
    this.client.supplierNumber = value.supplierNumber;
    this.client.idPaymentCondition = value.paymentCondition.id;
    this.client.requireAddenda = value.requireAddenda;

    this.client.startTimeInvoiceReview = value.startTimeInvoiceReview;
    this.client.endTimeInvoiceReview = value.endTimeInvoiceReview;
    this.client.phone = value.paymentPhone;
    this.client.addendaNumber = value.addendaNumber;
    this.client.idPaymentWay = value.paymentWay.id;
    this.client.emailInvoice = value.emailInvoice;
    this.client.locked = value.locked;
    this.client.active = value.active;
    this.client.observations = value.observations;

    for (var i = 0; i < this.clientAccounts.length; i++) {
      this.clientAccounts[i].idBank = this.clientAccounts[i].bank.id;
    }
    for (var i = 0; i < this.clientProducts.length; i++) {
      this.clientProducts[i].idProduct = this.clientProducts[i].product.id;
    }

    this.client.clientAccounts = this.clientAccounts;
    this.client.clientContacts = this.clientContacts;
    this.client.clientProducts = this.clientProducts;

    let fiscalData: ClientFiscalData = {};
    fiscalData.businessName = value.businessName;
    fiscalData.rfc = value.rfc;
    fiscalData.street = value.street;
    fiscalData.outdoorNumber = value.outdoorNumber;
    fiscalData.interiorNumber = value.interiorNumber;
    fiscalData.location = value.location;
    fiscalData.cp = value.cp;
    fiscalData.email = value.email;
    fiscalData.phone = value.phone;

    fiscalData.idUseCfdi = value.useCfdi.id;
    fiscalData.idPaymentMethod = value.paymentMethod.id;
    fiscalData.idTypePerson = value.typePerson.id;
    fiscalData.idCountry = value.country.id;
    fiscalData.idState = value.state.id;
    this.client.fiscalData = fiscalData;
    this.marketService.saveClient(this.client)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(7, {}));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Clientes');
        });
  }
}
