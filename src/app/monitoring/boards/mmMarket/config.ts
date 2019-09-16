
var getvalue=function(calltags,plant){
    return this.lstTags;
}
export var listCharts = {
    mmMarket:{
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['overview'][0]['value'];
                }
            },
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value'];
                }
            }
        ],
    }
}
export var lstTags = [];
lstTags['PowerOutput']         = {  label: 'Power Output'          ,min:0  ,max:1200   ,color:'#5d76d3'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgkgYAAAUElUVlxULkxHUy5DRUEuNDY'   ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['HeatRate']            = {  label: 'Heat Rate'             ,min:0  ,max:1200   ,color:'#d9d5fe'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ'    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CapacityFactor']      = {  label: 'Capacity Factor'       ,min:0  ,max:100    ,color:'#c5f327'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA'    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['FuelGain']            = {  label: 'Fuel Gain'             ,min:0  ,max:590    ,color:'#9741f6'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};

