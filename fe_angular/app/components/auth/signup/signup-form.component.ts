import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Signup} from '../../../models/signup.model';

@Component({
    templateUrl: './signup-form.component.html'
})
export class SignupFormComponent {
    private model: Signup = new Signup(null, null);
    private isVisibleError: boolean = false;
    private message: String;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    signup(): void {
        this.authService
            .signup(this.model)
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