export class ItemClient {
    formControls: any[] = [
        {
            section: "General",
            inputs: [
                { inputtype: "select", label: "Tipo de Cliente", options: [], formControlName: "typeClient" },
                { inputtype: "text", label: "Número de Cliente", formControlName: "number" },
                { inputtype: "text", label: "Clasificación de Cliente", formControlName: "classification" },
                { inputtype: "text", label: "Grupo Empresarial", formControlName: "businessGroup" },
                { inputtype: "text", label: "Giro", formControlName: "commercialBusiness" },
                { inputtype: "text", label: "Nombre Comercial", formControlName: "tradename" },
                { inputtype: "text", label: "Número Proveedor", formControlName: "supplierNumber" },
                {
                    inputtype: "select", label: "Condiciones de Pago", options: [],
                    formControlName: "paymentCondition"
                },
                { inputtype: "checkbox", label: "Requiere Addenda", formControlName: "requireAddenda" },
            ]
        },
        {
            section: "Datos Fiscales",
            inputs: [
                { inputtype: "select", label: "Uso CDFI", options: [], formControlName: "useCfdi" },
                { inputtype: "select", label: "Método de Pago", options: [], formControlName: "paymentMethod" },
                { inputtype: "select", label: "Tipo de Persona", options: [], formControlName: "typePerson" },
                { inputtype: "text", label: "Razón Social", formControlName: "businessName" },
                { inputtype: "text", label: "RFC", formControlName: "rfc" },
                { inputtype: "text", label: "Calle", formControlName: "street" },
                { inputtype: "text", label: "Número Exterior", formControlName: "outdoorNumber" },
                { inputtype: "text", label: "Número Interior", formControlName: "interiorNumber" },
                { inputtype: "select", label: "País", options: [], formControlName: "country" },
                { inputtype: "select", label: "Estado", options: [], formControlName: "state" },
                { inputtype: "text", label: "Colonia", formControlName: "colony" },
                { inputtype: "text", label: "Ciudad", formControlName: "city" },
                { inputtype: "text", label: "Localidad", formControlName: "location" },
                { inputtype: "text", label: "C.P", formControlName: "cp" },
                { inputtype: "text", label: "Email", formControlName: "email" },
                { inputtype: "text", label: "Teléfono", formControlName: "phone" }
            ]
        },
        {
            section: "Datos de Pago",
            inputs: [
                { inputtype: "time", label: "Horario Revisión Factura de", formControlName: "startTimeInvoiceReview" },
                { inputtype: "time", label: "Horario Revisión Factura a", formControlName: "endTimeInvoiceReview" },
                { inputtype: "text", label: "Teléfono", formControlName: "paymentPhone" },
                { inputtype: "text", label: "Número Addenda", formControlName: "addendaNumber" },
                { inputtype: "select", label: "Forma Pago SAT", options: [], formControlName: "paymentWay" },
                { inputtype: "text", label: "Email Factura", formControlName: "emailInvoice" },
            ]
        },
        {
            section: "Información Adicional",
            inputs: [
                { inputtype: "checkbox", label: "Bloqueado", formControlName: "locked" },
                { inputtype: "checkbox", label: "Activo", formControlName: "active" },
                { inputtype: "textarea", label: "Observaciones", formControlName: "observations" },
            ]
        }
    ];
    formControlsAccount: any[] = [
        { inputtype: "select", label: "Banco", options: [], formControlName: "bank" },
        { inputtype: "text", label: "Sucursal", formControlName: "branchOffice" },
        { inputtype: "text", label: "Cuenta", formControlName: "account" },
        { inputtype: "text", label: "Clabe", formControlName: "clabe" },
        { inputtype: "text", label: "Referencia", formControlName: "reference" }
    ];
    formControlsContact: any[] = [
        { inputtype: "text", label: "Nombre", formControlName: "name" },
        { inputtype: "text", label: "Apellido Paterno", formControlName: "lastName" },
        { inputtype: "text", label: "Apellido Materno", formControlName: "maidenName" },
        { inputtype: "text", label: "Email", formControlName: "email" },
        { inputtype: "text", label: "Teléfono", formControlName: "phone" },
        { inputtype: "text", label: "Teléfono Móvil", formControlName: "movilPhone" },
        { inputtype: "text", label: "Posición", formControlName: "position" },
        { inputtype: "text", label: "Título", formControlName: "title" },
        { inputtype: "textarea", label: "Observaciones", formControlName: "observations" }
    ];
    formControlsProduct: any[] = [
        { inputtype: "select", label: "Servicio", options: [], formControlName: "product" },
        { inputtype: "text", label: "Código de Cliente", formControlName: "code" },
        { inputtype: "checkbox", label: "Activo", formControlName: "active" }
    ];
}
