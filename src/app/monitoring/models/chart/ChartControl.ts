export interface ChartControl {
	idChart        : string;
	type_graph     : string;
	type_scale     : string;
	fill           : string;
	data_per_graph : number;
    point_radius   : number;
	time_refreseh  : number;
	timePast       : Date;
	displayLegend  : boolean,
}