import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Signup} from '../../../models/signup.model';
import { CordovaToastService } from '../../../services/cordova/toast.service';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html'
})
export class SignupFormComponent {
    private model: Signup = new Signup(null, null);

    constructor(
        private authService: AuthService,
        private router: Router,
        private cordovaToast: CordovaToastService
    ) { }

    signup(): void {
        this.authService
            .signup(this.model)
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