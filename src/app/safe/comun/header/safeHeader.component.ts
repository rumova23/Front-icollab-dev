import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { Router } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-safeHeader',
  templateUrl: './safeHeader.component.html',
  styleUrls: ['./safeHeader.component.css']
})
export class SafeHeaderComponent implements OnInit {
  constructor(private globalService: GlobalService,
    private eventService: EventService,
    private router: Router) {
  }

  ngOnInit() {
  }

  cambioPlantaSol() {
    this.globalService.aguila = !this.globalService.aguila
    this.globalService.plantaDefaultId = "83";

    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigate(['/config-act']);
    }
  }

  toggleMenu() {
    this.eventService.sendMainSafe(new EventMessage(1, null))
  }

  cambioPlantaAguila() {

    this.globalService.aguila = !this.globalService.aguila
    this.globalService.plantaDefaultId = "82";

    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigateByUrl('/config-act');
    }
  }

}
