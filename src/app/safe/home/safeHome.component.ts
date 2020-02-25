/* tslint:disable:indent */
import { Component, OnInit                        } from '@angular/core';
import { ComponentFactoryResolver                 } from '@angular/core';
import { ViewChild, ViewContainerRef, Input       } from '@angular/core';
import { ActivatedRoute                           } from '@angular/router';
import { EventService                             } from 'src/app/core/services/event.service';
import { EventMessage                             } from 'src/app/core/models/EventMessage';
import { SecurityService                          } from 'src/app/core/services/security.service';
import { ThemeService                             } from 'src/app/core/globals/theme';
import { GlobalService                            } from 'src/app/core/globals/global.service';
import { Validate                                 } from 'src/app/core/helpers/util.validator.';
import { ChangePasswordComponent                  } from 'src/app/common/changePassword/changePassword.component';
import { Subscription                             } from 'rxjs';
import { ProductsComponent                        } from '../admin/products/products.component';
import { ProductsEditComponent                    } from '../admin/products/edit/productsEdit.component';
import { UnityProductsComponent                   } from '../catalogs/unityProducts/unityProducts.component';
import { UnityProductsEditComponent               } from '../catalogs/unityProducts/edit/unityProductsEdit.component';
import { ClientsComponent                         } from '../admin/clients/clients.component';
import { CatalogGenericComponent                  } from '../catalogs/generic/catalogGeneric.component';
import { CatalogGenericEditComponent              } from '../catalogs/generic/edit/catalogGenericEdit.component';
import { PmlComponent                             } from '../admin/pml/pml.component';
import { WeatherComponent                         } from '../admin/weather/weather.component';
import { PlantsComponent                          } from '../admin/plants/plants.component';
import { FiscalRegimensSatComponent               } from '../catalogsSat/fiscalRegimeSat/fiscalRegimensSat.component';
import { MoneysSatComponent                       } from '../catalogsSat/moneysSat/moneysSat.component';
import { PaymentMethodsSatComponent               } from '../catalogsSat/paymentMethodsSat/paymentMethodsSat.component';
import { PaymentWaysSatComponent                  } from '../catalogsSat/paymentWaysSat/paymentWaysSat.component';
import { ProductsSatComponent                     } from '../catalogsSat/productsSat/productsSat.component';
import { RatesIvaSatComponent                     } from '../catalogsSat/ratesIvaSat/ratesIvaSat.component';
import { UnityProductsSatComponent                } from '../catalogsSat/unityProductsSat/unityProductsSat.component';
import { UsesCfdiSatComponent                     } from '../catalogsSat/usesCfdiSat/usesCfdiSat.component';
import { TypesRelationSatComponent                } from '../catalogsSat/typesRelationSat/typesRelationSat.component';
import { StatesComponent                          } from '../catalogs/states/states.component';
import { StatesEditComponent                      } from '../catalogs/states/edit/statesEdit.component';
import { MoneysComponent                          } from '../catalogs/moneys/moneys.component';
import { MoneysEditComponent                      } from '../catalogs/moneys/edit/moneysEdit.component';
import { BranchInvoiceSeriesComponent             } from '../admin/branchInvoiceSeries/branchInvoiceSeries.component';
import { BranchInvoiceSeriesEditComponent         } from '../admin/branchInvoiceSeries/edit/branchInvoiceSeriesEdit.component';
import { ClientsEditComponent                     } from '../admin/clients/edit/clientsEdit.component';
import { PlantsEditComponent                      } from '../admin/plants/edit/plantsEdit.component';
import { InvoicesEditComponent                    } from '../admin/invoices/edit/invoicesEdit.component';
import { InvoicesComponent                        } from '../admin/invoices/invoices.component';
import { FuecdEditComponent                       } from '../admin/fuecd/edit/fuecdEdit.component';
import { FuecdComponent                           } from '../admin/fuecd/fuecd.component';
import { FuecdInvoiceComponent                    } from '../admin/fuecd/invoice/fuecdInvoice.component';
import { FinancialIndexesComponent                } from '../admin/financialIndexes/financialIndexes.component';
import { InppComponent                            } from '../admin/inpp/inpp.component';
import { UsppiComponent                           } from '../admin/usppi/usppi.component';
import { CreditNotesEditComponent                 } from '../admin/creditNotes/edit/creditNotesEdit.component';
import { DebitNotesEditComponent                  } from '../admin/debitNotes/edit/debitNotesEdit.component';
import { CreditNotesComponent                     } from '../admin/creditNotes/creditNotes.component';
import { DebitNotesComponent                      } from '../admin/debitNotes/debitNotes.component';
import { WeatherEditComponent                     } from '../admin/weather/edit/weatherEdit.component';
import { WeatherPpaComponent                      } from '../admin/weather/ppa/weatherPpa.component';
import { ChargeEditComponent                      } from '../admin/charge/edit/chargeEdit.component';
import { ChargePpaComponent                       } from '../admin/charge/ppa/chargePpa.component';
import { EnergyEditComponent                      } from '../admin/energy/edit/energyEdit.component';
import { EnergyPpaComponent                       } from '../admin/energy/ppa/energyPpa.component';
import { ModelMarketComponent                     } from '../admin/modelMarket/modelMarket.component';
import { PpaComponent                             } from '../admin/modelMarket/ppa/ppa.component';
import { BranchCreditNoteSeriesComponent          } from '../admin/branchCreditNoteSeries/branchCreditNoteSeries.component';
import { BranchCreditNoteSeriesEditComponent      } from '../admin/branchCreditNoteSeries/edit/branchCreditNoteSeriesEdit.component';
import { ProposalAcceptedComponent				  } from '../admin/modelMarket/proposal-accepted/proposalAccepted.component';
import { AccountStatements20119Component } from '../business/account-statements20119/account-statements20119.component';
import {MdaAceptadaComponent} from '../admin/modelMarket/mda-aceptada/mda-aceptada.component';
import {EditMtrPlantComponent} from '../admin/modelMarket/edit-mtr-plant/edit-mtr-plant.component';
import {MtrAcceptedComponent} from '../admin/modelMarket/mtr-accepted/mtr-accepted.component';
import { AgraficaComponent                        } from '../admin/agrafica/agrafica.component';
import { HenryhubComponent                        } from '../admin/henryhub/henryhub.component';
import {MtrCenaceComponent} from '../admin/modelMarket/mtr-cenace/mtr-cenace.component';
import {ControlFacturacionComponent} from '../admin/fuecd/control-facturacion/control-facturacion.component';
import {PreDocumentComponent} from '../admin/fuecd/pre-document/pre-document.component';

@Component({
	selector        : 'app-safeHome',
	templateUrl     : './safeHome.component.html',
	styleUrls       : ['./safeHome.component.scss'],
  	entryComponents : [
		ProductsComponent
		, ProductsEditComponent
		, ChangePasswordComponent
		, UnityProductsComponent
		, UnityProductsEditComponent
		, ClientsComponent
		, ClientsEditComponent
		, CatalogGenericComponent
		, CatalogGenericEditComponent
		, PmlComponent
		, WeatherComponent
		, PlantsEditComponent
		, PlantsComponent
		, FiscalRegimensSatComponent
		, MoneysSatComponent
		, PaymentMethodsSatComponent
		, PaymentWaysSatComponent
		, ProductsSatComponent
		, RatesIvaSatComponent
		, UnityProductsSatComponent
		, UsesCfdiSatComponent
		, TypesRelationSatComponent
		, StatesComponent
		, StatesEditComponent
		, MoneysComponent
		, MoneysEditComponent
		, BranchInvoiceSeriesComponent
		, BranchInvoiceSeriesEditComponent
		, InvoicesEditComponent
		, InvoicesComponent
		, FuecdComponent
		, FuecdEditComponent
		, FuecdInvoiceComponent
		, FinancialIndexesComponent
		, InppComponent
		, UsppiComponent
		, CreditNotesComponent
		, DebitNotesComponent
		, CreditNotesEditComponent
		, DebitNotesEditComponent
		, WeatherEditComponent
		, WeatherPpaComponent
		, ChargeEditComponent
		, ChargePpaComponent
		, EnergyEditComponent
		, EnergyPpaComponent
		, ModelMarketComponent
		, BranchCreditNoteSeriesComponent
		, BranchCreditNoteSeriesEditComponent
		, PpaComponent
		, ProposalAcceptedComponent
		, AccountStatements20119Component
		, MdaAceptadaComponent
		, EditMtrPlantComponent
		, MtrAcceptedComponent
		, AgraficaComponent
		, HenryhubComponent
		, MtrCenaceComponent
		, ControlFacturacionComponent
		, PreDocumentComponent
  	]
})

export class SafeHomeComponent implements OnInit {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  	private subscriptions: Subscription[] = [];

	constructor(
		private route: ActivatedRoute,
		public  globalService: GlobalService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private eventService: EventService,
		private securityService: SecurityService,
		public  theme: ThemeService
	) {
		this.subscriptions.push(this.eventService.onChangeMainSafe.subscribe({
		next: (event: EventMessage) => {
				this.clickMenu(event);
			}
		}));
	}

	ngOnInit() {
		// let url = `/assets/css/base/respaldo.css`;
		// document.getElementById("content_theme").setAttribute('href',url);
		this.subscribeOnChangePage();
	}

	ngAfterViewInit() {
		// this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent));
		this.eventService.sendMainSafe(new EventMessage(101, {
			typeEnergy: 'Factor de Potencia'
		}));
	}

	ngOnDestroy() {
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}

  	inputHeaderComponent(event: EventMessage) {
		this.eventService.sendMainSafe(event);
	}

	subscribeOnChangePage() {
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
				let banderaTemporal = false;
				this.viewContainerRef.clear();
				switch (event.descriptor) {
					case 'Safe.AccountStatements20119Component':

						banderaTemporal = true;

						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(AccountStatements20119Component)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Monedas SAT':
						// 202;
						banderaTemporal = true;

						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MoneysSatComponent)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Consulta Clima':
						// 33
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								WeatherPpaComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Consulta Cargos':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								ChargePpaComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Consulta Variables Energía':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								EnergyPpaComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.MDA':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								ModelMarketComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Resultados MDA CENACE':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								ProposalAcceptedComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Oferta MDA Aceptada EAT':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								MdaAceptadaComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Proyeccion MTR EAT':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								EditMtrPlantComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.MTR EAT':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								MtrAcceptedComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.MTR CENACE':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								MtrCenaceComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.PML':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								PmlComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Estado de Cuenta Diario':
						banderaTemporal = true;
						const factorya = this.componentFactoryResolver.resolveComponentFactory(FuecdComponent);
						const viewComponenta = this.viewContainerRef.createComponent(factorya);
						viewComponenta.instance.fuecd = event.data;
						viewComponenta.changeDetectorRef.detectChanges();
						break;
					case 'Safe.Control Facturas':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								ControlFacturacionComponent
							)
						).changeDetectorRef.detectChanges();
						break;
					case 'Safe.Pre Document':
						banderaTemporal = true;
						const factory = this.componentFactoryResolver.resolveComponentFactory(PreDocumentComponent);
						const viewComponent = this.viewContainerRef.createComponent(factory);
						viewComponent.instance.settlementInvoiceDT0 = event.data;
						viewComponent.changeDetectorRef.detectChanges();
						break;
					case 'Safe.HenryhubComponent':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								HenryhubComponent
							)
						).changeDetectorRef.detectChanges();
						break;

					case 'Safe.AgraficaComponent':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								AgraficaComponent
							)
						).changeDetectorRef.detectChanges();
						break;


					case 'Safe.InvoicesComponent':
						banderaTemporal = true;
						const factoryInvoices = this.componentFactoryResolver
						.resolveComponentFactory(InvoicesComponent);
						const refInvoices =
						this.viewContainerRef.createComponent(factoryInvoices);
						refInvoices.changeDetectorRef.detectChanges();

					break;

					case 'Safe.Planta':
						banderaTemporal = true;
						const factoryPlants = this.componentFactoryResolver
						.resolveComponentFactory(PlantsComponent);
						const refPlants =
						this.viewContainerRef.createComponent(factoryPlants);
						refPlants.changeDetectorRef.detectChanges();
						break;
					case 'Safe.Home':
						banderaTemporal = true;
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(
								WeatherComponent
							)
						).changeDetectorRef.detectChanges();
						break;
				}
				if (banderaTemporal) { return; }
				let option = 0;
				let catalog = '';
				let typeWeather = '';
				let typeCharge = '';
				let typeEnergy = '';
				const item = event.data;
				switch (event.data.label) {
				case 'Servicios':
					option = 3;
					break;
				case 'Productos':
					option = 3;
					break;
				case 'Unidad de Productos':
					option = 5;
					break;
				case 'Clientes':
					option = 7;
					break;
				case 'Sistemas':
					option = 9;
					catalog = 'sys';
					break;
				case 'Tipos de Cliente':
					option = 9;
					catalog = 'typeClient';
					break;
				case 'Tipos de Producto':
					option = 9;
					catalog = 'typeProduct';
					break;
				case 'Condiciones de Pago':
					option = 9;
					catalog = 'paymentCondition';
					break;
				case 'Países':
					option = 9;
					catalog = 'country';
					break;
				case 'Bancos':
					option = 9;
					catalog = 'bank';
					break;
				case 'Contrato Afectado':
					option = 9;
					catalog = 'contractAffected';
					break;
				case 'Equipos':
					option = 9;
					catalog = 'listEquipment';
					break;
				case 'Unidades de Generación':
					option = 9;
					catalog = 'generationUnits';
					break;
				case 'Valores de Tolerancia':
					option = 9;
					catalog = 'valuesTolerance';
					break;
				case 'Fuentes Generadoras':
					option = 9;
					catalog = 'generatingSources';
					break;
				case 'Tipos de Despacho':
					option = 9;
					catalog = 'typesOffice';
					break;
				case 'Tipos MEM':
					option = 9;
					catalog = 'typesMem';
					break;
				case 'Estatus de Bitácora':
					option = 9;
					catalog = 'statusBinnacle';
					break;
				case 'Estatus de Factura':
					option = 9;
					catalog = 'statusInvoice';
					break;
				case 'Estatus de Pago Factura':
					option = 9;
					catalog = 'statusInvoicePayment';
					break;
				case 'Estatus de Aprobación Bitácora':
					option = 9;
					catalog = 'statusBinnacleApproval';
					break;

				case 'Pml':
					option = 11;
					break;
				case 'Planta':
					option = 12;
					break;
				case 'Plantas':
					option = 12;
					break;
				case 'Plantas':
					option = 12;
					break;
				case 'Estados':
					option = 14;
					break;
				case 'Monedas':
					option = 16;
					break;
				case 'Serie Facturas':
					option = 18;
					break;
				case 'Facturas':
					option = 20;
					break;
				case 'Tipos de Cambio':
					option = 25;
					break;
				case 'INPP':
					option = 26;
					break;
				case 'USPPI':
					option = 27;
					break;
				case 'Notas de Crédito':
					option = 28;
					break;
				case 'Notas de Débito':
					option = 30;
					break;
				case 'Carga Humedad':
					option = 32;
					typeWeather = 'Humedad';
					break;
				case 'Carga Presión Barométrica':
					option = 32;
					typeWeather = 'Presión Barométrica';
					break;
				case 'Carga Temperatura':
					option = 32;
					typeWeather = 'Temperatura';
					break;
				case 'Consulta Clima':
					option = 33;
					break;
				case 'Carga Cargo Fijo':
					option = 34;
					typeCharge = 'Cargo Fijo';
					break;
				case 'Carga Cargo Variable':
					option = 34;
					typeCharge = 'Cargo Variable';
					break;
				case 'Carga Gas':
					option = 34;
					typeCharge = 'Gas';
					break;
				case 'Carga HR / MW':
					option = 34;
					typeCharge = 'HR / MW';
					break;
				case 'Carga Margen x MM':
					option = 34;
					typeCharge = 'Margen x MM';
					break;
				case 'Carga Otros':
					option = 34;
					typeCharge = 'Otros';
					break;
				case 'Carga Poder Calorífico Inferior':
					option = 36;
					typeEnergy = 'Poder Calorífico Inferior';
					break;
				case 'Carga Factor de Potencia':
					option = 36;
					typeEnergy = 'Factor de Potencia';
					break;
				case 'Modelo Matemático - Mercado':
					option = 38;
					break;
				case 'Modelo Matemático - PPA':
					option = 39;
					break;

				case 'Regímenes Fiscales SAT':
					option = 201;
					break;
				/*case 'Monedas SAT':
					option = 202;
					break;//*/
				case 'Métodos de Pago SAT':
					option = 203;
					break;
				case 'Formas de Pago SAT':
					option = 204;
					break;
				case 'Productos SAT':
					option = 205;
					break;
				case 'Porcentajes de Iva':
					option = 206;
					break;
				case 'Unidades de Producto SAT':
					option = 207;
					break;
				case 'Usos CFDI SAT':
					option = 208;
					break;
				case 'Tipos de Relación SAT':
					option = 209;
					break;
				}
				if (option === 9) {
				  this.eventService.sendMainSafe(new EventMessage(option, catalog));
				} else if (option === 32) {
				  this.eventService.sendMainSafe(new EventMessage(option, typeWeather));
				} else if (option === 34) {
				  this.eventService.sendMainSafe(new EventMessage(option, typeCharge));
				} else if (option === 36) {
				  this.eventService.sendMainSafe(new EventMessage(option, typeEnergy));
				} else {
				  this.eventService.sendMainSafe(new EventMessage(option, item));
				}
    		}
		}));
	}
	clickMenu(event: EventMessage): void {
		this.viewContainerRef.clear();
		switch (event.id) {
		case 3:
			const factoryProducts = this.componentFactoryResolver.resolveComponentFactory(ProductsComponent);
			const refProducts =
			this.viewContainerRef.createComponent(factoryProducts);
			refProducts.changeDetectorRef.detectChanges();
			break;
		case 4:
			const factoryProductsEdit = this.componentFactoryResolver.resolveComponentFactory(ProductsEditComponent);
			const refProductsEdit =
			this.viewContainerRef.createComponent(factoryProductsEdit);
			refProductsEdit.instance.entity = event.data;
			if (Validate(event.data.product)) {
			 	refProductsEdit.instance.idProduct = event.data.product.id;
			}
			refProductsEdit.changeDetectorRef.detectChanges();
			break;
		case 5:
			const factoryUnityProducts = this.componentFactoryResolver.resolveComponentFactory(UnityProductsComponent);
			const refUnityProducts =
			this.viewContainerRef.createComponent(factoryUnityProducts);
			refUnityProducts.changeDetectorRef.detectChanges();
			break;
		case 6:
			const factoryUnityProductsEdit = this.componentFactoryResolver.resolveComponentFactory(UnityProductsEditComponent);
			const refUnityProductsEdit =
			this.viewContainerRef.createComponent(factoryUnityProductsEdit);
			refUnityProductsEdit.instance.entity = event.data;
			refUnityProductsEdit.instance.unityProductSelect = event.data.unityProduct;
			refUnityProductsEdit.changeDetectorRef.detectChanges();
			break;
		case 7:
			const factoryClients = this.componentFactoryResolver.resolveComponentFactory(ClientsComponent);
			const refClients =
			this.viewContainerRef.createComponent(factoryClients);
			refClients.changeDetectorRef.detectChanges();
			break;
		case 8:
			const factoryEditClients = this.componentFactoryResolver.resolveComponentFactory(ClientsEditComponent);
			const refEditClients =
			this.viewContainerRef.createComponent(factoryEditClients);
			refEditClients.instance.entity = event.data;
			if (Validate(event.data.client)) {
			refEditClients.instance.idClient = event.data.client.id;
			}
			refEditClients.changeDetectorRef.detectChanges();
			break;
		case 9:
			const factoryCatalogGeneric = this.componentFactoryResolver.resolveComponentFactory(CatalogGenericComponent);
			const refCatalogGeneric =
			this.viewContainerRef.createComponent(factoryCatalogGeneric);
			refCatalogGeneric.instance.catalog = event.data;
			refCatalogGeneric.changeDetectorRef.detectChanges();
			break;
		case 10:
			const factoryCatalogGenericEdit = this.componentFactoryResolver.resolveComponentFactory(CatalogGenericEditComponent);
			const refCatalogGenericEdit =
			this.viewContainerRef.createComponent(factoryCatalogGenericEdit);
			refCatalogGenericEdit.instance.entity = event.data;
			refCatalogGenericEdit.instance.catalog = event.data.catalog;
			refCatalogGenericEdit.instance.catalogGenericSelected = event.data.generic;
			refCatalogGenericEdit.changeDetectorRef.detectChanges();
			break;
		case 11:
			const factoryPml = this.componentFactoryResolver.resolveComponentFactory(PmlComponent);
			const refPml =
			this.viewContainerRef.createComponent(factoryPml);
			refPml.changeDetectorRef.detectChanges();
			break;
		case 12:
			const factoryPlants = this.componentFactoryResolver
			.resolveComponentFactory(PlantsComponent);
			const refPlants =
			this.viewContainerRef.createComponent(factoryPlants);
			refPlants.changeDetectorRef.detectChanges();
			break;
		case 13:
			const factoryEditPlants = this.componentFactoryResolver
			.resolveComponentFactory(PlantsEditComponent);
			const refEditPlants =
			this.viewContainerRef.createComponent(factoryEditPlants);
			refEditPlants.instance.entity = event.data;
			if (Validate(event.data.plant)) {
			refEditPlants.instance.idPlant = event.data.plant.id;
			}
			refEditPlants.changeDetectorRef.detectChanges();
			break;
		case 14:
			const factoryStates = this.componentFactoryResolver
			.resolveComponentFactory(StatesComponent);
			const refStates =
			this.viewContainerRef.createComponent(factoryStates);
			refStates.changeDetectorRef.detectChanges();
			break;
		case 15:
			const factoryStatesEdit = this.componentFactoryResolver
			.resolveComponentFactory(StatesEditComponent);
			const refStatesEdit =
			this.viewContainerRef.createComponent(factoryStatesEdit);
			refStatesEdit.instance.entity = event.data;
			refStatesEdit.instance.stateSelect = event.data.state;
			refStatesEdit.changeDetectorRef.detectChanges();
			break;
		case 16:
			const factoryMoneys = this.componentFactoryResolver
			.resolveComponentFactory(MoneysComponent);
			const refMoneys =
			this.viewContainerRef.createComponent(factoryMoneys);
			refMoneys.changeDetectorRef.detectChanges();
			break;
		case 17:
			const factoryMoneysEdit = this.componentFactoryResolver
			.resolveComponentFactory(MoneysEditComponent);
			const refMoneysEdit =
			this.viewContainerRef.createComponent(factoryMoneysEdit);
			refMoneysEdit.instance.entity = event.data;
			refMoneysEdit.instance.moneySelect = event.data.money;
			refMoneysEdit.changeDetectorRef.detectChanges();
			break;

		case 18:
			const factoryBrancheInvoiceSeries = this.componentFactoryResolver
			.resolveComponentFactory(BranchInvoiceSeriesComponent);
			const refBrancheInvoiceSeries =
			this.viewContainerRef.createComponent(factoryBrancheInvoiceSeries);
			refBrancheInvoiceSeries.changeDetectorRef.detectChanges();
			break;
		case 19:
			const factoryBrancheInvoiceSeriesEdit =
			this.componentFactoryResolver.resolveComponentFactory(BranchInvoiceSeriesEditComponent);
			const refBrancheInvoiceSeriesEdit =
			this.viewContainerRef.createComponent(factoryBrancheInvoiceSeriesEdit);
			refBrancheInvoiceSeriesEdit.instance.entity = event.data;
			refBrancheInvoiceSeriesEdit.instance.branchOfficeInvoiceSerieSelected =
			event.data.branchOfficeInvoiceSerie;
			refBrancheInvoiceSeriesEdit.changeDetectorRef.detectChanges();
			break;
		case 20:
			const factoryInvoices = this.componentFactoryResolver
			.resolveComponentFactory(InvoicesComponent);
			const refInvoices =
			this.viewContainerRef.createComponent(factoryInvoices);
			refInvoices.changeDetectorRef.detectChanges();
			break;
		case 21:
			const factoryInvoicesEdit =
			this.componentFactoryResolver.resolveComponentFactory(InvoicesEditComponent);
			const refInvoicesEdit =
			this.viewContainerRef.createComponent(factoryInvoicesEdit);
			console.dir(event);
			refInvoicesEdit.instance.entity = event.data;
			if (Validate(event.data.invoice)) {
			refInvoicesEdit.instance.invoiceSelected =
				event.data.invoice;
			}
			refInvoicesEdit.changeDetectorRef.detectChanges();
			break;
		case 23:
			const factoryFuecdEdit =
			this.componentFactoryResolver.resolveComponentFactory(FuecdEditComponent);
			const refFuecdEdit =
			this.viewContainerRef.createComponent(factoryFuecdEdit);
			refFuecdEdit.changeDetectorRef.detectChanges();
			break;
		case 24:
			const factoryFuecdInvoice =
			this.componentFactoryResolver.resolveComponentFactory(FuecdInvoiceComponent);
			const refFuecdInvoice =
			this.viewContainerRef.createComponent(factoryFuecdInvoice);
			if (Validate(event.data.fuecd)) {
			refFuecdInvoice.instance.idFuecd = event.data.fuecd.id;
			}
			refFuecdInvoice.changeDetectorRef.detectChanges();
			break;
		case 25:
			const factoryFinancialIndexes =
			this.componentFactoryResolver.resolveComponentFactory(FinancialIndexesComponent);
			const refFinalcialIndexes =
			this.viewContainerRef.createComponent(factoryFinancialIndexes);
			refFinalcialIndexes.changeDetectorRef.detectChanges();
			break;
		case 26:
			const factoryInpp =
			this.componentFactoryResolver.resolveComponentFactory(InppComponent);
			const refInpp =
			this.viewContainerRef.createComponent(factoryInpp);
			refInpp.changeDetectorRef.detectChanges();
			break;

		case 27:
			const factoryUsppi =
			this.componentFactoryResolver.resolveComponentFactory(UsppiComponent);
			const refUsppi =
			this.viewContainerRef.createComponent(factoryUsppi);
			refUsppi.changeDetectorRef.detectChanges();
			break;
		case 28:
			const factoryCreditNotes =
			this.componentFactoryResolver.resolveComponentFactory(CreditNotesComponent);
			const refCreditNotes =
			this.viewContainerRef.createComponent(factoryCreditNotes);
			refCreditNotes.changeDetectorRef.detectChanges();
			break;
		case 29:
			const factoryCreditNotesEdit =
			this.componentFactoryResolver.resolveComponentFactory(CreditNotesEditComponent);
			const refCreditNotesEdit =
			this.viewContainerRef.createComponent(factoryCreditNotesEdit);
			refCreditNotesEdit.instance.entity = event.data;
			if (Validate(event.data.creditNote)) {
			refCreditNotesEdit.instance.creditNoteSelected =
				event.data.creditNote;
			}
			refCreditNotesEdit.changeDetectorRef.detectChanges();
			break;
		case 30:
			const factoryDebitNotes =
			this.componentFactoryResolver.resolveComponentFactory(DebitNotesComponent);
			const refDebitNotes =
			this.viewContainerRef.createComponent(factoryDebitNotes);
			refDebitNotes.changeDetectorRef.detectChanges();
			break;
		case 31:
			const factoryDebitNotesEdit =
			this.componentFactoryResolver.resolveComponentFactory(DebitNotesEditComponent);
			const refDebitNotesEdit =
			this.viewContainerRef.createComponent(factoryDebitNotesEdit);
			refDebitNotesEdit.instance.entity = event.data;
			if (Validate(event.data.debitNote)) {
			refDebitNotesEdit.instance.debitNoteSelected =
				event.data.creditNote;
			}
			refDebitNotesEdit.changeDetectorRef.detectChanges();
			break;
		case 32:
			const factoryWeatherEdit =
			this.componentFactoryResolver.resolveComponentFactory(WeatherEditComponent);
			const refWeatherEdit =
			this.viewContainerRef.createComponent(factoryWeatherEdit);
			if (Validate(event.data)) {
			refWeatherEdit.instance.typeWeather = event.data;
			}
			refWeatherEdit.changeDetectorRef.detectChanges();
			break;
		case 33:
			break;
		case 34:
			const factoryChargeEdit =
			this.componentFactoryResolver.resolveComponentFactory(ChargeEditComponent);
			const refChargeEdit =
			this.viewContainerRef.createComponent(factoryChargeEdit);
			if (Validate(event.data)) {
			refChargeEdit.instance.typeCharge = event.data;
			}
			refChargeEdit.changeDetectorRef.detectChanges();
			break;
		case 36:
			const factoryEnergyEdit =
			this.componentFactoryResolver.resolveComponentFactory(EnergyEditComponent);
			const refEnergyEdit =
			this.viewContainerRef.createComponent(factoryEnergyEdit);
			if (Validate(event.data)) {
			refEnergyEdit.instance.typeEnergy = event.data;
			}
			refEnergyEdit.changeDetectorRef.detectChanges();
			break;
		case 38:
			break;

		case 39:
			const factoryPPA =
			this.componentFactoryResolver.resolveComponentFactory(PpaComponent);
			const refModelPPA =
			this.viewContainerRef.createComponent(factoryPPA);
			refModelPPA.changeDetectorRef.detectChanges();
			break;


		case 40:
			const factoryBranchCreditNoteSerie =
				this.componentFactoryResolver.resolveComponentFactory(BranchCreditNoteSeriesComponent);
			const refBranchCreditNoteSerie =
				this.viewContainerRef.createComponent(factoryBranchCreditNoteSerie);
			refBranchCreditNoteSerie.changeDetectorRef.detectChanges();
			break;
			case 41:
				const factoryBrancheCreditNoteSeriesEdit =
				this.componentFactoryResolver.resolveComponentFactory(BranchCreditNoteSeriesEditComponent);
				const refBrancheCreidtNoteSeriesEdit =
				this.viewContainerRef.createComponent(factoryBrancheCreditNoteSeriesEdit);
				refBrancheCreidtNoteSeriesEdit.instance.entity = event.data;
				refBrancheCreidtNoteSeriesEdit.instance.branchOfficeCreditNoteSerieSelected =
				event.data.branchOfficeCreditNoteSerie;
				refBrancheCreidtNoteSeriesEdit.changeDetectorRef.detectChanges();
				break;
		case 100:
			const factoryChangePasword =
			this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent);
			const refChangePasword =
			this.viewContainerRef.createComponent(factoryChangePasword);
			refChangePasword.changeDetectorRef.detectChanges();
			break;
		case 101:
			const factoryWeather =
			this.componentFactoryResolver.resolveComponentFactory(WeatherComponent);
			const refWeather =
			this.viewContainerRef.createComponent(factoryWeather);
			refWeather.changeDetectorRef.detectChanges();
			break;
		case 201:
			const factoryFiscalRegimensSat =
			this.componentFactoryResolver.resolveComponentFactory(FiscalRegimensSatComponent);
			const refFiscalRegimensSat =
			this.viewContainerRef.createComponent(factoryFiscalRegimensSat);
			refFiscalRegimensSat.changeDetectorRef.detectChanges();
			break;
		case 202:
			break;
		case 203:
			const factoryPaymentMethodsSat =
			this.componentFactoryResolver.resolveComponentFactory(PaymentMethodsSatComponent);
			const refaymentMethodsSat =
			this.viewContainerRef.createComponent(factoryPaymentMethodsSat);
			refaymentMethodsSat.changeDetectorRef.detectChanges();
			break;
		case 204:
			const factoryPaymentWaysSat =
			this.componentFactoryResolver.resolveComponentFactory(PaymentWaysSatComponent);
			const refPaymentWaysSat =
			this.viewContainerRef.createComponent(factoryPaymentWaysSat);
			refPaymentWaysSat.changeDetectorRef.detectChanges();
			break;
		case 205:
			const factoryProductsSat =
			this.componentFactoryResolver.resolveComponentFactory(ProductsSatComponent);
			const refProductsSat =
			this.viewContainerRef.createComponent(factoryProductsSat);
			refProductsSat.changeDetectorRef.detectChanges();
			break;
		case 206:
			const factoryRatesIvaSat =
			this.componentFactoryResolver.resolveComponentFactory(RatesIvaSatComponent);
			const refRatesIvaSat =
			this.viewContainerRef.createComponent(factoryRatesIvaSat);
			refRatesIvaSat.changeDetectorRef.detectChanges();
			break;
		case 207:
			const factoryUnityProductsSat =
			this.componentFactoryResolver.resolveComponentFactory(UnityProductsSatComponent);
			const refUnityProductsSat =
			this.viewContainerRef.createComponent(factoryUnityProductsSat);
			refUnityProductsSat.changeDetectorRef.detectChanges();
			break;
		case 208:
			const factoryUsesCfdiSat =
			this.componentFactoryResolver.resolveComponentFactory(UsesCfdiSatComponent);
			const refUsesCfdiSat =
			this.viewContainerRef.createComponent(factoryUsesCfdiSat);
			refUsesCfdiSat.changeDetectorRef.detectChanges();
			break;
		case 209:
			const factoryTypesRelationSat =
			this.componentFactoryResolver.resolveComponentFactory(TypesRelationSatComponent);
			const refTypesRelationSat =
			this.viewContainerRef.createComponent(factoryTypesRelationSat);
			refTypesRelationSat.changeDetectorRef.detectChanges();
			break;
		}
	}

}
