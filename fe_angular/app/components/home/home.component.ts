import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(
        private authService: AuthService
    ) { }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

}