export var listCharts = {
    chart_overview_item01_col01:{
        type:"line",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0;
                }
            },
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0;
                }
            },
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['overview'][0]['value']?lstTags["CapacityFactor"]['overview'][0]['value']:0;
                }
            },
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0;
                }
            }
        ],
    },


    chart_eat_item01_col01:{
        type:"line",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['aguila'][0]['WebTag']?lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0;
                }
            },
        ]
    },

  
    chart_eat_item01_col03:{
        type:"line",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0;
                }
            }
        ]
    },



    chart_est_item01_col01:{
        type:"line",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0;
                }
            },
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0;
                }
            },
        ]
    },


    chart_est_item01_col03:{
        type:"line",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0;
                }
            }  
        ]
    },















    
    chart_overview_item01_col02_col01_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                let fdsfds = lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0;
                let ewqewq = lstTags["PowerOutput"].max;
                //debugger;
                temp.push(lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0);
                temp.push((lstTags["PowerOutput"].max*2)-lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0);
                //*//*
                /*temp.push(Math.random() * (200 - 1) + 1);
                temp.push(Math.random() * (200 - 1) + 1);//*/
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col01_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                let temp = [];
                temp.push((lstTags["HeatRate"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0));
                temp.push((lstTags["HeatRate"].max)-(lstTags["HeatRate"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col01_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                let temp = [];
                temp.push((lstTags["CapacityFactor"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0));
                temp.push(100-(lstTags["CapacityFactor"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col01_it04:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                let temp = [];
                let fdsafdsa = (lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0);
                temp.push((lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0));
                temp.push(lstTags["FuelGain"].max-(lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0));//*/
                /*
                temp.push(Math.random() * (200 - 1) + 1);
                temp.push(Math.random() * (200 - 1) + 1);//*/
                return temp;
                }
            }  
        ]
    },

    chart_overview_item01_col02_col02_it01:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = lstTags["PowerOutput"]['overview'][0]['value']-895.95;
            color = (res) > 0 ? "#46FF33":"red";
        return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0)-895.95);
                temp.push((lstTags["PowerOutput"].max*2)-((lstTags["PowerOutput"]['overview'][0]['value']?lstTags["PowerOutput"]['overview'][0]['value']:0)-895.95));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col02_it02:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
        
            let res = lstTags["HeatRateCorreg"]['overview'][0]['value']-lstTags["HeatRate"]['overview'][0]['value'];
            color = (res) > 0 ? "#46FF33":"red";
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["HeatRateCorreg"]['overview'][0]['value']?lstTags["HeatRateCorreg"]['overview'][0]['value']:0)-(lstTags["HeatRate"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0));
                temp.push(lstTags["HeatRate"].max-((lstTags["HeatRateCorreg"]['overview'][0]['value']?lstTags["HeatRateCorreg"]['overview'][0]['value']:0)-(lstTags["HeatRate"]['overview'][0]['value']?lstTags["HeatRate"]['overview'][0]['value']:0)));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col02_it03:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = lstTags["CapacityFactor"]['overview'][0]['value']- ((89+89)/2);
            color = (res) > 0 ? "#46FF33":"red";
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["CapacityFactor"]['overview'][0]['value']?lstTags["CapacityFactor"]['overview'][0]['value']:0) - ((89+89)/2));
                temp.push(100-((lstTags["CapacityFactor"]['overview'][0]['value']?lstTags["CapacityFactor"]['overview'][0]['value']:0) - ((89+89)/2)));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col02_it04:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = lstTags["FuelGain"]['overview'][0]['value'] - (-0.063879) ;
            color = (res) > 0 ? "#46FF33":"red";
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0) - (-0.063879));
                temp.push(lstTags["FuelGain"].max-((lstTags["FuelGain"]['overview'][0]['value']?lstTags["FuelGain"]['overview'][0]['value']:0) - (-0.063879)));
                return temp;
                }
            }  
        ]
    },

    chart_overview_item01_col02_col03_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(895.95);
                temp.push((lstTags["PowerOutput"].max*2) - (895.95));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col03_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["HeatRateCorreg"]['overview'][0]['value']?lstTags["HeatRateCorreg"]['overview'][0]['value']:0));
                temp.push(lstTags["HeatRate"].max-(lstTags["HeatRateCorreg"]['overview'][0]['value']?lstTags["HeatRateCorreg"]['overview'][0]['value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col03_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(((89+89)/2));
                temp.push(100-((89+89)/2));
                return temp;
                }
            }  
        ]
    },
    chart_overview_item01_col02_col03_it04:{
        type:"doughnut_completo",
        color: function (){let color = "red"; return color;},
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(-0.063879);
                temp.push(lstTags["FuelGain"].max - (-0.063879));
                return temp;
                }
            }  
        ]
    },

    
    chart_eat_item01_col02_col01_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                temp.push((lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["PowerOutput"].max-(lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0));
                //*//*
                /*temp.push(Math.random() * (200 - 1) + 1);
                temp.push(Math.random() * (200 - 1) + 1);//*/
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col01_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                let temp = [];
                temp.push((lstTags["HeatRate"]['aguila'][0]['WebTag']?lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["HeatRate"].max-(lstTags["HeatRate"]['aguila'][0]['WebTag']?lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col01_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                let temp = [];
                temp.push((lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0));
                temp.push(100-(lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col01_it04:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                let temp = [];
                temp.push((lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["FuelGain"].max-(lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },

    chart_eat_item01_col02_col02_it01:{
        type:"doughnut_completo",
        color: function (){let color = "red";
            let res = lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value'] - 438.96 ;
            color = (res) > 0 ? "#46FF33":"red"; 
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0) - 438.96);
                temp.push(lstTags["PowerOutput"].max-((lstTags["PowerOutput"]['aguila'][0]['WebTag']?lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']:0)) - 438.96);
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col02_it02:{
        type:"doughnut_completo",
        color: function (){let color = "red";
        let res = lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']['Value']['Value']-lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value'] ;
        color = (res) > 0 ? "#46FF33":"red";
         return color;},
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                let temp = [];

                let res =     (lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']?lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']['Value']['Value']:0)-(lstTags["HeatRate"]['aguila'][0]['WebTag']?lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value']:0) ;
                if(res > 0 ){
                    temp.push(res);
                    temp.push(lstTags["HeatRate"].max-(res));
                }else{
                    temp.push(res);
                    temp.push(lstTags["HeatRate"].max-(-(res)));
                }

                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col02_it03:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0) - 89;
            color = (res) > 0 ? "#46FF33":"red";
            return color;},
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0) - 89);
                temp.push(100-((lstTags["CapacityFactor"]['aguila'][0]['WebTag']?lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value']:0)) - 89);
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col02_it04:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0) - (-0.246670);
            color = (res) > 0 ? "#46FF33":"red";
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0) - (-0.246670));
                temp.push(lstTags["FuelGain"].max - ((lstTags["FuelGain"]['aguila'][0]['WebTag']?lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']:0)) - (-0.246670));
                return temp;
                }
            }  
        ]
    },

    chart_eat_item01_col02_col03_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(440.55);
                temp.push(lstTags["PowerOutput"].max-440.55);
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col03_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']?lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["HeatRate"].max-(lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']?lstTags["HeatRateCorreg"]['aguila'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col03_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(89);
                temp.push(100-89);
                return temp;
                }
            }  
        ]
    },
    chart_eat_item01_col02_col03_it04:{
        type:"doughnut_completo",
        color: function (){let color = "red"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(-0.246670);
                temp.push(lstTags["FuelGain"].max - (-0.246670) );
                return temp;
                }
            }  
        ]
    },


    chart_est_item01_col02_col01_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                temp.push(lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0);
                temp.push(lstTags["PowerOutput"].max-lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0);
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col01_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                let temp = [];
                temp.push(lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0);
                temp.push(lstTags["HeatRate"].max-lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0);
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col01_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                let temp = [];
                temp.push(lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0);
                temp.push(100-(lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col01_it04:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                let temp = [];
                temp.push(lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0);
                temp.push(lstTags["FuelGain"].max -(lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col02_it01:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0) - (455.4) ;
            color = (res > 0 ) ? "#46FF33":"red"; 
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0) - (455.4)  );
                temp.push((lstTags["PowerOutput"].max-(lstTags["PowerOutput"]['sol'][0]['WebTag']?lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value']:0) - (455.4) ) );
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col02_it02:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["HeatRateCorreg"]['sol'][0]['WebTag']?lstTags["HeatRateCorreg"]['sol'][0]['WebTag']['Value']['Value']:0)-(lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0);
            color = (res) > 0 ? "#46FF33":"red"; 
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["HeatRateCorreg"]['sol'][0]['WebTag']?lstTags["HeatRateCorreg"]['sol'][0]['WebTag']['Value']['Value']:0)-(lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["HeatRate"].max-( (lstTags["HeatRateCorreg"]['sol'][0]['WebTag']?lstTags["HeatRateCorreg"]['sol'][0]['WebTag']['Value']['Value']:0)-(lstTags["HeatRate"]['sol'][0]['WebTag']?lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value']:0)));
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col02_it03:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0)  - 89;
            color = (res) > 0 ? "#46FF33":"red"; 
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0)  - 89 );
                temp.push(100-((lstTags["CapacityFactor"]['sol'][0]['WebTag']?lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value']:0) - 89)  );
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col02_it04:{
        type:"doughnut_completo",
        color: function (){let color = "red"; 
            let res = (lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0) - 0.182791 ;
            color = (res) > 0 ? "#46FF33":"red"; 
            return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0) - 0.182791   );
                temp.push(lstTags["FuelGain"].max -((lstTags["FuelGain"]['sol'][0]['WebTag']?lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value']:0) - 0.182791)   );
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col03_it01:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(455.4);
                temp.push(lstTags["PowerOutput"].max-455.4);
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col03_it02:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push((lstTags["HeatRateCorreg"]['sol'][0]['WebTag']?lstTags["HeatRateCorreg"]['sol'][0]['WebTag']['Value']['Value']:0));
                temp.push(lstTags["HeatRate"].max-(lstTags["HeatRateCorreg"]['sol'][0]['WebTag']?lstTags["HeatRateCorreg"]['sol'][0]['WebTag']['Value']['Value']:0));
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col03_it03:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                let temp = [];
                /*temp.push(lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(89);
                temp.push(100-89);
                return temp;
                }
            }  
        ]
    },
    chart_est_item01_col02_col03_it04:{
        type:"doughnut_completo",
        color: function(){let color = "#46FF33"; return color;},
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                let temp = [];
                /*temp.push(lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']);
                temp.push(10000-lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value']);
                //*/
                temp.push(0.182791);
                temp.push(lstTags["FuelGain"].max - 0.182791);
                return temp;
                }
            }  
        ]
    },


    
}
export var lstTags = [];
lstTags['PowerOutput']         = {  label: 'Power Output'          ,min:0  ,max:590     ,color:'#c5f327'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'     ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['HeatRate']            = {  label: 'Heat Rate'             ,min:0  ,max:14000   ,color:'#d9d5fe'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'     ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['HeatRateCorreg']      = {  label: 'Heat Rate Correg'      ,min:0  ,max:14000   ,color:'#d9d5fe'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGSUAAAU0VSVklET1JfUElcREFBMDgxMDQ',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgJA0AAAUElUVlxMR1MuQ0VBLjcx'     ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoDiesel']         = {  label: 'RT-1 - Diesel'         ,min:0  ,max:50000   ,color:'#ff526a'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc',WebTag:null}]  ,sol:[{WebId:null                                                       ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosDiesel']         = {  label: 'RT-2 - Diesel'         ,min:0  ,max:50000   ,color:'#FFFF00'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc',WebTag:null}]  ,sol:[{WebId:null                                                       ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};


lstTags['CapacityFactor']      = {  label: 'Capacity Factor'       ,min:0  ,max:100    ,color:'#c5f327'  ,aguila:[{WebId:null,WebTag:null}]  ,sol:[{WebId:null    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['FuelGain']            = {  label: 'Fuel Gain'             ,min:0  ,max:1      ,color:'#9741f6'  ,aguila:[{WebId:null,WebTag:null}]  ,sol:[{WebId:null    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
