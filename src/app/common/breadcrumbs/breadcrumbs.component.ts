import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  serviceSubscriptionApp: any;
  constructor(private eventService: EventService) {
    this.serviceSubscriptionApp = this.eventService.onChangeApp.subscribe({
      next: (event: EventMessage) => {

      }
    });
  }
  ngOnInit() {

  }


}
