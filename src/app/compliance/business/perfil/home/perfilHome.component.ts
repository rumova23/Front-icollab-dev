import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-perfilHome',
  templateUrl: './perfilHome.component.html',
  styleUrls: ['./perfilHome.component.scss'],
})
export class PerfilHomeComponent implements OnInit {

  public idEmpleado: number;
  public tipo: string;
  public isViewable: boolean = true;
  public isdisabled: boolean = false;

  constructor( private route: ActivatedRoute ) {
   }

  ngOnInit() {
    //this.idEmpleado = this.route.snapshot.params['idEmpleado'];
    console.log(this.idEmpleado);
    //this.tipo = this.route.snapshot.params['tipo'];
    console.log(this.tipo);
    //this.isdisabled = this.route.snapshot.params['isdisabled'];
    if(this.idEmpleado === 0) {
      this.isViewable = false;
    }
  }
}
