import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoutesPathConstant } from '../../constants/routes.constant';
import { AvatarComponent } from './avatar/avatar.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate:[ AuthGuard ],
        children: [
            {
                path: RoutesPathConstant.PROFILE.AVATAR.PATH,
                component: AvatarComponent
            }
        ]
    }
];

export const profileRouting: ModuleWithProviders = RouterModule.forChild(profileRoutes);