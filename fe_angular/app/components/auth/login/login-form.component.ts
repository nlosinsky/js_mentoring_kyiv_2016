import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../models/login.model';
import { CordovaToastService } from '../../../services/cordova/toast.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    private model: Login = new Login(null, null);

    constructor(
        private authService: AuthService,
        private router: Router,
        private cordovaToast: CordovaToastService
    ) { }

    login(): void {
        this.authService
            .login(this.model)
            .subscribe(
                () => this.router.navigate(['']),
                error => {
                    if (!error.json) return;

                    let { message } = error.json();

                    this.cordovaToast.showError(message);
                }
            )
    }
}