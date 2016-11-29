import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { RestService } from './rest.service';
import { EndpointsConstant } from '../constants/endpoints.constant';

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public redirectUrl: String;
    private username: string;
    private loginPath = EndpointsConstant.AUTH.LOGIN;
    private signupPath = EndpointsConstant.AUTH.SIGNUP;
    private checkPath = EndpointsConstant.AUTH.CHECK;

    constructor(
        private rest: RestService,
        private router: Router
    ) {
        if (this.getToken()) {
            this.isTokenValid();
        }
    }

    isTokenValid(): Promise<any> {
        return this.rest.get(this.checkPath)
            .toPromise()
            .then(
                ({success}) => this.isLoggedIn = success,
                () => this.isLoggedIn = false
            );
    }

    login(body: Login): Observable<void> {
        return this.rest.post(this.loginPath, body)
            .map(({success, token}) => {
                this.isLoggedIn = success;
                this.setToken(token);
                this.setUsername(body.username);
            });
    }

    signup(body: Signup): Observable<void> {
        return this.rest.post(this.signupPath, body)
            .map(({success, token}) => {
                this.isLoggedIn = success;
                this.setToken(token);
                this.setUsername(body.username);
            })

    }

    logout():void {
        this.removeToken();
        this.removeUsername();
        this.isLoggedIn = false;
        this.router.navigate(['']);
    }

    getUsername(): string {
        return this.username || localStorage.getItem('username');
    }

    setUsername(username: string) {
        this.username = username;
        localStorage.setItem('username', username);
    }
    removeUsername():void {
        this.username = '';
        localStorage.removeItem('username');
    }

    getToken(): string {
        return localStorage.getItem('token_id');
    }

    setToken(token: string) {
        localStorage.setItem('token_id', token);
    }

    removeToken():void {
        localStorage.removeItem('token_id');
    }

}