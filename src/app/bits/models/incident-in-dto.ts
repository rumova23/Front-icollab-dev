export interface IncidentInDTO {
	id               ?:string|number;
    tag               :String;
    incidentType      :String;
    department        :String;
    specificLocation  :String;
    incidentDate      :string|Date; //example = "12/03/2020 13:35:56")
    description       :String;
    save              :boolean;
}
