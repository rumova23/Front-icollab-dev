import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import { Observable, interval, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-phase2v1',
  templateUrl: './phase2v1.component.html',
  styleUrls: ['./phase2v1.component.scss']
})
export class Phase2v1Component implements OnInit {
  
  public value$: Observable<number>;
  public value2$: Observable<number>;
  public valueGas$: Observable<number>;
   

  LineChart=[];

  chart: any;
  constructor( private router:Router) { 


  }


reordenaElementos(){

  var Contenedor1 = document.getElementById("ContenedorPrimario");




  var SubContenedor1 = +document.getElementById("Contendor1Gas").clientHeight;

  var SubContenedor2 = +document.getElementById("graf1tank").clientHeight;
  var SubContenedor3 = +document.getElementById("graf2tank").clientHeight;

  SubContenedor1=(SubContenedor1/100)*60;


  SubContenedor2=(SubContenedor2/100)*90;
  SubContenedor3=(SubContenedor3/100)*90; 

       


       var ctx = document.getElementById("Gdr1");
       ctx.setAttribute("width",SubContenedor1.toString());
       ctx.setAttribute("height", SubContenedor1.toString());
       var ctx2 = document.getElementById("Gdr2");
       ctx2.setAttribute("width", SubContenedor1.toString());
       ctx2.setAttribute("height", SubContenedor1.toString());
       var ctx3 = document.getElementById("GasTankId");
       ctx3.setAttribute("width", SubContenedor2.toString());
       ctx3.setAttribute("height", SubContenedor2.toString());


       var ctx4 = document.getElementById("GasTankId2");
       ctx4.setAttribute("width", SubContenedor3.toString());
       ctx4.setAttribute("height", SubContenedor3.toString());

       if(Contenedor1.clientWidth<768)
       {
   
        var ctx = document.getElementById("Gdr1");
        ctx.setAttribute("width","100");
        ctx.setAttribute("height", "100");
        var ctx2 = document.getElementById("Gdr2");
        ctx2.setAttribute("width","100");
        ctx2.setAttribute("height","100");
   
   
        var ctx3 = document.getElementById("GasTankId");
        ctx3.setAttribute("width", "140");
        ctx3.setAttribute("height", "140");
   
        var ctx4 = document.getElementById("GasTankId2");
        ctx4.setAttribute("width", "140");
        ctx4.setAttribute("height", "140");
   
       }

}

  onResize(event) {
   this.reordenaElementos();
  }


  



  public navigateToTest() {
    this.router.navigateByUrl('/secundario');
  }
  ngOnInit() {


    this.reordenaElementos();



    this.chart = new Chart('dona12Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.chart = new Chart('dona13Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
         responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });

//row2
    this.chart = new Chart('dona22Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.chart = new Chart('dona23Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
//row3
    this.chart = new Chart('dona32Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.chart = new Chart('dona33Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
//Row4
    this.chart = new Chart('dona42Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.chart = new Chart('dona43Char', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#90FF33','#C0D8B6'],
            fill: false
          },
        ],
        responsive: true,
      },
      options: {
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        datasets: [{
            data: [6, 6, 7, 10, 7, 6],
            fill:false,
            lineTension:0.2,
            borderColor:"#9bc9ec",
            borderWidth: 1
        }, {
            data: [5, 5, 5, 5, 5, 5],
            fill:false,
            lineTension:0.2,
            borderColor:"#9f8ac1",
            borderWidth: 1
        }, {
          data: [5, 4,2, 1, 3, 5],
          fill:false,
          lineTension:0.2,
          borderColor:"#b0d56f",
          borderWidth: 1
      },{
        data: [3, 4,2, 1, 4, 4],
        fill:false,
        lineTension:0.2,
        borderColor:"#F9E79F",
        borderWidth: 1
    } ],
        labels: ['10:43', '10:43', '10:43', '10:43', '10:43', '10:43'],
        animation: true,
        animationSteps: 100,
        animationEasing: "easeOutQuart",
        scaleFontSize: 16,
        responsive: true,
        showTooltip: true,
      
        scaleShowGridLines : false,
        bezierCurve : true,
        pointDotRadius : 5,

     
    },
    options: {
      legend: {
        display: false
      },
      tooltips:{
        enabled:false
      }
      }
    });

    this.value$ = interval(1000).pipe(
      map(() => 100)
    );

    this.value2$ = interval(1000).pipe(
      map(() => 80)
    );



////GRAFICA2///

this.chart = new Chart('dona12Char2', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
this.chart = new Chart('dona13Char2', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});

//row2
this.chart = new Chart('dona22Char2', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
this.chart = new Chart('dona23Char2', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
//row3
this.chart = new Chart('dona32Char2', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
this.chart = new Chart('dona33Char2', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
//Row4

this.chart = new Chart('dona42Char2', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
this.chart = new Chart('dona43Char2', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});

this.LineChart = new Chart('lineChart2', {
  type: 'line',
  data: {
    datasets: [{
        data: [6, 6, 7, 10, 7, 6],
        fill:false,
        lineTension:0.2,
        borderColor:"#9bc9ec",
        borderWidth: 1
    }, {
        data: [5, 5, 5, 5, 5, 5],
        fill:false,
        lineTension:0.2,
        borderColor:"#9f8ac1",
        borderWidth: 1
    }, {
      data: [5, 4,2, 1, 3, 5],
      fill:false,
      lineTension:0.2,
      borderColor:"#b0d56f",
      borderWidth: 1
  } ,{
    data: [3, 4,2, 1, 4, 4],
    fill:false,
    lineTension:0.2,
    borderColor:"#F9E79F",
    borderWidth: 1
}],
    labels: ['10:43:45', '10:43:45', '10:43:45', '10:43:45', '10:43:45', '10:43:45'],
    animation: true,
    animationSteps: 100,
    animationEasing: "easeOutQuart",
    scaleFontSize: 16,
    responsive: true,
    showTooltip: true,
  
    scaleShowGridLines : false,
    bezierCurve : true,
    pointDotRadius : 5,


},
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
    }
  }
);


this.LineChart = new Chart('lineChart21', { type: 'line',

data: {
  datasets: [{
      data: [6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6],
      fill:false,
      lineTension:0.2,
      backgroundColor: [
        'rgba(255, 255, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,255,255,1)'
      ],
      borderWidth: 1
  }
  ],
  labels: ['1:00', '2:00', '3:00', '4:00','5:00','6:00','7:00','8:00','8:00','9:00','10:00','11:00','12:00'
  ,'13:00'
  ,'14:00'
  ,'15:00'
  ,'16:00'
  ,'17:00'
  ,'18:00'
  ,'19:00'
  ,'20:00'
  ,'21:00'
  ,'21:00','22:00'],
  animation: true,
  animationSteps: 100,
  animationEasing: "easeOutQuart",
  scaleFontSize: 16,
  responsive: true,
  showTooltip: true,

  scaleShowGridLines : false,
  bezierCurve : true,
  pointDotRadius : 5,


},
options: {

 
   
 

  legend: {
    display: false
  },
  tooltips:{
    enabled:false
  }
  }





});




this.valueGas$ = interval(1000).pipe(
  map(() => 80)
);


////GRAFCA2////


////GRAFICA3///

this.chart = new Chart('dona12Char3', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
this.chart = new Chart('dona13Char3', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});

//row2
this.chart = new Chart('dona22Char3', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
this.chart = new Chart('dona23Char3', {
  type: 'doughnut',
  data: {
    labels: ['Data1','Data2'],
    datasets: [
      { 
        data: [55,45],
        backgroundColor: ['#90FF33','#C0D8B6'],
        fill: false
      },
    ],
    responsive: true,
  },
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
  }
});
//row3
this.chart = new Chart('dona32Char3', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
this.chart = new Chart('dona33Char3', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
//Row4

this.chart = new Chart('dona42Char3', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
this.chart = new Chart('dona43Char3', {
type: 'doughnut',
data: {
labels: ['Data1','Data2'],
datasets: [
  { 
    data: [55,45],
    backgroundColor: ['#90FF33','#C0D8B6'],
    fill: false
  },
],
responsive: true,
},
options: {
legend: {
  display: false
},
tooltips:{
  enabled:false
}
}
});
this.LineChart = new Chart('lineChart3', {
  type: 'line',
  data: {
    datasets: [{
        data: [6, 6, 7, 10, 7, 6],
        fill:false,
        lineTension:0.2,
        borderColor:"#9bc9ec",
        borderWidth: 1
    }, {
        data: [5, 5, 5, 5, 5, 5],
        fill:false,
        lineTension:0.2,
        borderColor:"#9f8ac1",
        borderWidth: 1
    }, {
      data: [5, 4,2, 1, 3, 5],
      fill:false,
      lineTension:0.2,
      borderColor:"#b0d56f",
      borderWidth: 1
  } ,{
    data: [3, 4,2, 1, 4, 4],
    fill:false,
    lineTension:0.2,
    borderColor:"#F9E79F",
    borderWidth: 1
}],
    labels: ['10:43:45', '10:43:45', '10:43:45', '10:43:45', '10:43:45', '10:43:45'],
    animation: true,
    animationSteps: 100,
    animationEasing: "easeOutQuart",
    scaleFontSize: 16,
    responsive: true,
    showTooltip: true,
  
    scaleShowGridLines : false,
    bezierCurve : true,
    pointDotRadius : 5,


},
  options: {
    legend: {
      display: false
    },
    tooltips:{
      enabled:false
    }
    }
});

this.LineChart = new Chart('lineChart31', { type: 'line',

data: {
  datasets: [{
      data: [6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6, 7, 10, 7, 6, 6],
      fill:false,
      lineTension:0.2,
      backgroundColor: [
        'rgba(255, 255, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,255,255,1)'
      ],
      borderWidth: 1
  }
  ],
  labels: ['1:00', '2:00', '3:00', '4:00','5:00','6:00','7:00','8:00','8:00','9:00','10:00','11:00','12:00'
  ,'13:00'
  ,'14:00'
  ,'15:00'
  ,'16:00'
  ,'17:00'
  ,'18:00'
  ,'19:00'
  ,'20:00'
  ,'21:00'
  ,'21:00','22:00'],
  animation: true,
  animationSteps: 100,
  animationEasing: "easeOutQuart",
  scaleFontSize: 16,
  responsive: true,
  showTooltip: true,

  scaleShowGridLines : false,
  bezierCurve : true,
  pointDotRadius : 5,


},
options: {

 
   
 

  legend: {
    display: false
  },
  tooltips:{
    enabled:false
  }
  }





});




this.reordenaElementos();




  }

}