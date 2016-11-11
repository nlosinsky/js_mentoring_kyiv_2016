import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { SignupFormComponent } from './signup/signup-form.component';
import {CanLoadGuard} from "../../guards/can-load.guard";


const authRoutes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginFormComponent
            },
            {
                path: 'signup',
                component: SignupFormComponent
            }
        ]
    }
];

export const authRounting: ModuleWithProviders = RouterModule.forChild(authRoutes);