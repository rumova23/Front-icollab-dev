import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';

@Component({
  selector: 'app-upload',
  template: `
              <div class="container">
              <form [formGroup]="formGroup"  (ngSubmit)="onSubmitImg()">
                <div class="rom">
                  <div class="col-sm" >
                    <input [disabled]="isdisabled" name="file" type="file" (change)="onChange($event)"/>
                  </div>
                  <div class="col-sm" >
                    <button [disabled]="isdisabled" mdbBtn color="primary" mdbWavesEffect type="submit" >Subir</button>
                  </div>
                </div>
              </form>
              </div> 
            `,
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() inTipo: string;
  formGroup: FormGroup;
  isdisabled: boolean = false;

  constructor(private fb: FormBuilder, private cargar: PerfilComboService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.inTipo == "ver") {
      this.isdisabled = true;
    }
    this.formGroup = this.fb.group({
      file: [null, Validators.required]
    });
  }

  onChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        this.cd.markForCheck();
      };
    }
  }

  onSubmitImg() {
    this.cargar.upload(this.formGroup.controls['file'].value, 1).subscribe(
      respuesta =>
        console.dir(respuesta)
    );
  }

}
