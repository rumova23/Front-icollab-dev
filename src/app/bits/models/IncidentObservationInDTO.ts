export interface IncidentObservationInDTO{
    
	//value = "Id de la entidad", required = true, example = "1"
    id                  : string|number;

	//value = "Id del incidente al que pertenece la observación", required = true, example = "1"
    incidentId          : string|number;
	
	//value = "Descripción de la entidad", example = "Observaciones"
    observation         : string;
	
	//value = "Fecha de registro de la observación", example = "12/03/2020 13:35:56"
	dateobservation     : string|Date;
	
	//value = "Indica si es guardado o edición", required = true, example = "true-false"
    save                : boolean;
	
	//value = "Indica si la entidad esta activa o inactiva", required = true, example = "true-false"
    active              : boolean;
}