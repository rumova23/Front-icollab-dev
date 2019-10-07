export class CarasDocument {
    public name: string;
    public type: string;
    public fileDownloadUri: string;

    constructor(name: string, type: string, fileDownloadUri: string) {
        this.name = name;
        this.type = type;
        this.fileDownloadUri = fileDownloadUri;
    }
}
