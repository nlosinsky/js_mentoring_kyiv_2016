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

                    let err = error.json();

                    this.isVisibleError = !err.success;
                    this.message = err.message;

                    setTimeout(() => {
                        this.isVisibleError = false;
                    }, 3000);
                }
            )
    }
}