export interface IncidentObservationOutDTO{
	order          ?: number;
	id              : string|number;
	incidentId      : string|number;
	observation     : string;
	dateobservation : string|Date;
	active          : boolean;
	userCreated     : string;
    dateCreated     : string|Date;
    userUpdated     : string;
    dateUpdated     : string|Date;
}