import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Signup} from '../../../models/signup.model';

@Component({
    selector: 'signup-form',
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