export var code = {
    tableSelectionModel:
    `selection : SelectionModel<any> = new SelectionModel<any>(true, []);
    -- this.selection.selected;--`
    ,tableTable:
    `
    <app-mat-table 
        [data]="tableData"
        [columnsLabels]="tablaColumnsLabels"
        [columnsDisplay]="tableColumnsDisplay"
        [row_x_page]="tableRow_x_page"
        [selection]="selection"
        selectionLabel="Visible"
        (clickLink)="onTableRowLink($event)"
        (clickSee)="tableRowSee($event)"
        (clickEdit)="tableRowEdit($event)"
        (clickDelete)="tableRowDelete($event)"
    ></app-mat-table>`
    ,table01:
`   tableData = [
        {order:1,fechaOp:new Date(),fuenteImport:'2da Corrida MM',usuario:'Usuario'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:2,fechaOp:new Date(),fuenteImport:'2da Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa' ,backgroundColor: 'gold' },
        {order:3,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Usuario'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:4,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:5,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa'}
    ];
    tablaColumnsLabels=[
        { key: 'order'        , label: '#'                                  , isSticky   : true},
        { key: 'fechaOp'      , label: 'Fecha de Operación Comercial'       , dateFormat : 'dd/MM/yyyy' },
        { key: 'fuenteImport' , label: 'Fuente de Importación' },
        { key: 'usuario'      , label: 'Usuario' },
        { key: 'fechaMod'     , label: 'Fecha y Hora Ultima Modificación'   , dateFormat : 'dd/MM/yyyy' },
        { key: 'estatus'      , label: 'Estatus de la Importación' },
        { key: 'timbrar'      , label: 'Timbrar'                            , typeLink   : {matIcon:'touch_app'}},
    ];
    tableColumnsDisplay: string[] = [
        'sys_checkbox',
        'order',
        'fechaOp',
        'fuenteImport',
        'usuario',
        'fechaMod',
        'estatus',
        'timbrar',
        'sys_see',
        'sys_edit',
        'sys_delete'
    ];
    tableRow_x_page = [5,10];
    
    selection : SelectionModel<any> = new SelectionModel<any>(true, []);
    
    para pasarle elementos que seran los seleccionados.
    
    ...
    this.selection.select(this.tableDataDemo[2],this.tableDataDemo[3]);
    ó
    this.selection.select(...this.lst.filter(e => e.visible === true));
    ...
    
    para recuperar los elementos que tienen el checkbox activado:
    
    ...
    let seleccionados = this.selection.selected;
    ó
    this.selection.changed.subscribe(event=>{
        let algo = this.selection.selected;
        });
    ...`
    ,btn:
    `
    <app-btn-block                    (myClick)="clickBtn()" label="Aplicar Detección Procedimiento" [addClass]="['tester-00']"></app-btn-block>
    <app-btn-block-acept              (myClick)="clickBtn()"></app-btn-block-acept>
    <app-btn-block-add                (myClick)="clickBtn()"></app-btn-block-add>
    <app-btn-block-back               (myClick)="clickBtn()"></app-btn-block-back>
    <app-btn-block-cancel             (myClick)="clickBtn()"></app-btn-block-cancel>
    <app-btn-block-clean              (myClick)="clickBtn()"></app-btn-block-clean>
    <app-btn-block-consult            (myClick)="clickBtn()"></app-btn-block-consult>
    <app-btn-block-download-layout    (myClick)="clickBtn()"></app-btn-block-download-layout>
    <app-btn-block-download           (myClick)="clickBtn()"></app-btn-block-download>
    <app-btn-block-finish             (myClick)="clickBtn()"></app-btn-block-finish>
    <app-btn-block-graph              (myClick)="clickBtn()"></app-btn-block-graph>
    <app-btn-block-import             (myClick)="clickBtn()"></app-btn-block-import>
    <app-btn-block-save-update        (myClick)="clickBtn()"></app-btn-block-save-update>
    <app-btn-block-save               (myClick)="clickBtn()"></app-btn-block-save>
    <app-btn-block-search             (myClick)="clickBtn()"></app-btn-block-search>`
    ,btnBase:
    `<app-btn-block></app-btn-block>`
    ,btnAtributes:
    '<app-btn-block-acept (myClick)="clickBtn()" myType="submit" [disabled]="true"></app-btn-block-acept>'
    ,inputTs:
    `
    form : FormGroup;
    constructor(
		private formBuilder: FormBuilder
    ) { }
    ngOnInit() {		
		this.form = this.formBuilder.group({
			name: [{ value: '', disabled: false }, Validators.required],
			aotucomplete: [{ value: '', disabled: false }, Validators.required],
			dateYearAndMonth:[{ value: null, disabled: false }],
			select: [{ value: '', disabled: false }, Validators.required]
		});
	}
    `
    ,btnDatepickerYearAndMonth:
    `
        <app-mat-input-datepicker-year-and-month 
            [formGroup]="form"
            controlName="dateYearAndMonth"
            (eventChange)="chosenMonthHandler($event)" 
            label="Commercial Operation Date"
        ></app-mat-input-datepicker-year-and-month>
    `
    ,btnDatepicker:
    `
    <app-mat-input-datepicker
        [formGroup]="form"
        controlName="datePicker"
        (eventChange)="onDatePicker($event)" 
        label="Commercial Operation Date"
    ></app-mat-input-datepicker>
    `
};