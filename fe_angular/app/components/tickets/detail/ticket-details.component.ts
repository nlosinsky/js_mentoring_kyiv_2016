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
        this.route.params.subscribe(params => {
            let id = +params['id'];

            this.getTicket(id);
        });
    }

    getTicket(id: number):void {
        this.ticketsService.getAvailableTickets()
            .subscribe(
                data => {
                    this.ticket = data.tickets.filter(ticket => {
                        return +ticket.id === id;
                    })[0];
                }
            );
    }

    buyTicket(ticket: Ticket): void {
        this.ticketsService.buyTicket(ticket)
            .subscribe(
                (data) => {
                    this.isSuccessfullyBought = data.success;
                    this.message = data.message;

                    setTimeout(() => {
                        this.isSuccessfullyBought = false;
                    }, 3000);
                }
            )
    }
}