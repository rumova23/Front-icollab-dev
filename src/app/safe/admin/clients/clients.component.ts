import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  title = "Registro de Clientes: Nuevo registro";
  formControls = [
    {
      section:"General",
      inputs:[
        {inputtype:"hidden", label:"ID Cliente",  disabled:true, value:"1", required:true, col:4},
        {inputtype:"select", label:"Tipo de Cliente",  disabled:false, required:true, selected:'nacional', options:[{viewValue:'Internacional',value:'internacional'},{viewValue:'Nacional',value:'nacional'}], col:4},
        {inputtype:"text",   label:"Número de Cliente",  required:false, value:"606", col:5},
        {inputtype:"text",   label:"Clasificación de Cliente",  required:true,value:"Usuario final", col:6},
        {inputtype:"text",   label:"Grupo Empresarial",  required:false,value:"No aplica"},
        {inputtype:"text",   label:"Giro",  required:false,value:"Alimenticio"},
        {inputtype:"text",   label:"Nombre Comercial",  required:true,value:"Rodriguez Rodriguez Cutberto Joel"},
        {inputtype:"text",   label:"Número Proveedor", col:5},
        {inputtype:"select", label:"Condiciones de Pago",  disabled:false, required:false, selected:'credito', options:[{viewValue:'Crédito',value:'credito'},{viewValue:'Nacional',value:'nacional'}], col:6 },
        {inputtype:"select", label:"Requiere Addenda",  disabled:false, required:false, selected:'no', options:[{viewValue:'No',value:'no'},{viewValue:'Si',value:'si'}], col:5},
      ]
    },
    {
      section:"Datos Fiscales",
      inputs:[
        {inputtype:"select", label:"Uso CDFI", disabled:false, required:true, selected:'G03', options:[{viewValue:'G03 :: Gastos en General',value:'G03'},{viewValue:'Nacional',value:'nacional'}]},
        {inputtype:"select", label:"Metodo de Pago", disabled:false, required:true, selected:'PPD', options:[{viewValue:'PPD :: Pago en parcialidadeso diferido',value:'PPD'}]},
        {inputtype:"select", label:"Tipo de Persona", disabled:false, required:true, selected:'fisica', options:[{viewValue:'Física',value:'fisica'},{viewValue:'Moral',value:'moral'}]},
        {inputtype:"text",   label:"Razón Social"},
        {inputtype:"text",   label:"RFC"},
        {inputtype:"text",   label:"Calle"},
        {inputtype:"text",   label:"Número Exterior", col:5},
        {inputtype:"text",   label:"Número Interior", col:5},
        {inputtype:"select", label:"País", disabled:false, required:true, selected:'mexico', options:[{viewValue:'México',value:'mexico'}], col:6},
        {inputtype:"select", label:"Estado", disabled:false, required:true, selected:'cdmx', options:[{viewValue:'CDMX',value:'cdmx'}], col:6},
        {inputtype:"text",   label:"Ciudad (Localidad)", col:6},
        {inputtype:"text",   label:"C.P", col:3},
        {inputtype:"text",   label:"Email"},
      ]
    },
    {
      section:"Datos de Pago",
      inputs:[
        {inputtype:"select", label:"Horario Revisión Factura de", disabled:false, required:false, selected:'00:00', options:[{viewValue:'00:00',value:'00:00'}]},
        {inputtype:"select", label:"Horario Revisión Factura a", disabled:false, required:false, selected:'00:00', options:[{viewValue:'00:00',value:'00:00'}]},
        {inputtype:"text",   label:"Teléfono", requied:true},
        {inputtype:"text",   label:"Teléfono 2", requied:false},
        {inputtype:"text",   label:"Número Addenda"},
        {inputtype:"select", label:"Forma Pago SAT", disabled:false, required:true, selected:'99', options:[{viewValue:'99 :: Por definir',value:'99'}]},
        {inputtype:"text",   label:"Email"},
      ]
    },
    {
      section:"Información Adicional",
      inputs:[
        {inputtype:"select",     label:"Bloqueado", disabled:false, required:true, selected:'no', options:[{viewValue:'No',value:'no'}], col:4},
        {inputtype:"select",     label:"Activo", disabled:false, required:true, selected:'si', options:[{viewValue:'No',value:'no'},{viewValue:'Si',value:'si'}], col:4},
        {inputtype:"textarea",   label:"Observaciones"},
      ]
    }
    

  ];
  

  /* Table Customer Accounts */
  customerAccounts_data             : any[]    = [
    {bank:"Banamex",sucursal:'cdem2',cuenta:"225222522252",clave:"000000000000000",ref_bank:"xxx"}
  ];
  customerAccounts_displayedColumns : any[]    = [ {key:'bank',label:'Banco'},
                                  {key:'sucursal',label:'Sucursal'},
                                  {key:'cuenta',label:'Cuenta'},
                                  {key:'clave',label:'CLABE'},
                                  {key:'ref_bank',label:'REFERENCIA'}
                                ];
  customerAccounts_columnsToDisplay : string[] = ['bank','sucursal','cuenta','clave','ref_bank','rm'];
  customerAccounts_dataSource;

  /* Table Customer Contact */
  customerContact_data             : any[]    = [
    {name:"Benito",lastname:'cdem2',lastname2:"225222522252",email:"000000000000000",telephone:"",mobile:"xxx",position:"",college_degree:"",observations:""}
  ];
  customerContact_displayedColumns : any[]    = [ 
                                  {key:'name',label:'Nombre'},
                                  {key:'lastname',label:'Apellido Paterno'},
                                  {key:'lastname2',label:'Apellido Materno'},
                                  {key:'email',label:'email'},
                                  {key:'telephone',label:'telefono'},
                                  {key:'mobile',label:'celular'},
                                  {key:'position',label:'cargo'},
                                  {key:'college_degree',label:'titulo'},
                                  {key:'observations',label:'observaciones'}
                                ];
  customerContact_columnsToDisplay : string[] = ['name','lastname','lastname2','email','telephone','mobile','position','college_degree','observations','rm'];
  customerContact_dataSource;

  /* Table Codes Addenda Products Of Client */
  codesAddendaProductsOfClient_data             : any[]    = [
    {service:"id servicio elegido", codeClient:"03",active:'activado'}
  ];
  codesAddendaProductsOfClient_columnsToDisplay : string[] = ['service','codeClient','active', 'rm'];
  codesAddendaProductsOfClient_dataSource;
  codesAddendaProductsOfClient_service: any[] = [
    {value: 'service-0', viewValue: 'Combo de todos los servicios activos'},
    {value: 'service-1', viewValue: 'service 2'},
    {value: 'service-2', viewValue: 'service 3'}
  ];
  codesAddendaProductsOfClient_selected = 'service-0';

  constructor(private globalService: GlobalService, private ngZone: NgZone) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.customerAccounts_dataSource = new MatTableDataSource<any>(this.customerAccounts_data);
    this.customerContact_dataSource  = new MatTableDataSource<any>(this.customerContact_data);
    this.codesAddendaProductsOfClient_dataSource  = new MatTableDataSource<any>(this.codesAddendaProductsOfClient_data);
    
    this.customerAccounts_dataSource.paginator = this.paginator;
    this.customerContact_dataSource.paginator  = this.paginator;
    this.codesAddendaProductsOfClient_dataSource.paginator  = this.paginator;
  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  addCustomerAccounts(){
    this.customerAccounts_data.push({bank:"",sucursal:'',cuenta:"",clave:"",ref_bank:""});
    this.customerAccounts_dataSource = new MatTableDataSource<any>(this.customerAccounts_data);
  }
  addCustomerContact(){
    this.customerContact_data.push({name:"",lastname:'',lastname2:"",email:"",telephone:"",mobile:"",position:"",college_degree:"",observations:""});
    this.customerContact_dataSource = new MatTableDataSource<any>(this.customerContact_data);
  }
  addCodesAddendaProductsOfClient(){
    this.codesAddendaProductsOfClient_data.push({service:"", codeClient:"",active:''});
    this.codesAddendaProductsOfClient_dataSource = new MatTableDataSource<any>(this.codesAddendaProductsOfClient_data);
  }
  rmCodesAddendaProductsOfClient(i){
    this.codesAddendaProductsOfClient_data.splice(i,1);
    this.codesAddendaProductsOfClient_dataSource = new MatTableDataSource<any>(this.codesAddendaProductsOfClient_data);
  }
  rmCustomerContact(i){
    this.customerContact_data.splice(i,1);
    this.customerContact_dataSource = new MatTableDataSource<any>(this.customerContact_data);
  }
  rmCustomerAccount(i){
    this.customerAccounts_data.splice(i,1);
    this.customerAccounts_dataSource = new MatTableDataSource<any>(this.customerAccounts_data);
  }
}
