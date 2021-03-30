import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user = {} as User | null;
    // private user = <User>{};
    // private user: User = {
    //     email: '',
    //     userId: ''
    // };

    constructor(private router: Router){}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.successfully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.successfully();
    }

    // tslint:disable-next-line: typedef
    logOut() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }


    // tslint:disable-next-line: typedef
    getUser() {
        return { ...this.user };
    }

    // tslint:disable-next-line: typedef
    isAuth() {
        return (this.user != null);
    }

    private successfully(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
