export class ItemClient2 {
    formControls: any[] = [
        {
            section: "General",
            inputs: [
                { inputtype: "hidden", label: "ID Cliente", disabled: true, value: "1", required: true, col: 4 },
                { inputtype: "select", label: "Tipo de Cliente", disabled: false, required: true, selected: 'nacional', options: [{ viewValue: 'Internacional', value: 'internacional' }, { viewValue: 'Nacional', value: 'nacional' }], col: 4 },
                { inputtype: "text", label: "Número de Cliente", required: false, value: "606", col: 5 },
                { inputtype: "text", label: "Clasificación de Cliente", required: true, value: "Usuario final", col: 6 },
                { inputtype: "text", label: "Grupo Empresarial", required: false, value: "No aplica" },
                { inputtype: "text", label: "Giro", required: false, value: "Alimenticio" },
                { inputtype: "text", label: "Nombre Comercial", required: true, value: "Rodriguez Rodriguez Cutberto Joel" },
                { inputtype: "text", label: "Número Proveedor", col: 5 },
                { inputtype: "select", label: "Condiciones de Pago", disabled: false, required: false, selected: 'credito', options: [{ viewValue: 'Crédito', value: 'credito' }, { viewValue: 'Nacional', value: 'nacional' }], col: 6 },
                { inputtype: "select", label: "Requiere Addenda", disabled: false, required: false, selected: 'no', options: [{ viewValue: 'No', value: 'no' }, { viewValue: 'Si', value: 'si' }], col: 5 },
            ]
        },
        {
            section: "Datos Fiscales",
            inputs: [
                { inputtype: "select", label: "Uso CDFI", disabled: false, required: true, selected: 'G03', options: [{ viewValue: 'G03 :: Gastos en General', value: 'G03' }, { viewValue: 'Nacional', value: 'nacional' }] },
                { inputtype: "select", label: "Metodo de Pago", disabled: false, required: true, selected: 'PPD', options: [{ viewValue: 'PPD :: Pago en parcialidadeso diferido', value: 'PPD' }] },
                { inputtype: "select", label: "Tipo de Persona", disabled: false, required: true, selected: 'fisica', options: [{ viewValue: 'Física', value: 'fisica' }, { viewValue: 'Moral', value: 'moral' }] },
                { inputtype: "text", label: "Razón Social" },
                { inputtype: "text", label: "RFC" },
                { inputtype: "text", label: "Calle" },
                { inputtype: "text", label: "Número Exterior", col: 5 },
                { inputtype: "text", label: "Número Interior", col: 5 },
                { inputtype: "select", label: "País", disabled: false, required: true, selected: 'mexico', options: [{ viewValue: 'México', value: 'mexico' }], col: 6 },
                { inputtype: "select", label: "Estado", disabled: false, required: true, selected: 'cdmx', options: [{ viewValue: 'CDMX', value: 'cdmx' }], col: 6 },
                { inputtype: "text", label: "Ciudad (Localidad)", col: 6 },
                { inputtype: "text", label: "C.P", col: 3 },
                { inputtype: "text", label: "Email" },
            ]
        },
        {
            section: "Datos de Pago",
            inputs: [
                { inputtype: "select", label: "Horario Revisión Factura de", disabled: false, required: false, selected: '00:00', options: [{ viewValue: '00:00', value: '00:00' }] },
                { inputtype: "select", label: "Horario Revisión Factura a", disabled: false, required: false, selected: '00:00', options: [{ viewValue: '00:00', value: '00:00' }] },
                { inputtype: "text", label: "Teléfono", requied: true },
                { inputtype: "text", label: "Teléfono 2", requied: false },
                { inputtype: "text", label: "Número Addenda" },
                { inputtype: "select", label: "Forma Pago SAT", disabled: false, required: true, selected: '99', options: [{ viewValue: '99 :: Por definir', value: '99' }] },
                { inputtype: "text", label: "Email" },
            ]
        },
        {
            section: "Información Adicional",
            inputs: [
                { inputtype: "select", label: "Bloqueado", disabled: false, required: true, selected: 'no', options: [{ viewValue: 'No', value: 'no' }], col: 4 },
                { inputtype: "select", label: "Activo", disabled: false, required: true, selected: 'si', options: [{ viewValue: 'No', value: 'no' }, { viewValue: 'Si', value: 'si' }], col: 4 },
                { inputtype: "textarea", label: "Observaciones" },
            ]
        }
    ];
}
