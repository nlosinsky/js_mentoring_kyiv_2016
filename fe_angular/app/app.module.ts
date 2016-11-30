import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthHttp, provideAuth } from 'angular2-jwt';


import { AppComponent }   from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './components/home';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { TicketsModule } from './components/tickets/tickets.module';
import { AuthGuard } from './guards/auth.guard';
import { TicketsResolver } from './guards/tickets.resolve';
import { AuthModule } from './components/auth/auth.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CanLoadGuard } from './guards/can-load.guard';
import { RestService } from './services/rest.service';
import { CordovaToastService } from './services/cordova/toast.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        TicketsModule,
        AuthModule,
        routes
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        CarouselComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthService,
        AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'Bearer',
            tokenName: 'token_id',
            tokenGetter: (() => localStorage.getItem('token_id')),
            globalHeaders: [
                {'Content-Type': 'application/json'},
                {'Accept': 'application/vnd.heroku+json; version=3'}
            ],
            noJwtError: true
        }),
        AuthGuard,
        TicketsResolver,
        CanLoadGuard,
        RestService,
        CordovaToastService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
