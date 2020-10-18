
export class OrderCatalogDTO {

    public catalog: string;
    public order: number;
    public active: number;

    constructor(
        catalog: string,
        order: number,
        active: number
    ) {
        this.catalog = catalog;
        this.order = order;
        this.active = active;
    }
}
