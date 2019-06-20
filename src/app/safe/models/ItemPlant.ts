export class ItemPlant {
    formControls: any[] = [
        {
            section: "General",
            inputs: [
                { inputtype: "text", label: "Razón Social", formControlName: "businessName" },
                { inputtype: "text", label: "RFC", formControlName: "rfc" },
                { inputtype: "text", label: "Curp", formControlName: "curp" },
                { inputtype: "text", label: "Teléfono 1", formControlName: "phone1" },
                { inputtype: "text", label: "Teléfono 2", formControlName: "phone2" },
                { inputtype: "text", label: "Email", formControlName: "emailDefault" },
                { inputtype: "text", label: "Logo 1", formControlName: "logo1" },
                { inputtype: "text", label: "Logo 2", formControlName: "logo2" },
                { inputtype: "text", label: "Logo 3", formControlName: "logo3" },
                { inputtype: "text", label: "Número de Cliente", formControlName: "clientNumber" },
                { inputtype: "textarea", label: "Observaciones", formControlName: "observations" },
                {
                    inputtype: "select", label: "Tipo de Persona", options: [],
                    formControlName: "typePerson"
                },
                {
                    inputtype: "select", label: "Regimén Fiscal", options: [],
                    formControlName: "fiscalRegimeSat"
                },
                {
                    inputtype: "select", label: "Moneda", options: [],
                    formControlName: "money"
                },
                { inputtype: "checkbox", label: "Activa", formControlName: "active" }
            ]
        }
    ];
    formControlsAccount: any[] = [
        { inputtype: "select", label: "Banco", options: [], formControlName: "bank" },
        { inputtype: "text", label: "Sucursal", formControlName: "branchOffice" },
        { inputtype: "text", label: "Cuenta", formControlName: "account" },
        { inputtype: "text", label: "Clabe", formControlName: "clabe" },
        { inputtype: "text", label: "Clave", formControlName: "key" },
        { inputtype: "text", label: "Referencia", formControlName: "reference" }
    ];
    formControlsDirection: any[] = [
        { inputtype: "text", label: "Calle", formControlName: "street" },
        { inputtype: "text", label: "Número Exterior", formControlName: "outdoorNumber" },
        { inputtype: "text", label: "Número Interior", formControlName: "interiorNumber" },
        { inputtype: "select", label: "País",  options: [], formControlName: "country" },
        { inputtype: "select", label: "Estado", options: [], formControlName: "state" },
        { inputtype: "text", label: "Colonia", formControlName: "colony" },
        { inputtype: "text", label: "Ciudad", formControlName: "city" },
        { inputtype: "text", label: "Localidad", formControlName: "location" },
        { inputtype: "text", label: "CP", formControlName: "cp" }
    ];
    formControlsCertificate: any[] = [
        { inputtype: "text", label: "Número", formControlName: "number" },
        { inputtype: "date", label: "Fecha Carga", formControlName: "dateUpload" },
        { inputtype: "date", label: "Fecha Expiración", formControlName: "dateExpiration" },
        { inputtype: "text", label: "Password", formControlName: "password" },
        { inputtype: "text", label: "Ruta archivo cer", formControlName: "pathCer" },
        { inputtype: "text", label: "Ruta archivo key", formControlName: "pathKey" },
        { inputtype: "checkbox", label: "Activo", formControlName: "active" }
    ];
    formControlsBranch: any[] = [
        { inputtype: "text", label: "Nombre", formControlName: "name" },
        { inputtype: "textarea", label: "Observaciones", formControlName: "observations" },
        { inputtype: "text", label: "Logo 1", formControlName: "logo1" },
        { inputtype: "text", label: "Logo 2", formControlName: "logo2" },
        { inputtype: "text", label: "Logo 3", formControlName: "logo3" },
        { inputtype: "text", label: "Número de Cliente", formControlName: "clientNumber" },
        { inputtype: "text", label: "Calle", formControlName: "street" },
        { inputtype: "text", label: "Número Exterior", formControlName: "outdoorNumber" },
        { inputtype: "text", label: "Número Interior", formControlName: "interiorNumber" },
        { inputtype: "select", label: "País",  options: [], formControlName: "country" },
        { inputtype: "select", label: "Estado", options: [], formControlName: "state" },
        { inputtype: "text", label: "Colonia", formControlName: "colony" },
        { inputtype: "text", label: "Ciudad", formControlName: "city" },
        { inputtype: "text", label: "Localidad", formControlName: "location" },
        { inputtype: "text", label: "CP", formControlName: "cp" },
        { inputtype: "checkbox", label: "Activo", formControlName: "active" }
    ];
}
