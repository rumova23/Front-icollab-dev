import { CarasDocument } from './CarasDocument';

export class Documents {
    public titleDocument: string;
    public carasDocuments: Array<CarasDocument>;
    constructor(
        titleDocument: string,
        carasDocuments: Array<CarasDocument>
    ) {
        this.titleDocument = titleDocument;
        this.carasDocuments = carasDocuments;
    }
}
