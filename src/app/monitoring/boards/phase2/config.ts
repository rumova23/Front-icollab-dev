
export var listCharts = {
    chart_overview_item01_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPowerOutput"},
        ],
    },
    chart_overview_item01_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPotenciaCCDV"},
            {webId:null ,value:null ,timestamp:null ,calltags:"getCTUnoRPM"},    
        ],
    },
    chart_eat_item01_col01:{
        plant:"aguila",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPowerOutput"},
        ],
    },
    chart_eat_item01_col03:{
        plant:"aguila",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPotenciaCCDV"},
            {webId:null ,value:null ,timestamp:null ,calltags:"getCTUnoRPM"},    
        ],
    },
    chart_est_item01_col01:{
        plant:"sol",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPowerOutput"},
        ],
    },
    chart_est_item01_col03:{
        plant:"sol",
        controls:{},
        tags:[
            {webId:null ,value:null ,timestamp:null ,calltags:"getPotenciaCCDV"},
            {webId:null ,value:null ,timestamp:null ,calltags:"getCTUnoRPM"},    
        ],
    }
}
export const lstTags = [];
lstTags['getPowerOutput']         = {  calltags:'getPowerOutput'          ,typadata:'float'  ,label: 'Power Output'          ,min:0  ,max:1200   ,color:'#5d76d3'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgkgYAAAUElUVlxULkxHUy5DRUEuNDY'      };
lstTags['getPresionAtmosferica']  = {  calltags:'getPresionAtmosferica'   ,typadata:'int'    ,label: 'Presión atmosférica '  ,min:0  ,max:1200   ,color:'#d9d5fe'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ'    };
lstTags['gethumedad']             = {  calltags:'gethumedad'              ,typadata:'int'    ,label: 'Humedad'               ,min:0  ,max:100    ,color:'#c5f327'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA'    };
lstTags['getPotenciaNeta']        = {  calltags:'getPotenciaNeta'         ,typadata:'float'  ,label: 'Potencia Neta'         ,min:0  ,max:590    ,color:'#4s16d3'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      };
lstTags['getPotenciaCCDV']        = {  calltags:'getPotenciaCCDV'         ,typadata:'float'  ,label: 'Potencia CCDV'         ,min:0  ,max:590    ,color:'#9741f6'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy'      };
lstTags['getRegimenTermico']      = {  calltags:'getRegimenTermico'       ,typadata:'int'    ,label: 'Régimen térmico'       ,min:0  ,max:14000  ,color:'#4cc900'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgkgYAAAUElUVlxULkxHUy5DRUEuNDY'   };
lstTags['getCTUnoGas']            = {  calltags:'getCTUnoGas'             ,typadata:'int'    ,label: 'RT-1 - Gas'            ,min:0  ,max:50000  ,color:'#CCFF00'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx'  };
lstTags['getCTUnoDiesel']         = {  calltags:'getCTUnoDiesel'          ,typadata:'float'  ,label: 'RT-1 - Diesel'         ,min:0  ,max:50000  ,color:'#ff526a'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc'   ,id_EST:0   ,webId_EST:'ERROR'                                                     };
lstTags['getCTUnoRT']             = {  calltags:'getCTUnoRT'              ,typadata:'int'    ,label: 'RT-1 - RT'             ,min:0  ,max:14000  ,color:'#FF0000'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx'      };
lstTags['getCTUnoMW']             = {  calltags:'getCTUnoMW'              ,typadata:'float'  ,label: 'RT-1 - MW'             ,min:0  ,max:200    ,color:'#FFA500'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx'  };
lstTags['getCTUnoRPM']            = {  calltags:'getCTUnoRPM'             ,typadata:'int'    ,label: 'RT-1 - RPM'            ,min:0  ,max:4150   ,color:'#FFC0CB'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE'   };
lstTags['getCTDosGas']            = {  calltags:'getCTDosGas'             ,typadata:'int'    ,label: 'RT-2 - Gas'            ,min:0  ,max:50000  ,color:'#008000'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx'  };
lstTags['getCTDosDiesel']         = {  calltags:'getCTDosDiesel'          ,typadata:'float'  ,label: 'RT-2 - Diesel'         ,min:0  ,max:50000  ,color:'#FFFF00'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc'   ,id_EST:0   ,webId_EST:'ERROR'                                                     };
lstTags['getCTDosRT']             = {  calltags:'getCTDosRT'              ,typadata:'int'    ,label: 'RT-2 - RT'             ,min:0  ,max:14000  ,color:'#0000FF'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy'      };
lstTags['getCTDosMW']             = {  calltags:'getCTDosMW'              ,typadata:'float'  ,label: 'RT-2 - MW'             ,min:0  ,max:200    ,color:'#FFFFFF'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx'  };
lstTags['getCTDosRPM']            = {  calltags:'getCTDosRPM'             ,typadata:'int'    ,label: 'RT-2 - RPM'            ,min:0  ,max:4150   ,color:'#FFCC99'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE'   };
lstTags['getTVRT']                = {  calltags:'getTVRT'                 ,typadata:'int'    ,label: 'TV - RT'               ,min:0  ,max:14000  ,color:'#CCFFFF'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz'      };
lstTags['getTVMW']                = {  calltags:'getTVMW'                 ,typadata:'float'  ,label: 'TV - MW'               ,min:0  ,max:250    ,color:'#CC3300'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0'      };
lstTags['getTVRPM']               = {  calltags:'getTVRPM'                ,typadata:'int'    ,label: 'TV - RPM'              ,min:0  ,max:4150   ,color:'#99CC99'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0'          };
