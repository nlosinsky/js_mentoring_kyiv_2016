import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Ticket } from "../models/ticket.model";
import { Observable} from 'rxjs/Rx';
import { TicketsService } from '../services/tickets.service';

import 'rxjs/operator/toPromise';

@Injectable()
export class TicketsResolver implements Resolve<Ticket[]>{

    constructor(
        private ticketsService: TicketsService,
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.ticketsService.getAvailableTickets();
    }

}