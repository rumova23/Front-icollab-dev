export interface IncidentInDTO {
	id                :string|number;
    tag               :String;
    incidentType      :String;
    department        :String;
    specificLocation  :String;
    incidentDate      :string|Date;
    description       :String;
    save              :boolean;
}
