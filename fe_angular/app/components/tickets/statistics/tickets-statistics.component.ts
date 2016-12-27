import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';

import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';


@Component({
    templateUrl: './tickets-statistics.component.html',
    styleUrls: ['tickets-statistics.component.css']
})
export class TicketsStatisticsComponent implements OnInit, OnDestroy {
    activeTab: string;
    barchartData: Array<any>;
    bubblechartData: any;
    tickets: any;
    detailsData: any;
    tabs = ['Barchart', 'Bubblechart'];
    ticketsSubscription: Subscription;

    constructor(
        private ticketsService: TicketsService,
    ) { }

    ngOnInit() {
        this.activeTab = this.tabs[0];

        this.getAvailableTickets();
    }

    ngOnDestroy() {
        this.ticketsSubscription.unsubscribe();
    }

    generateBubblechartData(): void {
        let data = {};
        this.bubblechartData = {
            name: 'bubblechart',
            children: []
        };

        this.tickets.forEach((ticket) => {
            let country = ticket.countryTo.name;
            let city = ticket.cityTo;

            if (data[country]) {
                if(!data[country][city]) {
                    data[country][city] = 0;
                }

                data[country][city]++;
            } else {
                data[country] = { [city]: 1 };
            }
        });

        Object.keys(data).forEach((country) => {
            let obj = {
                name: country,
                children: []
            };

            Object.keys(data[country]).forEach((city) => {
                obj.children.push({
                    name: city,
                    size: data[country][city]
                });
            });

            this.bubblechartData.children.push(obj);
        });
    }

    generateBarchartData(): void {
        let data = {};
        this.barchartData = [];

        this.tickets.forEach((ticket) => {
            let country = ticket.countryTo.name;

            if (!data[country]) {
                data[country] = 0;
            }

            data[country]++;
        });

        Object.keys(data).forEach((key) => {
            this.barchartData.push([key, data[key]]);
        });
    }

    getAvailableTickets(): void {
        let startInDays = 7;
        let daysDelta = 7;
        let dateFrom = moment().add(startInDays, 'days').format('DD/MM/YYYY');
        let dateTo = moment().add(startInDays + daysDelta, 'days').format('DD/MM/YYYY');

        const options = {
            flyFrom: 'Kiev',
            limit: 10,
            typeFlight: 'oneway',
            directFlights: 1,
            dateFrom,
            dateTo
        };

        //todo
        this.ticketsSubscription = this.ticketsService.getAvailableTickets(options).subscribe(({tickets}) => {
            this.tickets = tickets;
            this.detailsData = {
                flyFrom: options.flyFrom,
                typeFlight: options.typeFlight,
                directFlights: options.directFlights ? 'Yes' : 'No',
                dateFrom: options.dateFrom,
                dateTo: options.dateTo,
                flightsCount: this.tickets.length
            };

            this.generateBarchartData();
            this.generateBubblechartData();
        });
    }

    setTab(tab: string) {
        this.activeTab = tab;
    }

    isActiveTab(tab: string) {
        return this.activeTab === tab;
    }
}