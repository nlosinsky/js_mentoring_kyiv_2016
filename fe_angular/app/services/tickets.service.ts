import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Ticket } from '../models/ticket.model';
import { RestService } from './rest.service';
import { EndpointsConstant } from '../constants/endpoints.constant';

@Injectable()
export class TicketsService {
    availableTicketsPath = EndpointsConstant.TICKETS.AVAILABLE;
    myTicketsPath = EndpointsConstant.TICKETS.MY;

    constructor(
        private rest: RestService
    ) { }

    getAvailableTickets(params?): Observable<any> {
        let options = {
            limit: 10
        };

        Object.assign(options, params);

        const query = Object.keys(options).map((option) => `${option}=${options[option]}`).join('&');
        const url = `${this.availableTicketsPath}?${query}`;

        return this.rest.get(url);
    }

    getUserTickets():Observable<any> {
        return this.rest.get(this.myTicketsPath);
    }

    buyTicket(ticket: Ticket): Observable<any> {
        return this.rest.put(this.availableTicketsPath, ticket);
    }
}