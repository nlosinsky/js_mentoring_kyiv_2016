import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { SignupFormComponent } from './signup/signup-form.component';
import { RoutesPathConstant } from '../../constants/routes.constant';


const authRoutes: Routes = [
    {
        path: RoutesPathConstant.AUTH.PATH,
        children: [
            {
                path: RoutesPathConstant.AUTH.LOGIN.PATH,
                component: LoginFormComponent
            },
            {
                path: RoutesPathConstant.AUTH.SIGNUP.PATH,
                component: SignupFormComponent
            }
        ]
    }
];

export const authRounting: ModuleWithProviders = RouterModule.forChild(authRoutes);