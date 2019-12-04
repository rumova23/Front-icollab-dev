export class RelWebIdLocalId{
    webId;
    localId;
    active;
    constructor(
        webId:string
        ,localId:string
        ,active:boolean
    ){
        this.webId   = webId
        this.localId = localId;
        this.active  = active;
    }
}