import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CanLoadGuard } from './guards/can-load.guard';
import { RoutesPathConstant } from './constants/routes.constant';

const appRoutes: Routes = [
    {
        path: RoutesPathConstant.ROOT.PATH,
        component: HomeComponent
    },
    {
        path: RoutesPathConstant.HOME.PATH,
        component: HomeComponent
    },
    {
        path: RoutesPathConstant.TICKETS.PATH,
        loadChildren: './components/tickets/tickets.module#TicketsModule',
        canLoad: [ CanLoadGuard ]
    },
    {
        path: RoutesPathConstant.PROFILE.PATH,
        loadChildren: './components/profile/profile.module#ProfileModule',
        canLoad: [ CanLoadGuard ]
    },
    {
        path: RoutesPathConstant.PAGE_NOT_FOUND.PATH,
        component: PageNotFoundComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);


