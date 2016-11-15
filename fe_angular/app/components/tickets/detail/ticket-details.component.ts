import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../../../models/ticket.model';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ticket-details',
    templateUrl: './ticket-details.component.html'
})
export class TicketDetailsComponent implements OnInit{
    isSuccessfullyBought: boolean = false;
    ticket: Ticket;
    message: String;

    constructor(
        private ticketsService: TicketsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({id}) => {
            this.getTicket(+id);
        });
    }

    getTicket(ticketId: number): void {
        this.ticketsService.getAvailableTickets()
            .subscribe(
                ({tickets}) => this.ticket = tickets.find(({id}) => +id === ticketId)
            );
    }

    buyTicket(ticket: Ticket): void {
        this.ticketsService.buyTicket(ticket)
            .subscribe(
                ({success, message}) => {
                    this.isSuccessfullyBought = success;
                    this.message = message;

                    setTimeout(() => {
                        this.isSuccessfullyBought = false;
                    }, 3000);
                }
            )
    }
}