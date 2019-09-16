export var listCharts = {
    chart_overview_item01_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['overview'][0]['value'];
                }
            }
        ],
    },
    chart_overview_item02_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['overview'][0]['value'];
                }
            }
        ],
    },
    chart_overview_item03_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['overview'][0]['value'];
                }
            }
        ],
    },
    chart_overview_item04_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['overview'][0]['value'];
                }
            }
        ],
    },

    chart_eat_item01_col01:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['aguila'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_eat_item02_col01:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['aguila'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_eat_item03_col01:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['aguila'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_eat_item04_col01:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['aguila'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_eat_item01_col03:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_eat_item02_col03:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_eat_item03_col03:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_eat_item04_col03:{
        plant:"aguila",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },

    chart_est_item01_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PowerOutput",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_est_item02_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"HeatRate",value:function(){
                return lstTags["HeatRate"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_est_item03_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"CapacityFactor",value:function(){
                return lstTags["CapacityFactor"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_est_item04_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"FuelGain",value:function(){
                return lstTags["FuelGain"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
        ]
    },
    chart_est_item01_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_est_item02_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_est_item03_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    },
    chart_est_item04_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {calltags:"PotenciaCCDV",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },
            {calltags:"CTUnoRPM",value:function(){
                return lstTags["PowerOutput"]['sol'][0]['WebTag']['Value']['Value'];
                }
            },    
        ]
    }
}
export var lstTags = [];
lstTags['PowerOutput']         = {  label: 'Power Output'          ,min:0  ,max:1200   ,color:'#5d76d3'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgkgYAAAUElUVlxULkxHUy5DRUEuNDY'   ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['HeatRate']            = {  label: 'Heat Rate'             ,min:0  ,max:1200   ,color:'#d9d5fe'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ'    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CapacityFactor']      = {  label: 'Capacity Factor'       ,min:0  ,max:100    ,color:'#c5f327'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA'    ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['FuelGain']            = {  label: 'Fuel Gain'             ,min:0  ,max:590    ,color:'#9741f6'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};

lstTags['PotenciaCCDV']        = {  label: 'Potencia CCDV'         ,min:0  ,max:590    ,color:'#9741f6'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['RegimenTermico']      = {  label: 'Régimen térmico'       ,min:0  ,max:14000  ,color:'#4cc900'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgkgYAAAUElUVlxULkxHUy5DRUEuNDY'   ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoGas']            = {  label: 'RT-1 - Gas'            ,min:0  ,max:50000  ,color:'#CCFF00'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx'  ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoDiesel']         = {  label: 'RT-1 - Diesel'         ,min:0  ,max:50000  ,color:'#ff526a'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc',WebTag:null}]  ,sol:[{WebId: null                                                       ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoRT']             = {  label: 'RT-1 - RT'             ,min:0  ,max:14000  ,color:'#FF0000'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoMW']             = {  label: 'RT-1 - MW'             ,min:0  ,max:200    ,color:'#FFA500'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx'  ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTUnoRPM']            = {  label: 'RT-1 - RPM'            ,min:0  ,max:4150   ,color:'#FFC0CB'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE'   ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosGas']            = {  label: 'RT-2 - Gas'            ,min:0  ,max:50000  ,color:'#008000'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx'  ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosDiesel']         = {  label: 'RT-2 - Diesel'         ,min:0  ,max:50000  ,color:'#FFFF00'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc',WebTag:null}]  ,sol:[{WebId:   null                                                     ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosRT']             = {  label: 'RT-2 - RT'             ,min:0  ,max:14000  ,color:'#0000FF'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosMW']             = {  label: 'RT-2 - MW'             ,min:0  ,max:200    ,color:'#FFFFFF'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx'  ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['CTDosRPM']            = {  label: 'RT-2 - RPM'            ,min:0  ,max:4150   ,color:'#FFCC99'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE'   ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['TVRT']                = {  label: 'TV - RT'               ,min:0  ,max:14000  ,color:'#CCFFFF'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['TVMW']                = {  label: 'TV - MW'               ,min:0  ,max:250    ,color:'#CC3300'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0'      ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
lstTags['TVRPM']               = {  label: 'TV - RPM'              ,min:0  ,max:4150   ,color:'#99CC99'  ,aguila:[{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE',WebTag:null}]  ,sol:[{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0'          ,WebTag:null}]  ,overview:[{value:null,timestamp:null}]};
//*/