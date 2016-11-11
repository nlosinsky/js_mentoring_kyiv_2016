import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Ticket } from '../../../models/ticket.model';

@Component({
    selector: 'available-tickets',
    templateUrl: './available-tickets.component.html'
})
export class AvailableTicketsComponent implements OnInit{
    tickets: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.forEach((data: Object) => {
            this.tickets = data['tickets'].tickets;
        });
    }

    goToDetails(ticket: Ticket): void {
        let link = ['/tickets/detail', ticket.id];

        this.router.navigate(link);
    }
}