export interface IncidentInDTO {
	id               ?:string|number;
    tag               :String;
    incidentType      :String;
    department        :String;
    specificLocation  :String;
    //@ApiModelProperty(value = "Fecha en que sucedió el evento", example = "12/03/2020 13:35:56")
    incidentDate      :string|Date;
    description       :String;
    save              :boolean;
}
