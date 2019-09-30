export const algo= {};
export const generateColorHEX = function(calltag){
    let generarLetra = function(){
        var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero = (Math.random()*15).toFixed(0);
        return letras[numero];
    }
    switch(calltag) {
        
        default:
        var coolor = "";
        for(var i=0;i<6;i++){
            coolor = coolor + generarLetra() ;
        }
        return "#" + coolor;
    }
}
export const lstTags = [];
lstTags['getTemperaturaAmbiente'] = {  calltags:'getTemperaturaAmbiente'  ,typadata:'float'  ,label: 'Temperatura ambiente'  ,min:0  ,max:100    ,color:'#ecec1b'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgxwMAAAUElUVlxULkNFQS4yMjQ1'      };
lstTags['getPresionAtmosferica']  = {  calltags:'getPresionAtmosferica'   ,typadata:'int'    ,label: 'Presión atmosférica '  ,min:0  ,max:1200   ,color:'#d9d5fe'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ'    };
lstTags['gethumedad']             = {  calltags:'gethumedad'              ,typadata:'int'    ,label: 'Humedad'               ,min:0  ,max:100    ,color:'#c5f327'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA'    };
lstTags['getPotenciaNeta']        = {  calltags:'getPotenciaNeta'         ,typadata:'float'  ,label: 'Potencia Neta'         ,min:0  ,max:590    ,color:'#5d76d3'  ,id_EAT:0  ,webId_EAT:'P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'   ,id_EST:0   ,webId_EST:'F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      };
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

export const chart_config_rt = {
    type: 'horizontalBar'
    ,data: {
      labels: ['RT']
      ,datasets: []
    }
    ,options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        display: true,
        labels:{
            fontColor: '#fff',
            fontSize:12,
            usePointStyle:true,
        }
      }
      ,scales: {
        xAxes: [{
          gridLines:{
            color:"rgba(0,255,0,1)",
            display: false,
          },
          ticks:{
            fontColor:'#fff',
            fontSize:12,
            beginAtZero: false,
            //suggestedMin:9000
          }
        }]
        ,yAxes: [{
        
            gridLines:{
              color:"rgba(0,255,0,1)",
              display: false
            },
            ticks:{
              fontColor:'#fff',
              fontSize:12,
            }
          }
        ],
      }
    }
};
export const chart_config_rpm = {
    type: 'horizontalBar'
    ,data: {
      labels: ['RPM']
      ,datasets: []
    }
    ,options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        display: true,
        labels:{
            fontColor: '#fff',
            fontSize:14,
            usePointStyle:true,
        }
      }
      ,scales: {
        xAxes: [{
          gridLines:{
            color:"rgba(0,255,0,1)",
            display: false,
          },
          ticks:{
            fontColor:'#fff',
            fontSize:12,
          }
        }]
        ,yAxes: [{
        
            gridLines:{
              color:"rgba(0,255,0,1)",
              display: false,
            },
            ticks:{
              fontColor:'#fff',
              fontSize:12
            }
          }
        ],
      }
    }
};
export const chart_config_mw = {
    type: 'horizontalBar'
    ,data: {
      labels: ['MW']
      ,datasets: []
    }
    ,options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        display: true,
        labels:{
            fontColor: '#fff',
            fontSize:14,
            usePointStyle:true,
        }
      }
      ,scales: {
        xAxes: [{
          gridLines:{
            color:"rgba(0,255,0,1)",
            display: false,
          },
          ticks:{
            fontColor:'#fff',
            fontSize:12,
            //suggestedMin:9000
          }
        }]
        ,yAxes: [{
        
            gridLines:{
              color:"rgba(0,255,0,1)",
              display: false,
            },
            ticks:{
              fontColor:'#fff',
              fontSize:12
            }
          }
        ],
      }
    }
};
export const chart_config_rt_t1 = {
    type: 'line'
    ,data: {
      labels: new Array(10)
      ,datasets: []
    }
    ,options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        display: true,
        labels:{
            fontColor: '#fff',
            fontSize:14,
            usePointStyle:true,
        }
      }
      ,scales: {
        xAxes: [{
          gridLines:{
            color:"rgba(0,255,0,1)",
          },
          ticks:{
            fontColor:'#fff',
            fontSize:12
          }
        }]
        ,yAxes: [{
        
            gridLines:{
              color:"rgba(0,255,0,1)",
              display: false,
            },
            ticks:{
              fontColor:'#fff',
              fontSize:12,
              //suggestedMin:9000
            }
          }
        ],
      }
    }
};

export const language = {
  es:{
      "TITULO_BIENVENIDO" : "Bienvenido"
     ,"TITULO_INTRODUZCA" : "Introduzca sus credenciales de acceso"
     ,"TITULO_USUARIO"    : "Usuario"
     ,"TITULO_CONTRASENA" : "Contraseña"
     ,"TITULO_ACCEDER"    : "Acceder"
     ,"BUSCAR" : "Buscar ..."
     ,"TITULO_PRINCIPAL" : "Prototipo"
     ,"TITULO_CONDICIONES" : "CONDICIONES AMBIENTALES"
     ,"TITULO_PARAMETROS_GRALES" : "PARAMETROS PRINCIPALES DE GENERACIÓN"
     ,"TITULO_POTENCIA" : "Potencia Neta"
     ,"TITULO_POTENCIA_CCDV" : "Potencia CCDV"
     ,"TITULO_VELOCIDAD_CALENTAMIENTO" : "Régimen Térmico"
     ,"TITULO_APAGAR" : "Apagar"
     ,"TITULO_CT"     : "CT-"
     ,"TITULO_TV"     : "TV"
     ,"TITULO_GAS"    : "Gas"
     ,"TITULO_DIESEL" : "Diesel"
     ,"TITULO_HR"     : "RT"
     ,"NAV_IZQ_TITULO": "Monitoreo fase 3"
     ,"OFFLINE"       : "Desconectado"
     ,"ONLINE"        : "Conectado"
     ,"TITULO": "Perfil"
     ,"CERRAR": "Cerrar"
     ,"VACIAR_GRAFICA":"Vaciar gráfica"
     ,"VER_LISTA_TAGS":"Ver lista de tags"
     ,"CANTIDAD_DATOS":"Cantidad de datos"
     ,"SEGUNDOS":"Segundos"
     ,"TIPO":"Tipo"
     ,"LINEAS":"Lineas"
     ,"BARRAS":"Barras"
     ,"TAMANO_PUNTO":"Tamaño punto"

     ,"TIPO_FONDO":"Tipo del fondo"
     ,"NINGUNO":"Ninguno"
     ,"INICIO":"Inicio"
     ,"ORIGEN":"Origen"
     ,"FINAL":"Final"
     ,"ESCALAS":"Escala"
     ,"DINAMICAS":"Dinámica"
     ,"INCLUIR_CERO":"Incluir el 0"
     ,"ESTATICA":"Estática"
     ,"SOLO_BASE_ESTATICA":"Base estática"
     ,"ACTUALIZAR":"Actualizar"
     ,"TITULO_MW":"Potencia"
  },
  en:{
      "TITULO_BIENVENIDO" : "Welcome"
     ,"TITULO_INTRODUZCA" : "Enter your access credentials"
     ,"TITULO_USUARIO"    : "User"
     ,"TITULO_CONTRASENA" : "Password"
     ,"TITULO_ACCEDER"    : "Login"
     ,"BUSCAR" : "Search ..."
     ,"TITULO_PRINCIPAL" : "Prototype"
     ,"TITULO_CONDICIONES" : "ENVIRONMENTAL CONDITIONS"    
     ,"TITULO_PARAMETROS_GRALES" : "MAIN PARAMETERS OF GENERATION"
     ,"TITULO_POTENCIA" : "Net Power"
     ,"TITULO_POTENCIA_CCDV" : "Power CCDV"
     ,"TITULO_VELOCIDAD_CALENTAMIENTO" : "Heat rate"
     ,"TITULO_APAGAR" : "Shutdown"
     ,"TITULO_CT"     : "CT-"
     ,"TITULO_TV"     : "TV"   
     ,"TITULO_GAS"    : "Gas"
     ,"TITULO_DIESEL" : "Diesel"
     ,"TITULO_HR"     : "HR"  
     ,"NAV_IZQ_TITULO": "Phase 3 monitoring"  
     ,"OFFLINE"       : "Off Line"
     ,"ONLINE"        : "On Line"
     ,"TITULO": "Profile"
     ,"CERRAR": "Close"
     ,"VACIAR_GRAFICA":"Empty chart"
     ,"VER_LISTA_TAGS":"See tag list"
     ,"CANTIDAD_DATOS":"Amount of data"
     ,"SEGUNDOS":"Seconds"
     ,"TIPO":"Kind"
     ,"LINEAS":"Lines"
     ,"BARRAS":"Bars"
     ,"TAMANO_PUNTO":"Spot size"
     
     ,"TIPO_FONDO":"Fund Type"
     ,"NINGUNO":"None"
     ,"INICIO":"Start"
     ,"ORIGEN":"Origin"
     ,"FINAL":"Final"
     ,"ESCALAS":"Scale"
     ,"DINAMICAS":"Dynamic"
     ,"INCLUIR_CERO":"Include 0"
     ,"ESTATICA":"Static"
     ,"SOLO_BASE_ESTATICA":"Static base"
     ,"ACTUALIZAR":"To update"
     ,"TITULO_MW":"Power"
  },
  ja:{
      "TITULO_BIENVENIDO" : "ようこそ"
     ,"TITULO_INTRODUZCA" : "ユーザー名とパスワードをご入力ください"
     ,"TITULO_USUARIO"    : "ユーザー名"
     ,"TITULO_CONTRASENA" : "パスワード"
     ,"TITULO_ACCEDER"    : "ログイン"
     ,"BUSCAR" : "Buscar ..."
     ,"TITULO_PRINCIPAL" : "Prototipo"
     ,"TITULO_CONDICIONES" : "外部環境"
     ,"TITULO_PARAMETROS_GRALES" : "発電主要パラメーター"
     ,"TITULO_POTENCIA" : "純電力"
     ,"TITULO_POTENCIA_CCDV" : "PPA補正出力"
     ,"TITULO_VELOCIDAD_CALENTAMIENTO" : "ヒートレート"
     ,"TITULO_APAGAR" : "シャットダウン"
     ,"TITULO_CT"     : "ガスタービン"
     ,"TITULO_TV"     : "蒸気タービン"
     ,"TITULO_GAS"    : "ガス"
     ,"TITULO_DIESEL" : "ディーゼル"
     ,"TITULO_HR"     : "ヒートレート"
     ,"NAV_IZQ_TITULO": "フェーズ3モニタリング"  
     ,"OFFLINE"       : "オフライン"
     ,"ONLINE"        : "オンライン"
     ,"TITULO": "Perfil"
     ,"CERRAR": "閉じる"
     ,"VACIAR_GRAFICA":"空のグラフィック"
     ,"VER_LISTA_TAGS":"タグリストを見る"
     ,"CANTIDAD_DATOS":"データ量"
     ,"SEGUNDOS":"秒"
     ,"TIPO":"種類"
     ,"LINEAS":"行"
     ,"BARRAS":"ロッド"
     ,"TAMANO_PUNTO":"スポットサイズ"
     
     ,"TIPO_FONDO":"ファンドの種類"
     ,"NINGUNO":"なし"
     ,"INICIO":"ホーム"
     ,"ORIGEN":"起源"
     ,"FINAL":"ファイナル"
     ,"ESCALAS":"スケール"
     ,"DINAMICAS":"ダイナミック"
     ,"INCLUIR_CERO":"0を含める"
     ,"ESTATICA":"静的"
     ,"SOLO_BASE_ESTATICA":"静的ベース"
     ,"ACTUALIZAR":"更新する"
     ,"TITULO_MW":"効能"
  }
}