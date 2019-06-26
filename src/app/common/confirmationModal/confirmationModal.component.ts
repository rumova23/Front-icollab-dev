import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmationModal',
  template: `
                      <ng-template #content let-modal>
                        <div class="modal-header">
                          <h4 class="modal-title" id="modal-basic-title">{{inTitulo}}</h4>
                          <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                        {{strMensaje}}
                        </div>
                        <div class="modal-footer">
                          <div class="row">
                            <div class="col">
                              <button type="button" class="btn btn-warning" aria-label="Cancelar" (click)="modal.dismiss('Cross click')">Cancelar</button>
                            </div>
                            <div class="col">
                              <button type="button" class="btn btn-success" (click)="modal.close('Save click'); aceptar()">Aceptar</button>
                            </div>
                          </div>
                        </div>
                      </ng-template>
                      
                      <a (click)="open(content)">
                          <img src="assets/images/skins/ico_Borrar.png" alt="PDF">  
                      </a>
  `,
  styleUrls: ['./confirmationModal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() strMensaje: string;
  @Input() inTitulo: string;
  @Output() salida = new EventEmitter<number>(); 

  closeResult: string;
 
  constructor(private modalService: NgbModal) { }

  ngOnInit() {



  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  numAceptar: number = 1;
  aceptar(){
    this.salida.emit(this.numAceptar);
  }
}
