export interface IncidentInDTO {
	//@ApiModelProperty(value = "Id de la entidad", required = true, example = "1")
	id               ?: number|String;
	//@ApiModelProperty(value = "AMB-1", example = "Tag del incidente reportado")
    tag              ?: String;
	//@ApiModelProperty(value = "1", example = "Tipo de incidente ID")
    incidentTypeId    : number|String;
	//@ApiModelProperty(value = "Ambiental", example = "Tipo de incidente")
    incidentTypeDesc  : String;
	//@ApiModelProperty(value = "Operaciones", example = "Departamento donde se origina incidente")
    department        : String;
	//@ApiModelProperty(value = "Tuxpan V", example = "Ubicación del incidente")
    specificLocation  : String;
	//@ApiModelProperty(value = "Fecha en que sucedió el evento", example = "12/03/2020 13:35:56")
    incidentDate      : Date|String;
	//@ApiModelProperty(value = "Descripción del incidente", example = "Derrame de aceite en agua")
    description       : String;
    //@ApiModelProperty(value = "Indica si es guardado o edición", required = true, example = "true-false")
    save              : boolean;
    //@ApiModelProperty(value = "Indica si es un documento RCA", required = true, example = "true-false")
    rca               : boolean;
    //@ApiModelProperty(value = "Fecha compromiso de entrega del RCA", example = "12/03/2020 13:35:56")
	rcaTargetDate     : Date|String;
    //@ApiModelProperty(value = "Fecha en que se cargo el RCA", example = "12/03/2020 13:35:56")
	rcaDeliveredDate  : Date|String;
    //@ApiModelProperty(value = "Indica si procede un incidente reportado", required = true, example = "true-false")
    proceed           : boolean;
}
