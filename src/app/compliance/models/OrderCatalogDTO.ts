
export class OrderCatalogDTO {

    public catalogName: string
    public order: string
    public status: string
    
    constructor(
        catalogName: string,
        order: string,
        status: string
    ){
        this.catalogName = catalogName;
        this.order = order;
        this.status = status
    }
    
}