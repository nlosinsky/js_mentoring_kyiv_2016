import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../../../models/ticket.model';

import { ActivatedRoute } from '@angular/router';
import { CordovaToastService } from '../../../services/cordova/toast.service';

@Component({
    selector: 'ticket-details',
    templateUrl: './ticket-details.component.html'
})
export class TicketDetailsComponent implements OnInit{
    ticket: Ticket;

    constructor(
        private ticketsService: TicketsService,
        private route: ActivatedRoute,
        private cordovaToast: CordovaToastService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({id}) => {
            this.getTicket(id);
        });
    }

    getTicket(ticketId: string): void {
        this.ticketsService.getAvailableTickets()
            .subscribe(
                ({tickets}) => this.ticket = tickets.find(({id}) => id === ticketId)
            );
    }

    buyTicket(ticket: Ticket): void {
        this.ticketsService.buyTicket(ticket)
            .subscribe(
                ({ message }) => this.cordovaToast.showSuccess(message)
            )
    }
}