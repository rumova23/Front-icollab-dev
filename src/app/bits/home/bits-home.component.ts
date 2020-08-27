import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EfhWelcomeComponent } from 'src/app/efh/home/welcome/efhWelcome.component';

import { ChangePasswordComponent } from 'src/app/common/changePassword/changePassword.component';
import { EventService } from 'src/app/core/services/event.service';
import { BitsWelcomeComponent } from '../views/welcome/bits-welcome/bits-welcome.component';
import { BitsIncidentsEnvironmentalABCComponent } from '../views/incidents/bits-incidents-environmental-abc/bits-incidents-environmental-abc.component';
import { BitsIncidentsEnvironmentalComponent } from '../views/incidents/bits-incidents-environmental/bits-incidents-environmental.component';

@Component({
	selector: 'app-bits-home',
	templateUrl: './bits-home.component.html',
	styleUrls: ['./bits-home.component.scss'],
	entryComponents: [
		ChangePasswordComponent
		,BitsWelcomeComponent
		,BitsIncidentsEnvironmentalComponent
		,BitsIncidentsEnvironmentalABCComponent
	]
})
export class BitsHomeComponent implements OnInit {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions: Subscription[] = [];

	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private eventService: EventService
	) {
		globalService.setApp('Bits');
		this.subscribeOnChangePage();
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	  this.viewContainerRef.createComponent(
		  this.componentFactoryResolver.resolveComponentFactory(BitsWelcomeComponent)
	  );
	}

	ngOnDestroy() {
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}

	subscribeOnChangePage() {
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
				this.globalService.setPage(event);
				this.viewContainerRef.clear();
				switch (event.descriptor) {
					case 'Bits.BitsIncidentsEnvironmental':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(BitsIncidentsEnvironmentalComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Bits.BitsIncidentsEnvironmentalABC':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(BitsIncidentsEnvironmentalABCComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Bits.Home':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(BitsWelcomeComponent))
							.changeDetectorRef
							.detectChanges();
						break;					
					case 'shared.header.changePassword':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver
								.resolveComponentFactory(ChangePasswordComponent))
							.changeDetectorRef.detectChanges();
						break;
					default:
				}
			}
		}));
	}
}
