export class ItemNewEvent {
    formControls: any[] = [
        {
            section: "",
            inputs: [
                { inputtype: "date", label: "Fecha inicio", formControlName: "Fecha inicio" },
                { inputtype: "time", label: "Hora inicio", formControlName: "Hora inicio" },
                { inputtype: "date", label: "Fecha Final", formControlName: "Fecha Final" },
                { inputtype: "time", label: "Hora Final", formControlName: "Hora Final" },
                { inputtype: "select", label: "Combustible", formControlName: "Combustible",options: [{name:'Gas'}] },
                { inputtype: "number", label: "Potencia MW", formControlName: "Potencia MW" },
                { inputtype: "number", label: "(-) Pérdida en MW", formControlName: "Perdida en MW" },
                { inputtype: "select", label: "Estatus", formControlName: "Estatus", options: [{name:'Abierto'},{name:'Cerrado'}] },
                { inputtype: "select", label: "Clasificación de evento", formControlName: "Claevento", options: [{name:'Pruebas de CENACE'}] },
                { inputtype: "select", label: "Evento", formControlName: "Evento", options: [{name:'PVC(+) Mercado'}] },
                { inputtype: "select", label: "Contrato Afectado", formControlName: "Contrato Afectado", options: [{name:'Abierto'},{name:'Cerrado'}] },
                { inputtype: "select", label: "Real/CCDV", formControlName: "RealCCDV", options: [{name:'CCDV'}] },
                { inputtype: "select", label: "BT", formControlName: "BT", options: [{name:'1%'}] },

            ]
        },
        {
            section: "",
            inputs: [
                { inputtype: "select", label: "MEM", formControlName: "MEM", options: [{name:'MTR'}] },
                { inputtype: "number", label: "MW Ofertados", formControlName: "MW Ofertados" },
                { inputtype: "select", label: "Servicios Conexos", formControlName: "Servicios Conexos", options: [{name:'N/A'}] },
            ]
        }
    ];
    formControlsObservations: any[] = [
        { inputtype: "textarea", label: "Observaciones", formControlName: "observations" }
    ];
    formControlsOther5555: any[] = [
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
    formControlsOther: any[] = [
        {
            section: "",
            inputs: [
                { inputtype: "select", label: "Unidad", formControlName: "Unidad", options: [{name:'Planta'}] },
                { inputtype: "textarea", label: "Observaciones", formControlName: "observations" },
                { inputtype: "text", label: "# Licencia", formControlName: "Licencia" },
                { inputtype: "select", label: "Equipo", formControlName: "Equipo", options: [{name:'...'}] },
                { inputtype: "number", label: "Carga Inicial MW", formControlName: "Carga Inicial MW" },
                { inputtype: "number", label: "Carga Final MW", formControlName: "Carga Final MW" },
            ]
        },
        {
            section: "",
            inputs: [
                { inputtype: "select", label: "Tipos de Eventos", formControlName: "Tipos de Eventos", options: [{name:'...'}] },
                { inputtype: "select", label: "Fuente", formControlName: "Fuente", options: [{name:'RID'}] },
                
            ]
        },
        {
            section: "",
            inputs: [
                { inputtype: "text", label: "Nombre de Operador CENACE Abrió", formControlName: "nopcenaceOpen" },
                { inputtype: "text", label: "Apellidos de Operador CENACE Abrió", formControlName: "apopcenaceOpen" },
                { inputtype: "text", label: "Nombre de Operador EAT Abrió", formControlName: "nopeatOpen" },
                { inputtype: "text", label: "Nombre de Operador CENACE Cerró", formControlName: "nopcenaceclose" },
                { inputtype: "text", label: "Apellidos de Operador Cerró", formControlName: "apopclose" },
                { inputtype: "text", label: "Nombre de Operador EAT Cerró", formControlName: "nopclose" },
                
            ]
        }







    ];
    
}
