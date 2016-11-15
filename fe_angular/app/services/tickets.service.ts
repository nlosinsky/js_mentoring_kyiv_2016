import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Ticket } from '../models/ticket.model';
import { RestService } from './rest.service';

@Injectable()
export class TicketsService {
    availableTicketsPath = '/api/tickets/available';
    myTicketsPath = '/api/tickets/my';

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