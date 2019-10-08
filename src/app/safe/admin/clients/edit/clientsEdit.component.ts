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
import { PaymentMethodSat } from 'src/app/safe/models/PaymentMethodSat';
import { PaymentWaySat } from 'src/app/safe/models/PaymentWaySat';
import { TypeClient } from 'src/app/safe/models/TypeClient';
import { TypePerson } from 'src/app/safe/models/TypePerson';
import { UseCfdiSat } from 'src/app/safe/models/UseCfdiSat';
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
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogOrderSat } from 'src/app/core/models/CatalogOrderSat';
import { CatalogOrderSatFind } from 'src/app/core/models/CatalogOrderSatFind';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';


@Component({
  selector: 'app-clientsEdit',
  templateUrl: './clientsEdit.component.html',
  styleUrls: ['./clientsEdit.component.scss']
})

export class ClientsEditComponent implements OnInit {
  itemClient: ItemClient = new ItemClient();
  formControls = this.itemClient.formControls;
  formControlsAccount = this.itemClient.formControlsAccount;
  formControlsContact = this.itemClient.formControlsContact;
  formControlsProduct = this.itemClient.formControlsProduct;
  clientForm: FormGroup;
  //entity: Entity = { new: false, edit: true, readOnly: false };
  entity: Entity;
  banks: Array<Bank>;
  countries: Array<Country>;
  states: Array<State>;
  paymentConditions: Array<CatalogOrderGeneric>;
  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  typesClient: Array<TypeClient>;
  typesPerson: Array<TypePerson>;
  usesCfdi: Array<UseCfdiSat>;
  products: Array<Product>;

  accountForm: FormGroup;
  clientAccounts: Array<ClientAccount> = [];
  accountsDataSource = new MatTableDataSource<ClientAccount>();
  accountsColumns =
    ['bank', 'branchOffice', 'account', 'clabe', 'reference', 'edit', 'rm'];
  editingAccount: boolean = false;
  idAccount = 0;

  contactForm: FormGroup;
  clientContacts: Array<ClientContact> = [];
  contactsDatasource = new MatTableDataSource<ClientContact>();
  contactsColumns =
    ['name', 'lastName', 'maidenName', 'email', 'phone',
      'movilPhone',
      'position',
      'title',
      'observations',
      'edit',
      'rm'];
  editingContact: boolean = false;
  idContact = 0;

  productForm: FormGroup;
  clientProducts: Array<ClientProduct> = [];
  productsDatasource = new MatTableDataSource<ClientContact>();
  productsColumns = ['product', 'code', 'active', 'edit','rm'];
  editingProduct: boolean = false;
  idProduct = 0;

  idClient: number = 8;
  client: Client = {}
  clientSelected: Client = {};
  catalogs: Array<CatalogOrder> = new CatalogOrderFind().client;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().client;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(public globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private catalogService: CatalogService,
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
      'colony': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
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
          this.paymentConditions = result.filter(entity =>
            entity.catalog === 'paymentCondition')[0].data;
          this.typesClient = result.filter(entity =>
            entity.catalog === 'typeClient')[0].data;
          this.typesPerson = result.filter(entity =>
            entity.catalog === 'typePerson')[0].data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'typeClient':
                  inputs[a].options = this.typesClient;
                  break;
                case 'country':
                  inputs[a].options = this.countries;
                  break;
                case 'paymentCondition':
                  inputs[a].options = this.paymentConditions;
                  break;
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
          this.loadCatalogsSat();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');
        });
  }

  private loadCatalogsSat() {
    this.catalogService.listSat(this.catalogsSat)
      .subscribe(
        data => {
          const result = data;
          this.usesCfdi = result.filter(entity =>
            entity.catalog === 'useCfdi')[0].data;
          this.paymentMethods = result.filter(entity =>
            entity.catalog === 'paymentMethod')[0].data;
          this.paymentWays = result.filter(entity =>
            entity.catalog === 'paymentWay')[0].data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'useCfdi':
                  inputs[a].options = this.usesCfdi;
                  break;
                case 'paymentMethod':
                  inputs[a].options = this.paymentMethods;
                  break;
                case 'paymentWay':
                  inputs[a].options = this.paymentWays;
                  break;
              }
            }
          }
          this.loadProducts();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Datos de Clientes');
        });
  }

  loadProducts() {
    this.marketService.loadProducts(1)
      .subscribe(
        data => {
          this.products = data;
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
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  setData(option: number) {
    this.marketService.getClient(this.idClient)
      .subscribe(
        data => {
          this.clientSelected = data;
          this.states = data.states;
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

          this.onLoadState(this.clientSelected.fiscalData.country);

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
          this.accountsDataSource.data = this.clientAccounts;
          this.clientContacts = this.clientSelected.clientContacts;
          this.contactsDatasource.data = this.clientContacts;
          this.productsDatasource.data = this.clientProducts;
          if (option == 1) {
            this.clientForm.disable();
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
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
    this.catalogService.loadStates(value.id, 1)
      .subscribe(
        data => {
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'state':
                  this.states = data;
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

  onLoadState(value) {
    this.catalogService.loadStates(value.id, 1)
      .subscribe(
        data => {
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'state':
                  this.states = data;
                  this.clientSelected.fiscalData.state = this.states.filter(entity =>
                    entity.id === this.clientSelected.fiscalData.idState)[0];
                  this.clientForm.patchValue(this.clientSelected.fiscalData);
                  inputs[a].options = this.states
                  break;
              }
            }
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
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
      this.clientAccounts.splice(account, 1);
      this.editingAccount = false;
    }
    account.id =  this.idAccount;
    this.idAccount = 0;
    this.clientAccounts.push(account);
    this.accountsDataSource.data = this.clientAccounts;
    this.clientAccounts.slice();
    this.accountForm.reset();
  }

  deleteAccount(i) {
    this.clientAccounts.splice(i, 1);
    this.accountsDataSource.data = this.clientAccounts;
  }

  editContact(contact) {
    this.contactForm.reset();
    this.idContact = contact.id;
    this.contactForm.patchValue(contact);
    this.editingContact = true;
  }

  cancelContact() {
    if(this.editingContact) {
      this.editingContact = false;
    }
    this.idContact = 0;
    this.contactForm.reset();
  }

  saveContact(contact) {
    if(this.editingContact) {
      contact.edit = true;
      this.clientContacts.splice(contact, 1);
      this.editingContact = false;
    }
    contact.id =  this.idAccount;
    this.idContact = 0;
    this.clientContacts.push(contact);
    this.contactsDatasource.data = this.clientContacts;
    this.clientContacts.slice();
    this.contactForm.reset();
  }

  deleteContact(i) {
    this.clientContacts.splice(i, 1);
    this.contactsDatasource.data = this.clientAccounts;
  }

  editProduct(product) {
    this.productForm.reset();
    this.idProduct = product.id;
    this.productForm.patchValue(product);
    this.editingProduct = true;
  }

  cancelProduct() {
    if(this.editingProduct) {
      this.editingProduct = false;
    }
    this.idProduct = 0;
    this.productForm.reset();
  }

  saveProduct(product) {
    if(this.editingProduct) {
      product.edit = true;
      this.clientProducts.splice(product, 1);
      this.editingProduct = false;
    }
    product.id =  this.idProduct;
    this.idProduct = 0;
    this.clientProducts.push(product);
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
      this.toastr.errorToastr("Las cuentas del cliente no pueden ser vacías", 'Lo siento,');
      return;
    }
    if (!Validate(this.clientContacts) || this.clientContacts.length === 0) {
      this.toastr.errorToastr("Los contactos del cliente no pueden ser vaciós", 'Lo siento,');
      return;
    }
    if (!Validate(this.clientProducts) || this.clientProducts.length === 0) {
      this.toastr.errorToastr("Los productos del cliente no pueden ser vaciós", 'Lo siento,');
      return;
    }
    this.client = {};
    this.client.id = (this.clientSelected !== null && this.clientSelected !== undefined &&
      this.clientSelected.id !== null && this.clientSelected.id !== undefined
    ) ? this.clientSelected.id : 0;
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
      this.clientAccounts[i].idClient = this.client.id;
    }
    for (var i = 0; i < this.clientProducts.length; i++) {
      this.clientProducts[i].idProduct = this.clientProducts[i].product.id;
      this.clientProducts[i].idClient = this.client.id;
    }
    for (var i = 0; i < this.clientContacts.length; i++) {
      this.clientContacts[i].idClient = this.client.id;
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
    fiscalData.colony = value.colony;
    fiscalData.city = value.city;
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
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }
}
