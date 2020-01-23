
export const hexToRGB = function(h,a) {
	let r = "0"; 
	let g = "0";
	let b = "0";
  
	// 3 digits
	if (h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];
  
	// 6 digits
	} else if (h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}
	
	return "rgb("+ +r + "," + +g + "," + +b + ","+a+")";
}
export const generateColorHEX = function(calltag = null){
    let generarLetra = function(){
        var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero = (Math.random()*15).toFixed(0);
        return letras[numero];
    }
	var coolor = "";
 
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}
export const chartCreateConfigDemo = function(s){
	return{
		type: 'bar', 
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	};
}
export const chartCreateConfig = function (controls){
	return {
		type: controls['type_graph'] // line / bar
		,data: {
			labels: [],
			datasets: []
		}
		,options: {
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				point: {
					//hoverBackgroundColor: makeHalfAsOpaque,
					//radius: this.chart_est_power_01_point_radius,
					radius: 2,
					hoverRadius: 15,
					//pointStyle:'line'
				},
				rectangle: {
				borderWidth: 1,
				}
			},
			legend: {
				display: controls['displayLegend'],
				labels:{
					fontColor: '#ffffff',
					fontSize:12,
					usePointStyle:false,
				}
			},
			title: {
				//display: false,
				//text: 'Custom Chart Title',
				//padding:10
			},
			animation: {
				animateScale: true,
				animateRotate: true
			},
			scales: {
				xAxes: [
					{
						display: true,
						gridLines:{
							color:"rgba(255,255,255,1)",
							display: false,
						},
						ticks:{
							fontColor:"orange",
							fontSize:12,
							//beginAtZero: false,
							//suggestedMin:9000
						}
					}
				]
				,yAxes: [
					{	
						type: 'linear',// logarithmic / linear
						display: false,
						position: 'left',
						id: 'yAxesDefault',
						ticks:{
							//min: 0,
							//max: 1,
							//suggestedMin:9000,
							//suggestedMax:9000,
							//beginAtZero: false  
							maxTicksLimit:2
						},
					}
				],
			}
		}
	};
}
export const doughnutCompletoConfig = function(){
	return {
		type: 'doughnut',
		data: {
			labels: [
				'Green',
				'Gray',
			],
			datasets: []
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			cutoutPercentage: 40,
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			animation: {
				animateScale: true,
				animateRotate: true
			}
		}
	};
}
export const getDatasetTag = function (lst,calltag){
	/*El método find() devuelve el valor del primer elemento 
	del array que cumple la función de prueba proporcionada. 
	En cualquier otro caso se devuelve undefined. */
	let existDataset = function (tag) {
		return (tag.id === calltag);
	};
	return lst.find(existDataset);
}
export const change_type_scale = function(chart,chartControl,localTags){
	let chartC = chartControl['controls'];
	for (let index = 0; index < chart.config.options.scales.yAxes.length; index++) {
		const element = chart.config.options.scales.yAxes[index];
		const calltag = chart.config.options.scales.yAxes[index].id;
		if (chartC.type_scale === 'dynamic') {
			if(localTags[calltag]){
			chart.config.options.scales.yAxes[index].ticks.min = undefined;
			chart.config.options.scales.yAxes[index].ticks.max = undefined;
			chart.config.options.scales.yAxes[index].ticks.beginAtZero = false;
			}
		}else if(chartC.type_scale === 'dynamic_with_0'){
			if(localTags[calltag]){
			chart.config.options.scales.yAxes[index].ticks.min = undefined;
			chart.config.options.scales.yAxes[index].ticks.max = undefined;
			chart.config.options.scales.yAxes[index].ticks.beginAtZero = true;
			}
		}else if(chartC.type_scale === 'static'){
			if(localTags[calltag]){
			chart.config.options.scales.yAxes[index]['ticks']['min'] = localTags[calltag]['min'];
			chart.config.options.scales.yAxes[index]['ticks']['max'] = localTags[calltag]['max'];
			chart.config.options.scales.yAxes[index].ticks.beginAtZero = false;
			}
		}else if(chartC.type_scale === 'static_min'){
			if(localTags[calltag]){
			chart.config.options.scales.yAxes[index]['ticks']['min'] = localTags[calltag]['min'];
			chart.config.options.scales.yAxes[index]['ticks']['max'] = undefined;
			chart.config.options.scales.yAxes[index].ticks.beginAtZero = false;
			}
		}
	}
}
export const change_typa_chart = function(chart, chartControl){
	let chartC = chartControl['controls'];
	chart.config.type = chartC.type_graph;
	switch(chartC.type_graph){
		case "line":
			for (const iterator in chart.data.datasets) {
				chart.data.datasets[iterator]['backgroundColor']=chart.data.datasets[iterator]['rgba'];
			}
		break;
		case "bar":
			for (const iterator in chart.data.datasets) {
				chart.data.datasets[iterator]['backgroundColor']=chart.data.datasets[iterator]['borderColor'];
			}
		break;
	}
}
export const changeFill = function (chart, chartControl){
	let chartC = chartControl['controls'];
	for (const dataset in chart.data.datasets) {
		chart.data.datasets[dataset]['fill'] = chartC.fill;
	}
}
export const change_point_radius = function (chart, chartControl){
	let chartC = chartControl['controls'];
	chart.config.options.elements.point.radius = chartC.point_radius;
}
export const change_data_per_graph = function(chart, chartControl){
	let chartC = chartControl['controls'];
	chart.data.datasets.forEach(function(element) {
		/* Si el "data_per_graph_main" es menor a lo que existe
		*  esto eliminara los elementos del inicio que sobren 
		*  para pintar la grafica 
		*/
		if(chartC.data_per_graph < element.data.length){
			element.data = element.data.slice(
			element.data.length - chartC.data_per_graph
			,element.data.length);
		}
	});
	if(chartC.data_per_graph < chart.data.labels.length){
		chart.data.labels = chart.data.labels.slice(
		chart.data.labels.length - chartC.data_per_graph
		,chart.data.labels.length);
	}
	//chart.data.labels  = new Array(chartC.data_per_graph);
}
export const chart_update = function(chart){
	chart.update();
}
export const generateDataset = function(chartTag,tagconf){
	var hex  = tagconf.color;
	let rgba = this.hexToRGB(tagconf.color,0.3);
	var newDataset = {
		id               : chartTag.calltags,
		rgba             : rgba,
		label            : tagconf.label,
		backgroundColor  : hex,
		borderColor      : hex,
		data             : [chartTag.value()],
		fill             : false,
		hidden           : false,
		yAxisID          : chartTag.calltags
	};
	return newDataset;
}
export const generateYaxis = function(chartTag,tagconf){
	var hex  = tagconf.color;
	var newYaxis = {
		id        : chartTag.calltags,
		display   : true,
		position  : 'left',
		ticks     : {
						fontColor:hex,
						fontSize:12,
						//min: tagconf.min,
						//max: tagconf.max,
						//beginAtZero: false
					},
		gridLines : {
						color:"rgb(52, 58, 64)",
						display: false,
					},
	};
	return newYaxis;
}