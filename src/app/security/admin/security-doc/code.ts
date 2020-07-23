export var code = {
    tableSelectionModel:
    `selection : SelectionModel<any> = new SelectionModel<any>(true, []);
    -- this.selection.selected;--`,
    tableTable:
    `<app-mat-table 
        [data]="tableData"
        [columnsLabels]="tablaColumnsLabels"
        [columnsDisplay]="tableColumnsDisplay"
        [row_x_page]="tableRow_x_page"
        [selection]="selection"
        selectionLabel="Visible"
        (clickSee)="tableRowSee($event)"
        (clickEdit)="tableRowEdit($event)"
        (clickDelete)="tableRowDelete($event)"
    ></app-mat-table>`,
    table01:
    `tableData = [
        {order:1,fechaOp:new Date(),fuenteImport:'2da Corrida MM',usuario:'Usuario'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:2,fechaOp:new Date(),fuenteImport:'2da Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:3,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Usuario'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:4,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa'},
        {order:5,fechaOp:new Date(),fuenteImport:'1ra Corrida MM',usuario:'Sistema'  ,fechaMod:new Date(),estatus:'exitosa'}
    ];
    tablaColumnsLabels=[
        { key: 'order'        , label: '#' },
        { key: 'fechaOp'      , label: 'Fecha de Operación Comercial'       , dateFormat:'dd/MM/yyyy' },
        { key: 'fuenteImport' , label: 'Fuente de Importación' },
        { key: 'usuario'      , label: 'Usuario' },
        { key: 'fechaMod'     , label: 'Fecha y Hora Ultima Modificación'   , dateFormat:'dd/MM/yyyy' },
        { key: 'estatus'      , label: 'Estatus de la Importación' }
    ];
    tableColumnsDisplay: string[] = [
        'sys_checkbox',
        'order',
        'fechaOp',
        'fuenteImport',
        'usuario',
        'fechaMod',
        'estatus',
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
};