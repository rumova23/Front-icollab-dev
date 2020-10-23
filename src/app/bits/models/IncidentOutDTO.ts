import { NoteDTO } from 'src/app/safe/models/note-dto';

export interface IncidentOutDTO{
    order           ?: number;
	id               : number;
    tag              : String;
    incidentTypeId   : number;
    incidentTypeDesc : String;
    department       : String;
    specificLocation : String;
    incidentDate     : Date;
    description      : String;
    active           : boolean;
    rca              : boolean|String;
	rcaTargetDate    : Date;
	rcaDeliveredDate : Date;
    proceed          : boolean;
	userCreated      : String;
    dateCreated      : Date;
    userUpdated      : String;
    dateUpdated      : Date;
    
    statusEntityId  :number;
    statusEntity  :String;
    
    statusEventId  :number;
    statusEvent  :String;
    
    userReporter  :String;
    dateReported  :Date;
    
    userSupervised  :String;
    dateSupervised  :Date;
    
    userApproval  :String;
    dateApproved  :Date;
    
    userReject  :String;
    dateRejected  :Date;
    
    observations: NoteDTO[];
    tracking:any;//Map<String,List<ActorDTO>> 
    
}