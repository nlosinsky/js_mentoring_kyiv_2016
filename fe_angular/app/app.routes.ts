import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CanLoadGuard } from './guards/can-load.guard';

const appRoutes: Routes = [
    //todo maybe routes have 'name' parameter???
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'tickets',
        loadChildren: './components/tickets/tickets.module#TicketsModule',
        canLoad: [ CanLoadGuard ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);


