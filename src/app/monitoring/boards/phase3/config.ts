export var listCharts = {
  canvas1: {
      type:"line",
      tags: [
        {localId:"getTemperaturaAmbiente", initHiddenInChart:true},
        {localId:"getPresionAtmosferica", initHiddenInChart:true},
        {localId:"gethumedad", initHiddenInChart:true},
        {localId:"getPotenciaNeta", initHiddenInChart:false},
        {localId:"getPotenciaCCDV", initHiddenInChart:false},
        {localId:"getRegimenTermico", initHiddenInChart:false},
        {localId:"getCTUnoGas", initHiddenInChart:true},
        {localId:"getCTUnoDiesel", initHiddenInChart:true},
        {localId:"getCTUnoRT", initHiddenInChart:true},
        {localId:"getCTUnoMW", initHiddenInChart:true},
        {localId:"getCTUnoRPM", initHiddenInChart:true},
        {localId:"getCTDosGas", initHiddenInChart:true},
        {localId:"getCTDosDiesel", initHiddenInChart:true},
        {localId:"getCTDosRT", initHiddenInChart:true},
        {localId:"getCTDosMW", initHiddenInChart:true},
        {localId:"getCTDosRPM", initHiddenInChart:true},
        {localId:"getTVRT", initHiddenInChart:true},
        {localId:"getTVMW", initHiddenInChart:true},
        {localId:"getTVRPM", initHiddenInChart:true},
      ]
  },
  /*
  canvas2tester: {
    type:"line",
    tags: [
      {localId:"getTemperaturaAmbiente", initHiddenInChart:false},
    ]
  }//*/
}

export const lstTags = [];

lstTags['getTemperaturaAmbiente']         = {  
  label: 'Temperatura ambiente'          
  ,min:0  
  ,max:590     
  ,color:'#c5f327'  
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE',data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgxwMAAAUElUVlxULkNFQS4yMjQ1'     ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getPresionAtmosferica']  = {  calltags:'getPresionAtmosferica'   ,typadata:'int'    ,label: 'Presión atmosférica '  ,min:0  ,max:1200   ,color:'#d9d5fe'
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ'    ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['gethumedad']             = {  calltags:'gethumedad'              ,typadata:'int'    ,label: 'Humedad'               ,min:0  ,max:100    ,color:'#c5f327'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA'    ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getPotenciaNeta']        = {  calltags:'getPotenciaNeta'         ,typadata:'float'  ,label: 'Potencia Neta'         ,min:0  ,max:590    ,color:'#5d76d3'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getPotenciaCCDV']        = {  calltags:'getPotenciaCCDV'         ,typadata:'float'  ,label: 'Potencia CCDV'         ,min:0  ,max:590    ,color:'#9741f6'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getRegimenTermico']      = {  calltags:'getRegimenTermico'       ,typadata:'int'    ,label: 'Régimen térmico'       ,min:0  ,max:14000  ,color:'#4cc900'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'   ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTUnoGas']            = {  calltags:'getCTUnoGas'             ,typadata:'int'    ,label: 'RT-1 - Gas'            ,min:0  ,max:50000  ,color:'#CCFF00'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx'  ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTUnoDiesel']         = {  calltags:'getCTUnoDiesel'          ,typadata:'float'  ,label: 'RT-1 - Diesel'         ,min:0  ,max:50000  ,color:'#ff526a'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc' ,data:null, active:true}]
  ,sol      : [{WebId:null                                                     ,data:null, active:false}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTUnoRT']             = {  calltags:'getCTUnoRT'              ,typadata:'int'    ,label: 'RT-1 - RT'             ,min:0  ,max:14000  ,color:'#FF0000'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTUnoMW']             = {  calltags:'getCTUnoMW'              ,typadata:'float'  ,label: 'RT-1 - MW'             ,min:0  ,max:200    ,color:'#FFA500'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx'  ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTUnoRPM']            = {  calltags:'getCTUnoRPM'             ,typadata:'int'    ,label: 'RT-1 - RPM'            ,min:0  ,max:4150   ,color:'#FFC0CB'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE'   ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTDosGas']            = {  calltags:'getCTDosGas'             ,typadata:'int'    ,label: 'RT-2 - Gas'            ,min:0  ,max:50000  ,color:'#008000'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx'  ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTDosDiesel']         = {  calltags:'getCTDosDiesel'          ,typadata:'float'  ,label: 'RT-2 - Diesel'         ,min:0  ,max:50000  ,color:'#FFFF00'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc' ,data:null, active:true}]
  ,sol      : [{WebId:null                                                     ,data:null, active:false}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTDosRT']             = {  calltags:'getCTDosRT'              ,typadata:'int'    ,label: 'RT-2 - RT'             ,min:0  ,max:14000  ,color:'#0000FF'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTDosMW']             = {  calltags:'getCTDosMW'              ,typadata:'float'  ,label: 'RT-2 - MW'             ,min:0  ,max:200    ,color:'#FFFFFF'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx'  ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getCTDosRPM']            = {  calltags:'getCTDosRPM'             ,typadata:'int'    ,label: 'RT-2 - RPM'            ,min:0  ,max:4150   ,color:'#FFCC99'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE'   ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getTVRT']                = {  calltags:'getTVRT'                 ,typadata:'int'    ,label: 'TV - RT'               ,min:0  ,max:14000  ,color:'#CCFFFF'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getTVMW']                = {  calltags:'getTVMW'                 ,typadata:'float'  ,label: 'TV - MW'               ,min:0  ,max:250    ,color:'#CC3300'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0'      ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
lstTags['getTVRPM']               = {  calltags:'getTVRPM'                ,typadata:'int'    ,label: 'TV - RPM'              ,min:0  ,max:4150   ,color:'#99CC99'   
  ,aguila   : [{WebId:'P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE' ,data:null, active:true}]
  ,sol      : [{WebId:'F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0'          ,data:null, active:true}]
  ,overview : [{value:null,timestamp:null}]
};
