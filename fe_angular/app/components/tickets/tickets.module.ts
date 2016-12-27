import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AvailableTicketsComponent } from './available/available-tickets.component';
import { TicketsService } from '../../services/tickets.service';
import { MyTicketsComponent } from './my/my-tickets.component';
import { TicketDetailsComponent } from './detail/ticket-details.component';
import { TicketComponent } from './ticket.component';
import { TicketsStatisticsComponent } from './statistics/tickets-statistics.component';
import { BarchartComponent } from '../shared/charts/barchart/barchart.component';
import { BubbleComponent } from '../shared/charts/bubblechart/bubblechart.component';

import { ticketsRouting } from './tickets.routes';

@NgModule({
    imports: [
        ticketsRouting,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        TicketComponent,
        AvailableTicketsComponent,
        MyTicketsComponent,
        TicketDetailsComponent,
        TicketsStatisticsComponent,
        BarchartComponent,
        BubbleComponent
    ],
    providers: [
        TicketsService
    ]
})
export class TicketsModule { }

