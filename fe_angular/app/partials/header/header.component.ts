import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'tickets-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    private isActive: boolean = false;

    constructor(
        private authService: AuthService
    ) { }

    toggleOpen():void {
        this.isActive = !this.isActive;
    }
}