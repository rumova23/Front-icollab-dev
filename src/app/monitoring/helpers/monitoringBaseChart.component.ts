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
export const generateColorHEX = function(calltag){
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
export const chartCreateConfig = function (){
	return {
	type: 'horizontalBar'
	,data: {
		//labels: new Array(this.data_per_graph_main)
		labels: ["k1","k2",'k3','k4']
		,datasets: []
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
			},
			rectangle: {
			  borderWidth: 2,
			}
		},
		legend: {
			display: true,
			labels:{
				fontColor: 'red',
				fontSize:12,
				usePointStyle:true,
			}
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
						beginAtZero: false,
						//suggestedMin:9000
					}
				}
			]
			,yAxes: [
				{
					type: 'linear', 
					display: true,
					position: 'left',
					id: 'my887896',
					ticks:{
						//min: 0,
						//max: 1,
						//suggestedMin:9000
						beginAtZero: false  
					},
				}
			],
		}
	}
	};
}