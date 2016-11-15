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
        this.route.data.forEach(({tickets}) => {
            this.tickets = tickets.tickets;
        });
    }

    goToDetails({id}:Ticket): void {
        let link = ['/tickets/detail', id];

        this.router.navigate(link);
    }
}