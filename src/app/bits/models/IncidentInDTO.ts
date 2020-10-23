export interface IncidentInDTO {
	id               ?: number|String;
    tag              ?: String;
    incidentTypeId    : number|String;
    incidentTypeDesc  : String;
    department        : String;
    specificLocation  : String;
    incidentDate      : Date|String;
    description       : String;
    save              : boolean;
    rca               : boolean;
	rcaTargetDate     : Date|String;
	rcaDeliveredDate  : Date|String;
    proceed           : boolean;
}
