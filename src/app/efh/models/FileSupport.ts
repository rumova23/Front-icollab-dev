export class FileSupport {
    private fileId: string;
    private eventConfigId: string;
    private fileName: string;
    private fileType: string;
    private fileContentType: string;
    private fileSize: number;
    private fileData: File;
    private fileDownloadUri: string;
    private dateUploaded: Date;
    private saved: boolean;

    constructor(
         fileId: string,
         eventConfigId: string,
         fileName: string,
         fileType: string,
         fileContentType: string,
         fileSize: number,
         fileData: File,
         fileDownloadUri: string,
         dateUploaded: Date,
         saved: boolean
    ) {
        this.fileId = fileId;
        this.eventConfigId = eventConfigId;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileContentType = fileContentType;
        this.fileSize = fileSize;
        this.fileData = fileData;
        this.fileDownloadUri = fileDownloadUri;
        this.dateUploaded = dateUploaded;
        this.saved = saved;
    }
}
