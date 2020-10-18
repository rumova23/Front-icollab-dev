export interface EventObservationOutDTO{
    id              : String|number;
    ideventconfig   : String|number;
    observation     : String;
    dateobservation : String|Date;
    active          : boolean;
    userCreated     : String;
    dateCreated     : String|Date;
    userUpdated     : String;
    dateUpdated     : String|Date;
}