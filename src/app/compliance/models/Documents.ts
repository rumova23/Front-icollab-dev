import { CarasDocument } from './CarasDocument';

export class Documents {
    private titleDocument: string;
    private carasDocuments: Array<CarasDocument>;
    
    constructor(
        titleDocument: string,
        carasDocuments: Array<CarasDocument>
    ) {
        this.titleDocument = titleDocument;
        this.carasDocuments = carasDocuments;
    }
}
