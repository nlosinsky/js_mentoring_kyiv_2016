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

    get username(): string {
        return this.authService.getUsername();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    toggleOpen():void {
        this.isActive = !this.isActive;
    }

    logout():void {
        this.authService.logout();
    }
}