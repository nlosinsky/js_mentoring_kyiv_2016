import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../models/login.model';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    private model: Login = new Login(null, null);
    private isVisibleError: boolean = false;
    private message: String;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    login(): void {
        this.authService
            .login(this.model)
            .subscribe(
                () => this.router.navigate(['']),
                error => {
                    if (!error.json) return;

                    let { success, message } = error.json();

                    this.isVisibleError = !success;
                    this.message = message;

                    setTimeout(() => {
                        this.isVisibleError = false;
                    }, 3000);
                }
            )
    }
}