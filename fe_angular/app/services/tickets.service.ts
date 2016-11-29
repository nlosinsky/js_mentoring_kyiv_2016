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

    getAvailableTickets(): Observable<any> {
        return this.rest.get(this.availableTicketsPath);
    }

    getUserTickets():Observable<any> {
        return this.rest.get(this.myTicketsPath);
    }

    buyTicket(ticket: Ticket): Observable<any> {
        return this.rest.put(this.availableTicketsPath, ticket);
    }
}