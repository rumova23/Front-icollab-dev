import { NoteDTO } from 'src/app/safe/models/note-dto';

export interface IncidentDTO{
    
	id                              ?:number;
    tag                             ?:String;
    incidentTypeId                  ?:number;
    incidentTypeDesc                ?:String;
    department                      ?:String;
    specificLocation                ?:String;
    incidentDate                    ?:Date|String;
    description                     ?:String;
    
    rca                             ?:boolean|String;
	rcaTargetDate                   ?:Date|String;
	rcaDeliveredDate                ?:Date|String;
    proceed                         ?:boolean;
    
    statusEntityId                  ?:number;
    statusEntity                    ?:String;
    
    statusEventId                   ?:number;
    statusEvent                     ?:String;
    
    userReporter                    ?:String;
    dateReported                    ?:Date|String;
    
    userSupervised                  ?:String;
    dateSupervised                  ?:Date|String;
    
    userApproval                    ?:String;
    dateApproved                    ?:Date|String;
    reasonApproved                  ?:String;
    
    userReject                      ?:String;
    dateRejected                    ?:Date|String;
    reasonRejected                  ?:String;
    
    observations?: NoteDTO[];
    tracking?:any;//Map<String,List<ActorDTO>> 
    
    save                            ?:boolean;
    active                          ?:boolean;
    order                           ?:number;
	userCreated                     ?:String;
    dateCreated                     ?:Date|String;
    userUpdated                     ?:String;
    dateUpdated                     ?:Date|String;


}