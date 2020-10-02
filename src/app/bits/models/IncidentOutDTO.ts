export interface IncidentOutDTO{
	id               : number;
    tag              : String;
    incidentTypeId   : number;
    incidentTypeDesc : String;
    department       : String;
    specificLocation : String;
    incidentDate     : Date;
    description      : String;
    active           : boolean;
    order            : number;
    rca              : boolean;
	rcaTargetDate    : Date;
	rcaDeliveredDate : Date;
    proceed          : boolean;
	userCreated      : String;
    dateCreated      : Date;
    userUpdated      : String;
    dateUpdated      : Date;
}