import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-a',
  templateUrl: './dashboard-a.component.html',
  styleUrls: ['./dashboard-a.component.scss']
})
export class DashboardAComponent implements OnInit {
  
  
  /* Grafica lineas */
  public chartType: string = 'line';
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Power Output' }
  ];
  public chartLabels: Array<any> = ['09:00', '09:03', '09:06', '09:09', '09:12', '09:15', '09:18'];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  /* /Grafica lineas */
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public doughnut: string = 'doughnut';
  /* Grafica circular 1 */
  public cd_1: Array<any> = [
    { data: [580,420], label: 'My First dataset' }
  ];
  public cl_1: Array<any> = ['580.65', 'd'];
  public cc_1: Array<any> = [
    {
      backgroundColor: ['#46FF33','#363838'],
      borderWidth: 0,
    }
  ];
  public co_1: any = {
    responsive: true
  };
  /* /Grafica circular 1 */
  public cc_rojo: Array<any> = [
    {
      backgroundColor: ['#FF0000','#363838'],
      borderWidth: 0,
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
