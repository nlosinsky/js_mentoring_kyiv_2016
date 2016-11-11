import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../../../models/ticket.model';

@Component({
    selector: 'tickets-my',
    templateUrl: './my-tickets.component.html'
})
export class MyTicketsComponent implements OnInit{
    tickets: Ticket[];

    constructor(
        private ticketsService: TicketsService
    ) { }

    ngOnInit() {
        this.getMyTickets();
    }

    getMyTickets():void {
        this.ticketsService.getUserTickets()
            .subscribe(data => this.tickets = data.tickets);
    }
}