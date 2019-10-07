import { Component, OnInit } from '@angular/core';
import { ThemeService }      from 'src/app/core/globals/theme';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  constructor(
    public theme            : ThemeService
  ) { }
}
