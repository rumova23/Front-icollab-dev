export interface FileCenter{
    id? : number;
    father? : string;
    fatherId? : number|string;
    fileName? : string;
    fileNameFormat? : string;
    path? : string;
    fileType? : string;
    fileContentType? : string;
    fileSize? : number;
    fileData? : any;
}