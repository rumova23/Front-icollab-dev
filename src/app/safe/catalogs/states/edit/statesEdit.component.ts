import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { State } from 'src/app/safe/models/State';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Country } from 'src/app/safe/models/Country';
import { EventMessage } from 'src/app/core/models/EventMessage';



@Component({
  selector: 'app-statesEdit',
  templateUrl: './statesEdit.component.html',
  styleUrls: ['./statesEdit.component.scss']
})
export class StatesEditComponent implements OnInit {
  stateForm: FormGroup;
  entity: Entity;
  state: State;
  stateSelect: State;
  countries: Array<Country>
  count: number;
  constructor(
    private toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadCountries();
    this.stateForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'order': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required)
    });
  }

  loadCountries() {
    this.catalogService.get('country')
      .subscribe(
        data => {
          this.countries = data;
          console.log(this.countries);
            if (this.entity.readOnly) {
              this.stateSelect.country = this.countries.filter(unity =>
                unity.id === this.stateSelect.idCountry)[0];
              this.stateForm.patchValue(this.stateSelect);
              this.stateForm.disable();
            } else if (this.entity.edit) {
              this.stateSelect.country = this.countries.filter(unity =>
                unity.id === this.stateSelect.idCountry)[0];
              this.stateForm.patchValue(this.stateSelect);
            } else {
              this.state = {} as State;
            }
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidas de Producto');

        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + " Estado";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    this.state = value;
    this.state.id = (this.stateSelect !== null && this.stateSelect !== undefined &&
      this.stateSelect.id !== null && this.stateSelect.id !== undefined
    ) ? this.stateSelect.id : 0;
    this.state.save = this.entity.new;
    this.state.idCountry = this.state.country.id;
    this.catalogService.saveState(this.state)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(14, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
