import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableTicketsComponent } from './available/available-tickets.component';
import { MyTicketsComponent } from './my/my-tickets.component';
import { TicketDetailsComponent } from './detail/ticket-details.component';
import { TicketComponent } from './ticket.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TicketsResolver } from '../../guards/tickets.resolve';
import { RoutesPathConstant } from '../../constants/routes.constant';
import { TicketsStatisticsComponent } from './statistics/tickets-statistics.component';

const ticketsRoutes: Routes = [
    {
        path: '',
        component: TicketComponent,
        canActivate:[ AuthGuard ],
        children: [
            {
                path: RoutesPathConstant.TICKETS.AVAILABLE.PATH,
                component: AvailableTicketsComponent,
                resolve: {
                    tickets: TicketsResolver
                }
            },
            {
                path: RoutesPathConstant.TICKETS.MY.PATH,
                component: MyTicketsComponent
            },
            {
                path: RoutesPathConstant.TICKETS.DETAIL_ID.PATH,
                component: TicketDetailsComponent

            },
            {
                path: RoutesPathConstant.TICKETS.STATISTICS.PATH,
                component: TicketsStatisticsComponent

            }
        ]
    }
];

export const ticketsRouting: ModuleWithProviders = RouterModule.forChild(ticketsRoutes);