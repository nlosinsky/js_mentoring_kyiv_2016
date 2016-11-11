import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableTicketsComponent } from './available/available-tickets.component';
import { MyTicketsComponent } from './my/my-tickets.component';
import { TicketDetailsComponent } from './detail/ticket-details.component';
import { TicketComponent } from './ticket.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TicketsResolver } from '../../guards/tickets.resolve';

const ticketsRoutes: Routes = [
    {
        path: '',
        component: TicketComponent,
        canActivate:[ AuthGuard ],
        children: [
            {
                path: 'available',
                component: AvailableTicketsComponent,
                resolve: {
                    tickets: TicketsResolver
                }
            },
            {
                path: 'my',
                component: MyTicketsComponent
            },
            {
                path: 'detail/:id',
                component: TicketDetailsComponent

            }
        ]
    }
];

export const ticketsRouting: ModuleWithProviders = RouterModule.forChild(ticketsRoutes);