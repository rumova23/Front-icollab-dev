export interface EventObservationInDTO {
	//@ApiModelProperty(value = "Id de la entidad", required = true, example = "1")
    id               ?: string|number;
	//@ApiModelProperty(value = "Id del evento al que pertenece la observación", required = true, example = "1")
    ideventconfig     : string|number;
	//@ApiModelProperty(value = "Descripción de la entidad", example = "Observaciones")
    observation       : String;
	//@ApiModelProperty(value = "Fecha de registro de la observación", example = "12/03/2020 13:35:56")
	dateobservation   : string|Date;
	//@ApiModelProperty(value = "Indica si es guardado o edición", required = true, example = "true-false")
    save              : boolean;
	//@ApiModelProperty(value = "Indica si la entidad esta activa o inactiva", required = true, example = "true-false")
    active            : boolean;
}
