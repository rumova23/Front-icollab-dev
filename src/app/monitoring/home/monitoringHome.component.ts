import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { MonitoringWelcomeComponent } from '../welcome/monitoring-welcome.component';
import { GlobalService }                       from 'src/app/core/globals/global.service';
import { ThemeService }                        from 'src/app/core/globals/theme';
import { SecurityService }                     from 'src/app/core/services/security.service';

@Component({
	selector: 'app-monitoringHome',
	templateUrl: './monitoringHome.component.html',
	styleUrls: ['./monitoringHome.component.scss'],
	entryComponents: [
		MonitoringWelcomeComponent
	]
})
export class MonitoringHomeComponent implements OnInit, OnDestroy {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	constructor(
		private componentFactoryResolver : ComponentFactoryResolver,
		public  globalService            : GlobalService,
		public  theme                    : ThemeService,
		private securityService          : SecurityService,
	) {
		
		try{
			this.theme.setApp("Administrative_monitoring");
		}catch(err){

		}
	}

	ngOnInit() {
	}
	ngAfterViewInit() {
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component);
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component);
		const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent);
		this.viewContainerRef.createComponent(factory);
	}
	ngOnDestroy(){

  	}

}
