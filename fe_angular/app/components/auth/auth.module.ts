import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { authRounting } from './auth.routes';

import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login/login-form.component';
import { SignupFormComponent } from './signup/signup-form.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        authRounting
    ],
    exports: [],
    declarations: [
        AuthComponent,
        LoginFormComponent,
        SignupFormComponent

    ],
    providers: [],
})
export class AuthModule { }
