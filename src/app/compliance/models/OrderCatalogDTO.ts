
export class OrderCatalogDTO {

    public catalogName: string
    public order: string
    
    constructor(
        catalogName: string,
        order: string
    ){
        this.catalogName = catalogName;
        this.order = order;
    }
    
}