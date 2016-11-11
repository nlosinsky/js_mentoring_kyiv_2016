import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    checkLogin(url: string): Promise<boolean> {
     return this.authService.isTokenValid()
         .then(() => {
            if (this.authService.isLoggedIn) {
                return true;
            }

            this.authService.redirectUrl = url;
            this.router.navigate(['/auth/login']);

            return false;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let url:string = state.url;

        return this.checkLogin(url);
    }
}