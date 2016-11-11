import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public username: string;
    public redirectUrl: String;
    private loginPath = '/api/auth/login';
    private signupPath = '/api/auth/signup';
    private checkPath = '/api/auth/check';

    constructor(
        private authHttp: AuthHttp,
        private router: Router
    ) {
        if (this.getToken() && this.getUsername()) {
            this.isTokenValid();
            this.username = this.getUsername();
        }
    }

    isTokenValid(): Promise<any> {
        return this.authHttp.get(this.checkPath)
            .map((res: Response) => res.json())
            .toPromise()
            .then(
                data => this.isLoggedIn = data.success,
                error => {
                    let err = error.json();
                    this.isLoggedIn = err.success;
                }
            );
    }

    login(body: Login): Observable<Response> {
        return this.authHttp.post(this.loginPath, body)
            .map((res: Response) => {
                let data = res.json();

                this.isLoggedIn = data.success;
                this.setToken(data.token);
                this.setUsername(body.username);

                return data;
            });
    }

    signup(body: Signup): Observable<Response> {
        return this.authHttp.post(this.signupPath, body)
            .map((res: Response) => {
                let data = res.json();

                this.isLoggedIn = data.success;
                this.setToken(data.token);
                this.setUsername(body.username);

                return data;
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