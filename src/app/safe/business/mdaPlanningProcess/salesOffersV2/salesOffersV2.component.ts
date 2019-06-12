
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

  @Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-salesOffersV2',
    templateUrl: './salesOffersV2.component.html',
    styleUrls: ['./salesOffersV2.component.scss']
  })
  
  export class SalesOffersV2Component  implements OnInit{
      title = new Date("2019/06/20");
      weeks=[{active:false,days:[]},{active:false,days:[]},{active:false,days:[]},{active:false,days:[]},{active:false,days:[]}]; 

      salesOffers=[
          {
            date:'06/01/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/02/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/03/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/04/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/05/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/06/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/07/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, 
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          },
          {
            date:'06/08/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/09/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/10/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/11/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/12/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/13/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/14/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/14/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/15/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/16/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/17/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/18/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/19/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },
          {
            date:'06/20/2019',
            offers:[
              {
                  title:'Planeación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Armado',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Presentación',
                  type:'unrealized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Seguimiento',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Estado de Cuenta',
                  type:'toDo', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              },
              {
                  title:'Facturación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'5'
              },
              {
                  title:'Liquidación',
                  type:'realized', //realized, unrealized, toDo
                  url:'',
                  reliquidation:'0'
              }
            ],
          
          },

      ];
      
      constructor(private eventService: EventService) {}
      
      ngOnInit() {
        this.datainit();
      }
      datainit(){
        let i=0;
        let ii=0;
        for (const salesOffer of this.salesOffers) {
          this.weeks[ii].days.push(salesOffer);
          i++;
          if(i==7){i=0;ii++}
        }
      }
      clickOffer(offer){
        console.log(offer);
        this.eventService.sendLinkMockUp(new EventMessage(3, null));
      }
      previousMonth(){
        this.title.setMonth(this.title.getMonth() + 1);
      }
      nextMonth(){
        this.title.setMonth(this.title.getMonth() - 1);
      }
 
  }