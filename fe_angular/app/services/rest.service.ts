import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

    constructor(
        private authHttp: AuthHttp
    ) { }

    get(url, options?) {
        return this.authHttp.get(url, options).map((resp: Response) => resp.json())
    }

    post(url, data?, options?) {
        return this.authHttp.post(url, data, options).map((resp: Response) => resp.json())
    }

    put(url, data?, options?) {
        return this.authHttp.put(url, data, options).map((resp: Response) => resp.json())
    }

}