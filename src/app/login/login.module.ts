import { NgModule            } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule       } from 'ng-block-ui';
import { Constants           } from '../core/globals/Constants';
import { LOGIN_ROUTES        } from './login.routes';
import { LoginComponent      } from './login/login.component';
import { HomeComponent       } from './home/home.component';



@NgModule({
	declarations: [
		 LoginComponent
		,HomeComponent
	],
	exports: [],
	imports: [
		LOGIN_ROUTES,
		BrowserModule,
		ReactiveFormsModule,
		BlockUIModule.forRoot({message: Constants.LOADING_MEESSAGE})
    ],
    providers: [],
})
export class LoginModule { }