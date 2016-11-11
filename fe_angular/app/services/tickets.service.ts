import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Ticket } from "../models/ticket.model";
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class TicketsService {
    availableTicketsPath = '/api/tickets/available';
    myTicketsPath = '/api/tickets/my';

    constructor(
        private authHttp: AuthHttp
    ) { }

    getAvailableTickets(): Observable<any> {
        return this.authHttp.get(this.availableTicketsPath)
            .map((res: Response) => res.json());
    }

    getUserTickets():Observable<any> {
        return this.authHttp.get(this.myTicketsPath)
            .map((res: Response) => res.json());
    }

    buyTicket(ticket: Ticket): Observable<any> {
        return this.authHttp.put(this.availableTicketsPath, ticket)
            .map((res: Response) => res.json());
    }
}