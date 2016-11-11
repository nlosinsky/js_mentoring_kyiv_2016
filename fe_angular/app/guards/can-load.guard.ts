import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanLoadGuard implements CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canLoad(route: Route): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}
