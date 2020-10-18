export class ItemDebitNote {
    formControls: any[] = [
        {
            section: "General",
            inputs: [
                { inputtype: "invoice", label: "Factura", options: [], formControlName: "invoice" },
                { inputtype: "plantBranchOffice", label: "Sucursales de la Planta", options: [], 
                formControlName: "plantBranchOffice" },
                { inputtype: "plantDirection", label: "Direcciones de la Planta", options: [], 
                            formControlName: "plantDirection" },
                { inputtype: "select", label: "Sistema", options: [], formControlName: "sys" },
                { inputtype: "text", label: "Emails envío", formControlName: "emails" },
                { inputtype: "text", label: "Año Mercado", formControlName: "yearMarket" },
                { inputtype: "text", label: "Mes Mercado", formControlName: "monthMarket" },
                { inputtype: "text", label: "Día Mercado", formControlName: "dayMarket" },
                { inputtype: "text", label: "Año Cierre", formControlName: "yearClosing" },
                { inputtype: "text", label: "Mes Cierre", formControlName: "monthClosing" },
                { inputtype: "select", label: "Moneda", options: [], formControlName: "money" },
                { inputtype: "select", label: "Método de Pago", options: [], formControlName: "paymentMethod" },
                { inputtype: "select", label: "Condiciones de Pago", options: [], formControlName: "paymentCondition" },
                { inputtype: "select", label: "Forma de Pago", options: [], formControlName: "paymentWay" },
                { inputtype: "select", label: "Uso de CFDI", options: [], formControlName: "useCfdi" },
                { inputtype: "select", label: "Tipo de Relación", options: [], formControlName: "typeRelation" },
                { inputtype: "text", label: "Cuenta", formControlName: "account" },
                { inputtype: "text", label: "Subtotal", formControlName: "subtotal" },
                { inputtype: "text", label: "Porcentaje de descuento", formControlName: "percentageDiscount" },
                { inputtype: "text", label: "Monto descuento", formControlName: "discountAmount" },
                { inputtype: "text", label: "Subtotal 2", formControlName: "subtotal2" },
                { inputtype: "text", label: "Monto Iva Trasladado", formControlName: "amountRateIvaTransfer" },
                { inputtype: "text", label: "Total", formControlName: "total" },
                { inputtype: "textarea", label: "Observaciones", formControlName: "observations" }
            ]
        }
    ];
    formControlsProduct: any[] = [
        { inputtype: "select", label: "Servicio / Producto", options: [], formControlName: "product" },
        { inputtype: "text", label: "Cantidad", formControlName: "quantity" },
        { inputtype: "text", label: "Valor Unitario", formControlName: "unitValue" }
    ];
   
}
